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
import { OnboardingFlow, useOnboardingStatus } from '@/components/onboarding';
import { ShadowJournal, BurnRitualModal } from '@/components/shadow';
import { BetaBanner, BetaFeedbackPrompt, useBetaFeedback, ReportIssueButton, BetaFeedbackExport } from '@/components/beta';

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
  const { shouldShowOnboarding, completeOnboarding } = useOnboardingStatus();
  const [showShadowJournal, setShowShadowJournal] = useState(false);
  const [burnRitualPost, setBurnRitualPost] = useState<{ id: string; content: string } | null>(null);
  const { shouldShow: shouldShowBetaFeedback, dismiss: dismissBetaFeedback, complete: completeBetaFeedback } = useBetaFeedback();
  const [showSettings, setShowSettings] = useState(false);

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

  const handleRefinePost = (postId: string) => {
    // Move post back to Vault (change visibility to 'private')
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedPost = { ...post, visibility: 'private' as Post['visibility'] };
    const updatedPosts = posts.map(p => p.id === postId ? updatedPost : p);

    // Update storage
    localStorage.setItem('sovereign_posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleReleasePost = (postId: string, toCircle: Circle) => {
    // Move post to new Circle (with ReflectionGate)
    setTargetCircle(toCircle);
    setShowReflectionGate(true);

    // Store the post ID to update after reflection
    (window as any).__pendingReleasePostId = postId;
  };

  const handleBurnPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Open burn ritual modal
    setBurnRitualPost({ id: postId, content: post.content });
  };

  const handleBurnRitualComplete = () => {
    // Reload posts from storage
    setPosts(loadPosts());
    setBurnRitualPost(null);
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
    a.download = `meditations-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcut: Cmd/Ctrl + Enter to post
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleCreatePost(currentCircle);
    }
  };

  // Get post stats for evening review
  const getPostStats = () => {
    return {
      vaultCount: posts.filter(p => p.visibility === 'private').length,
      familyCount: posts.filter(p => p.visibility === 'family').length,
      workCount: posts.filter(p => p.visibility === 'work').length,
      outerCount: posts.filter(p => p.visibility === 'public').length,
    };
  };

  // Filter posts by current circle
  const getFilteredPosts = () => {
    const visibility = circleToVisibility(currentCircle);
    if (currentCircle === 'vault') {
      return posts.filter(p => p.visibility === 'private');
    }
    return posts.filter(p => p.visibility === visibility);
  };

  const filteredPosts = getFilteredPosts();

  // Handle onboarding completion
  const handleOnboardingComplete = (archetypeId: string) => {
    console.log(`✨ Archetype chosen: ${archetypeId}`);
    completeOnboarding();
  };

  // Handle wallet connection request from onboarding
  const handleConnectRequest = () => {
    // RainbowKit's ConnectButton will be triggered by user
    console.log('Wallet connection requested');
  };

  // If onboarding not complete, show onboarding flow
  if (shouldShowOnboarding) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onConnect={handleConnectRequest}
        onSignIn={handleSignIn}
      />
    );
  }

  // Main SovereignRealm interface
  return (
    <div className="min-h-screen bg-realm-indigo-950 text-realm-parchment-50 font-sans">
      {/* Beta Banner */}
      <BetaBanner />

      {/* Header — The Sovereign Crown */}
      <header className="border-b border-realm-indigo-800 bg-realm-indigo-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-serif text-realm-gold-500">SovereignRealm</h1>
            {isConnected && address && (
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${authenticated ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-realm-parchment-50/70">
                  {ensName || shortenAddress(address)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isConnected && !authenticated && (
              <button
                onClick={handleSignIn}
                disabled={authenticating}
                className="btn-secondary"
              >
                {authenticating ? '🔐 Signing...' : '🔐 Sign In'}
              </button>
            )}
            {authenticated && (
              <button onClick={handleSignOut} className="btn-ghost">
                🔓 Sign Out
              </button>
            )}
            <button onClick={handleExportData} className="btn-ghost">
              📦 Export
            </button>
            <ConnectButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar — The Circle Selector & Profile */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <div className="vault-card">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={profile.avatar || ensAvatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${profile.name}`}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-realm-gold-500"
                />
                <div>
                  <h2 className="font-serif text-xl text-realm-gold-500">{profile.name}</h2>
                  <p className="text-sm text-realm-parchment-50/60">
                    {isConnected ? 'Sovereign' : 'Unconnected'}
                  </p>
                </div>
              </div>
              {editingProfile ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="textarea"
                    placeholder="Your bio"
                    rows={3}
                  />
                  <button onClick={handleUpdateProfile} className="btn-primary w-full">
                    Save Profile
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-realm-parchment-50/70 mb-3">{profile.bio}</p>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="btn-ghost text-sm w-full"
                  >
                    ✎ Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Circle Selector */}
            <div className="vault-card">
              <h3 className="text-sm font-mono text-realm-gold-500 mb-4 uppercase tracking-wide">
                Navigate Circles
              </h3>
              <CircleSelector
                selected={currentCircle}
                onSelect={(circle) => setCurrentCircle(circle)}
              />
            </div>

            {/* Sovereignty Status */}
            <div className="vault-card">
              <h3 className="text-sm font-mono text-realm-gold-500 mb-3 uppercase tracking-wide">
                🛡️ Sovereignty
              </h3>
              <div className="space-y-2 text-xs text-realm-parchment-50/60">
                <p>✓ Local storage only</p>
                <p>✓ Content-addressed (IPFS)</p>
                <p>✓ Wallet-based identity</p>
                <p>✓ Zero surveillance</p>
                {authenticated && (
                  <p className="text-green-400 mt-3 pt-3 border-t border-realm-indigo-700">
                    ✓ Authenticated via SIWE
                  </p>
                )}
              </div>
            </div>

            {/* Shadow Journal Access */}
            <div className="vault-card border-2 border-realm-crimson-600/20">
              <h3 className="text-sm font-mono text-realm-crimson-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <span>⟐</span> Shadow Journal
              </h3>
              <p className="text-xs text-realm-parchment-50/60 mb-3">
                Posts integrated rather than destroyed.
              </p>
              <button
                onClick={() => setShowShadowJournal(true)}
                className="btn-ghost text-sm w-full border border-realm-crimson-600/30 hover:border-realm-crimson-600"
              >
                Open Shadow Archive
              </button>
            </div>

            {/* Post Statistics */}
            <div className="vault-card">
              <h3 className="text-sm font-mono text-realm-gold-500 mb-3 uppercase tracking-wide">
                Your Reflections
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-3 bg-realm-indigo-800 rounded-realm">
                  <div className="text-lg font-serif text-realm-indigo-500">
                    {getPostStats().vaultCount}
                  </div>
                  <div className="text-realm-parchment-50/60 mt-1">🔒 Vault</div>
                </div>
                <div className="text-center p-3 bg-realm-indigo-800 rounded-realm">
                  <div className="text-lg font-serif text-emerald-500">
                    {getPostStats().familyCount}
                  </div>
                  <div className="text-realm-parchment-50/60 mt-1">👨‍👩‍👧 Family</div>
                </div>
                <div className="text-center p-3 bg-realm-indigo-800 rounded-realm">
                  <div className="text-lg font-serif text-blue-500">
                    {getPostStats().workCount}
                  </div>
                  <div className="text-realm-parchment-50/60 mt-1">💼 Work</div>
                </div>
                <div className="text-center p-3 bg-realm-indigo-800 rounded-realm">
                  <div className="text-lg font-serif text-purple-500">
                    {getPostStats().outerCount}
                  </div>
                  <div className="text-realm-parchment-50/60 mt-1">🌐 Outer</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content — The Feed */}
          <main className="space-y-6">
            {/* Daily Reflection Counter */}
            <DailyReflectionCounter
              current={filteredPosts.length}
              total={12}
              circle={currentCircle}
            />

            {/* Post Composer */}
            <div className="vault-card">
              <h2 className="font-serif text-2xl mb-4 text-realm-gold-500">
                What stirs in your psyche?
              </h2>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Your thoughts enter the ${currentCircle === 'vault' ? 'Vault' : currentCircle.charAt(0).toUpperCase() + currentCircle.slice(1) + ' Realm'}... (⌘Enter to post)`}
                className="textarea"
                rows={4}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-realm-parchment-50/60">Writing to:</span>
                  <span className="text-sm font-mono text-realm-gold-500 uppercase">
                    {currentCircle}
                  </span>
                </div>
                <button
                  onClick={() => handleCreatePost(currentCircle)}
                  disabled={!newPost.trim() || isLoading}
                  className="btn-primary"
                >
                  {isLoading ? 'Inscribing...' : currentCircle === 'vault' ? 'Guard in Vault' : 'Open Reflection Gate'}
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {filteredPosts.length === 0 ? (
              <div className="vault-card p-12 text-center">
                <p className="font-serif text-xl text-realm-parchment-50/70 mb-2">
                  The {currentCircle === 'vault' ? 'Vault' : currentCircle.charAt(0).toUpperCase() + currentCircle.slice(1) + ' Realm'} awaits your first reflection.
                </p>
                <p className="text-sm text-realm-parchment-50/40">
                  {currentCircle === 'vault'
                    ? 'All thoughts begin here, in the inner sanctum.'
                    : 'Thoughts must first be guarded in the Vault before release.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.slice(0, 12).map(post => (
                  <ImmutablePostCard
                    key={post.id}
                    post={{
                      id: post.id,
                      cid: post.ipfsHash || `local-${post.id.slice(0, 16)}`,
                      content: post.content,
                      circle: visibilityToCircle(post.visibility),
                      createdAt: new Date(post.timestamp),
                    }}
                    onRefine={handleRefinePost}
                    onBurn={handleBurnPost}
                    onRelease={handleReleasePost}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Reflection Gate Modal */}
      {showReflectionGate && targetCircle !== 'vault' && (
        <ReflectionGate
          targetCircle={targetCircle as 'family' | 'work' | 'outer'}
          onConfirm={() => publishPost(targetCircle)}
          onCancel={() => setShowReflectionGate(false)}
        />
      )}

      {/* Evening Review */}
      {shouldShowEveningReview && (
        <EveningReview
          onComplete={completeEveningReview}
          onExport={handleExportData}
          {...getPostStats()}
        />
      )}

      {/* Shadow Journal */}
      {showShadowJournal && (
        <ShadowJournal
          onClose={() => setShowShadowJournal(false)}
          onPostRemoved={() => setPosts(loadPosts())}
        />
      )}

      {/* Burn Ritual Modal */}
      {burnRitualPost && (
        <BurnRitualModal
          postId={burnRitualPost.id}
          postContent={burnRitualPost.content}
          onComplete={handleBurnRitualComplete}
          onCancel={() => setBurnRitualPost(null)}
        />
      )}
    </div>
  );
}
