/**
 * ImmutablePostCard — Content as Living Meditation
 *
 * "Posts are displayed as parchment scrolls with CID hashes always visible.
 *  No likes, no hearts, no metrics. Only three actions:
 *  'Refine in Vault', 'Burn', or 'Release to Next Circle'."
 *
 * Typography is deliberately slow — generous line-height, serif body,
 * no bold marketing fonts. The content invites reflection, not reaction.
 */

'use client';

import React, { useState } from 'react';

type Circle = 'vault' | 'family' | 'work' | 'outer';

interface Post {
  id: string;
  cid: string;
  content: string;
  circle: Circle;
  createdAt: Date;
}

interface ImmutablePostCardProps {
  post: Post;
  onRefine?: (id: string) => void;
  onBurn?: (id: string) => void;
  onRelease?: (id: string, toCircle: Circle) => void;
  className?: string;
}

const circleStyles: Record<Circle, { border: string; sigil: string; badge: string }> = {
  vault: {
    border: 'border-l-realm-indigo-500',
    sigil: 'circle-sigil vault-only',
    badge: '🔒 Vault Only',
  },
  family: {
    border: 'border-l-emerald-500',
    sigil: 'circle-sigil family',
    badge: '👨‍👩‍👧 Family Realm',
  },
  work: {
    border: 'border-l-blue-500',
    sigil: 'circle-sigil work',
    badge: '💼 Work Collegium',
  },
  outer: {
    border: 'border-l-purple-500',
    sigil: 'circle-sigil outer',
    badge: '🌐 Outer World',
  },
};

const nextCircle: Record<Circle, Circle | null> = {
  vault: 'family',
  family: 'work',
  work: 'outer',
  outer: null,
};

export function ImmutablePostCard({
  post,
  onRefine,
  onBurn,
  onRelease,
  className = '',
}: ImmutablePostCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const style = circleStyles[post.circle];
  const canRelease = nextCircle[post.circle] !== null;
  const timeAgo = formatTimeAgo(post.createdAt);

  return (
    <article
      className={`post-card ${style.border} ${className}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header */}
      <header className="flex justify-between items-start mb-4">
        {/* Circle Badge */}
        <span className={style.sigil}>
          {style.badge}
        </span>

        {/* CID Hash (Always Visible) */}
        <div className="text-right">
          <div className="font-mono text-xs text-realm-indigo-500 mb-1">
            CID
          </div>
          <code className="font-mono text-xs text-realm-parchment-50/60 hover:text-realm-parchment-50 transition-colors cursor-pointer">
            {post.cid.slice(0, 12)}...{post.cid.slice(-8)}
          </code>
        </div>
      </header>

      {/* Content — The Scroll */}
      <div className="font-serif text-lg leading-relaxed text-realm-parchment-50 mb-4">
        {isExpanded ? (
          <p>{post.content}</p>
        ) : (
          <p>
            {post.content.length > 280
              ? `${post.content.slice(0, 280)}...`
              : post.content}
          </p>
        )}

        {post.content.length > 280 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-realm-gold-500 hover:text-realm-gold-400 mt-2"
          >
            {isExpanded ? 'Show less' : 'Read full reflection'}
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center pt-4 border-t border-realm-indigo-700">
        {/* Timestamp */}
        <time className="text-sm text-realm-indigo-500" dateTime={post.createdAt.toISOString()}>
          {timeAgo}
        </time>

        {/* Actions (Shown on Hover) */}
        <div
          className={`flex gap-2 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Refine in Vault */}
          {onRefine && post.circle !== 'vault' && (
            <button
              onClick={() => onRefine(post.id)}
              className="text-sm text-realm-indigo-500 hover:text-realm-indigo-400 transition-colors"
              title="Return to Vault for refinement"
            >
              ✏️ Refine
            </button>
          )}

          {/* Release to Next Circle */}
          {onRelease && canRelease && (
            <button
              onClick={() => onRelease(post.id, nextCircle[post.circle]!)}
              className="text-sm text-realm-gold-500 hover:text-realm-gold-400 transition-colors"
              title={`Release to ${nextCircle[post.circle]}`}
            >
              → Release
            </button>
          )}

          {/* Burn (Destructive) */}
          {onBurn && (
            <button
              onClick={() => {
                if (confirm('Burn this reflection permanently? This cannot be undone.')) {
                  onBurn(post.id);
                }
              }}
              className="text-sm text-realm-crimson-600 hover:text-red-400 transition-colors"
              title="Burn this reflection (permanent)"
            >
              🔥 Burn
            </button>
          )}
        </div>
      </footer>

      {/* Subtle Parchment Grain Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </article>
  );
}

/**
 * Utility: Format time ago
 */
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
}
