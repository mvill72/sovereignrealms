'use client';

import { useState } from 'react';
import { uploadTextToIPFS } from '@/utils/ipfs';
import { addPost, type Post } from '@/utils/storage';
import { isFederationEnabled } from '@/federation/fedify-instance';

interface PostComposerProps {
  onPostCreated?: (post: Post) => void;
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<Post['visibility']>('private');
  const [isLoading, setIsLoading] = useState(false);
  const federationEnabled = isFederationEnabled();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      // Upload to IPFS (content-addressed)
      const ipfsHash = await uploadTextToIPFS(content);

      const post: Post = {
        id: Date.now().toString(),
        content,
        ipfsHash: ipfsHash.startsWith('local-') ? undefined : ipfsHash,
        visibility,
        timestamp: new Date().toISOString(),
      };

      // Save to local storage
      addPost(post);

      // If public and federation enabled, it will be picked up by ActivityPub outbox
      if (visibility === 'public' && federationEnabled) {
        console.log('✅ Post will federate to Fediverse');
        // Future: Trigger ActivityPub Create activity
      }

      setContent('');
      onPostCreated?.(post);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const getVisibilityInfo = (vis: Post['visibility']) => {
    const info = {
      private: {
        icon: '🔒',
        label: 'Private Vault',
        description: 'Only you can see this',
        color: 'zinc',
      },
      family: {
        icon: '👨‍👩‍👧',
        label: 'Family Circle',
        description: 'Only family token holders',
        color: 'emerald',
      },
      work: {
        icon: '💼',
        label: 'Work Circle',
        description: 'Only work colleagues',
        color: 'blue',
      },
      public: {
        icon: '🌐',
        label: 'Public / Fediverse',
        description: federationEnabled
          ? 'Visible to everyone + federates to Mastodon, etc.'
          : 'Visible to everyone (federation disabled)',
        color: 'amber',
      },
    };
    return info[vis];
  };

  const visInfo = getVisibilityInfo(visibility);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">What stirs in your psyche?</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Your thoughts, your realm. Private by default... (Cmd/Ctrl+Enter to post)"
        className="w-full bg-zinc-800 p-4 rounded-xl resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-violet-500"
        disabled={isLoading}
      />

      <div className="mt-4 flex flex-col gap-4">
        {/* Visibility Selector */}
        <div className="bg-zinc-950 p-4 rounded-lg">
          <label className="block text-sm text-zinc-500 mb-2">Share with:</label>
          <div className="grid grid-cols-2 gap-2">
            {(['private', 'family', 'work', 'public'] as const).map((vis) => {
              const info = getVisibilityInfo(vis);
              return (
                <button
                  key={vis}
                  type="button"
                  onClick={() => setVisibility(vis)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    visibility === vis
                      ? `bg-${info.color}-900 ring-2 ring-${info.color}-500`
                      : `bg-${info.color}-950 hover:bg-${info.color}-900`
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{info.icon}</span>
                    <span className="font-medium text-sm">{info.label}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{info.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-zinc-500">
            {content.length} characters
          </div>
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 disabled:cursor-not-allowed px-8 py-3 rounded-full font-medium transition-colors"
          >
            {isLoading ? (
              'Publishing...'
            ) : (
              <>
                {visInfo.icon} Post to {visInfo.label}
              </>
            )}
          </button>
        </div>

        {/* Federation Notice */}
        {visibility === 'public' && federationEnabled && (
          <div className="bg-blue-950/20 border border-blue-900/30 rounded-lg p-3">
            <p className="text-sm text-blue-400">
              🌐 This post will federate to the Fediverse (Mastodon, Pixelfed, etc.)
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
