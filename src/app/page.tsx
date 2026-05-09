'use client';

import { useState, useEffect } from 'react';
import { useAccount, useEnsName, useEnsAvatar, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { uploadTextToIPFS } from '@/utils/ipfs';
import {
  loadProfile,
  saveProfile,
  getDefaultProfile,
  loadPosts,
  addPost,
  deletePost,
  exportAllData,
  type Post,
  type Profile
} from '@/utils/storage';
import { signInWithEthereum, isAuthenticated, clearAuthentication } from '@/utils/siwe';
import { shortenAddress } from '@/utils/ens';
import {
  ReflectionGate,
  CircleSelector,
  DailyReflectionCounter,
  EveningReview,
  useEveningReview,
  ImmutablePostCard,
} from '@/components/stoic';

// Map old visibility to new Circle terminology
type Circle = 'vault' | 'family' | 'work' | 'outer';

const visibilityToCircle = (vis: Post['visibility']): Circle => {
  if (vis === 'private') return 'vault';
  if (vis === 'public') return 'outer';
  return vis as Circle;
};

const circleToVisibility = (circle: Circle): Post['visibility'] => {
  if (circle === 'vault') return 'private';
  if (circle === 'outer') return 'public';
  return circle;
};

export default function SovereignRealm() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName || undefined,
  });
  const { data: walletClient } = useWalletClient();

  const [profile, setProfile] = useState<Profile>(getDefaultProfile());
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [currentCircle, setCurrentCircle] = useState<Circle>('vault');
  const [targetCircle, setTargetCircle] = useState<Circle>('vault');
  const [showReflectionGate, setShowReflectionGate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const { shouldShow: shouldShowEveningReview, markComplete: completeEveningReview } = useEveningReview();

  // Load data on mount
  useEffect(() => {
    const savedProfile = loadProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      // First time user - save default
      saveProfile(getDefaultProfile());
    }
    setPosts(loadPosts());

    // Check if already authenticated
    if (address) {
      setAuthenticated(isAuthenticated(address));
    }
  }, [address]);

  // Update profile when wallet connects and ENS resolves
  useEffect(() => {
    if (isConnected && address) {
      const displayName = ensName || shortenAddress(address);
      const avatarUrl = ensAvatar || profile.avatar;

      setProfile(prev => ({
        ...prev,
        name: prev.name === 'Sovereign Self' ? displayName : prev.name,
        avatar: avatarUrl,
        walletAddress: address,
      }));
    }
  }, [isConnected, address, ensName, ensAvatar]);

  // Handle Sign-In with Ethereum
  const handleSignIn = async () => {
    if (!address || !walletClient) return;

    setAuthenticating(true);
    try {
      const result = await signInWithEthereum(address, walletClient);
      if (result) {
        setAuthenticated(true);
        console.log('🔐 Authentication successful');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setAuthenticating(false);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    clearAuthentication();
    setAuthenticated(false);
  };

  const handleCreatePost = async (circle: Circle = currentCircle) => {
    if (!newPost.trim()) return;

    // If releasing from Vault, show ReflectionGate
    if (circle !== 'vault') {
      setTargetCircle(circle);
      setShowReflectionGate(true);
      return;
    }

    // Otherwise, publish directly to Vault
    await publishPost(circle);
  };

  const publishPost = async (circle: Circle) => {
    if (!newPost.trim()) return;

    setIsLoading(true);
    try {
      // Upload to IPFS (content-addressed, immutable)
      const ipfsHash = await uploadTextToIPFS(newPost);

      const post: Post = {
        id: Date.now().toString(),
        content: newPost,
        ipfsHash: ipfsHash.startsWith('local-') ? undefined : ipfsHash,
        visibility: circleToVisibility(circle),
        timestamp: new Date().toISOString(),
      };

      const updatedPosts = addPost(post);
      setPosts(updatedPosts);
      setNewPost('');
      setShowReflectionGate(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = (postId: string) => {
    const updatedPosts = deletePost(postId);
    setPosts(updatedPosts);
  };

  const handleUpdateProfile = () => {
    saveProfile(profile);
    setEditingProfile(false);
  };

  const handleExportData = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sovereign-realm-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcut: Cmd/Ctrl + Enter to post
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCreatePost();
    }
  };

  const getVisibilityIcon = (vis: Post['visibility']) => {
    switch (vis) {
      case 'private': return '🔒';
      case 'family': return '👨‍👩‍👧';
      case 'work': return '💼';
      case 'public': return '🌐';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Cover & Avatar - FB style */}
      <div className="h-80 bg-gradient-to-r from-purple-900 to-indigo-900 relative">
        {profile.cover && (
          <img src={profile.cover} alt="Cover" className="w-full h-full object-cover" />
        )}
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <img
            src={profile.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${profile.name}`}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-zinc-950 bg-zinc-800"
          />
          <div>
            <h1 className="text-4xl font-bold">{profile.name}</h1>
            <p className="text-zinc-400">
              {isConnected && address ? (
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${authenticated ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  {ensName || shortenAddress(address)}
                  {authenticated ? ' • Authenticated' : ' • Not Authenticated'}
                </span>
              ) : (
                'Sovereign Realm • Your Protected Core'
              )}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="absolute top-4 right-4 flex gap-3">
          {isConnected && !authenticated && (
            <button
              onClick={handleSignIn}
              disabled={authenticating}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
            >
              {authenticating ? '🔐 Signing...' : '🔐 Sign In with Ethereum'}
            </button>
          )}
          {authenticated && (
            <button
              onClick={handleSignOut}
              className="bg-zinc-900/80 hover:bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
            >
              🔓 Sign Out
            </button>
          )}
          <button
            onClick={handleExportData}
            className="bg-zinc-900/80 hover:bg-zinc-800 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
          >
            📦 Export
          </button>
          <div className="rounded-lg overflow-hidden backdrop-blur-sm">
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="flex gap-8 pt-20 px-8 max-w-7xl mx-auto">
        {/* Left Column: About / Circles */}
        <div className="w-80 space-y-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">The Protected Core</h2>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                {editingProfile ? '✓ Save' : '✎ Edit'}
              </button>
            </div>
            {editingProfile ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-zinc-800 p-2 rounded text-sm"
                  placeholder="Your name"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-zinc-800 p-2 rounded text-sm resize-y min-h-[60px]"
                  placeholder="Your bio"
                />
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded font-medium text-sm"
                >
                  Save Profile
                </button>
              </div>
            ) : (
              <p className="text-zinc-400">{profile.bio}</p>
            )}
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3 className="font-semibold mb-3">My Circles (Choose Sharing)</h3>
            <div className="space-y-2">
              <button
                onClick={() => setVisibility('family')}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  visibility === 'family' ? 'bg-emerald-900 ring-2 ring-emerald-500' : 'bg-emerald-950 hover:bg-emerald-900'
                }`}
              >
                👨‍👩‍👧 Family Realm
              </button>
              <button
                onClick={() => setVisibility('work')}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  visibility === 'work' ? 'bg-blue-900 ring-2 ring-blue-500' : 'bg-blue-950 hover:bg-blue-900'
                }`}
              >
                💼 Work Collegium
              </button>
              <button
                onClick={() => setVisibility('public')}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  visibility === 'public' ? 'bg-amber-900 ring-2 ring-amber-500' : 'bg-amber-950 hover:bg-amber-900'
                }`}
              >
                🌐 Outer World (Public)
              </button>
              <button
                onClick={() => setVisibility('private')}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  visibility === 'private' ? 'bg-zinc-700 ring-2 ring-zinc-500' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                🔒 Vault Only – Never Shared
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="text-xs text-zinc-500 space-y-1">
                <p>📊 Total posts: {posts.length}</p>
                <p>🔒 Private: {posts.filter(p => p.visibility === 'private').length}</p>
                <p>🌐 Public: {posts.filter(p => p.visibility === 'public').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl text-sm text-zinc-500">
            <p className="font-semibold text-zinc-400 mb-2">🛡️ Sovereignty Status</p>
            <p>• Data stored locally in your browser</p>
            <p>• Content pinned to IPFS (decentralized)</p>
            <p>• No central server owns your data</p>
            {isConnected && address ? (
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-green-400 font-medium">✓ Wallet Connected</p>
                <p className="text-xs mt-1">{ensName || shortenAddress(address)}</p>
                {authenticated ? (
                  <p className="text-green-400 text-xs mt-1">✓ Authenticated via SIWE</p>
                ) : (
                  <p className="text-yellow-400 text-xs mt-1">⚠ Click "Sign In" to authenticate</p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-xs text-zinc-600">Connect wallet for on-chain identity</p>
            )}
          </div>
        </div>

        {/* Main Feed – Your Timeline */}
        <div className="flex-1 space-y-6">
          {/* Composer */}
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">What stirs in your psyche?</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your thoughts, your realm. Private by default... (Cmd/Ctrl+Enter to post)"
              className="w-full bg-zinc-800 p-4 rounded-xl resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">Share with:</span>
                <span className="text-sm font-medium">
                  {getVisibilityIcon(visibility)} {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                </span>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim() || isLoading}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 disabled:cursor-not-allowed px-8 py-2 rounded-full font-medium transition-colors"
              >
                {isLoading ? 'Publishing...' : 'Post to Chosen Realm'}
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="bg-zinc-900 p-12 rounded-xl text-center">
              <p className="text-zinc-500 text-lg">Your realm awaits your first thought.</p>
              <p className="text-zinc-600 text-sm mt-2">All posts are private by default. You control what you share.</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800/50 transition-colors group">
                <div className="flex justify-between text-sm text-zinc-500 mb-4">
                  <span>
                    {getVisibilityIcon(post.visibility)} {post.visibility} • {new Date(post.timestamp).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
                {post.ipfsHash && (
                  <div className="mt-3 text-xs text-zinc-600 bg-zinc-950 p-2 rounded font-mono">
                    📌 Pinned to IPFS: {post.ipfsHash.slice(0, 30)}...
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
