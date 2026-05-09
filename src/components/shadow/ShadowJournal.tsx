/**
 * ShadowJournal — The Sacred Archive of Integration
 *
 * "What we resist persists. What we confront integrates."
 *
 * The Shadow Journal holds posts that were chosen for integration
 * rather than destruction — thoughts that revealed unconscious patterns,
 * projections that needed acknowledgment, reflections that served their
 * purpose but no longer belong in the active Vault.
 *
 * This is not deletion. This is transmutation.
 */

'use client';

import React from 'react';
import { getShadowPosts, removeShadowPost, type Post } from '@/utils/storage';

interface ShadowJournalProps {
  onClose: () => void;
  onPostRemoved?: () => void;
}

export function ShadowJournal({ onClose, onPostRemoved }: ShadowJournalProps) {
  const [shadowPosts, setShadowPosts] = React.useState<Post[]>([]);
  const [confirmBurn, setConfirmBurn] = React.useState<string | null>(null);

  React.useEffect(() => {
    setShadowPosts(getShadowPosts());
  }, []);

  const handleBurnFromJournal = (postId: string) => {
    const updated = removeShadowPost(postId);
    setShadowPosts(updated.filter(p => p.shadowStatus));
    setConfirmBurn(null);
    onPostRemoved?.();
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-realm-obsidian-950/95 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="vault-card mb-6 border-2 border-realm-crimson-600/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif text-3xl text-realm-crimson-600 flex items-center gap-3 mb-2">
                <span className="text-4xl">⟐</span>
                The Shadow Journal
              </h2>
              <p className="text-sm text-realm-parchment-50/70">
                Posts you have chosen to integrate rather than destroy.
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost text-sm"
            >
              ✕ Close
            </button>
          </div>

          {/* Philosophy */}
          <div className="bg-realm-indigo-800/50 p-4 rounded-realm border-l-4 border-l-realm-crimson-600">
            <p className="text-xs italic text-realm-parchment-50/70">
              "One does not become enlightened by imagining figures of light,
              but by making the darkness conscious. The Shadow is not to be banished —
              it is to be integrated."
            </p>
            <p className="text-xs text-realm-parchment-50/40 mt-2">
              — C.G. Jung, Aion
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-realm-crimson-600/10 rounded-realm">
              <div className="text-2xl font-serif text-realm-crimson-600">
                {shadowPosts.length}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">Total Integrated</div>
            </div>
            <div className="text-center p-3 bg-realm-crimson-600/10 rounded-realm">
              <div className="text-2xl font-serif text-realm-crimson-600">
                {shadowPosts.filter(p => p.shadowStatus === 'integrated').length}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">With Reflection</div>
            </div>
            <div className="text-center p-3 bg-realm-crimson-600/10 rounded-realm">
              <div className="text-2xl font-serif text-realm-crimson-600">
                {shadowPosts.filter(p => p.shadowStatus === 'confronted').length}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">Confronted</div>
            </div>
          </div>
        </div>

        {/* Shadow Posts */}
        {shadowPosts.length === 0 ? (
          <div className="vault-card p-12 text-center border-2 border-realm-crimson-600/10">
            <span className="text-6xl mb-4 block opacity-30">⟐</span>
            <p className="font-serif text-xl text-realm-parchment-50/70 mb-2">
              The Shadow Journal is empty.
            </p>
            <p className="text-sm text-realm-parchment-50/40">
              When you choose to integrate rather than burn, posts will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {shadowPosts.map(post => (
              <div
                key={post.id}
                className="vault-card border-l-4 border-l-realm-crimson-600 relative overflow-hidden"
              >
                {/* Faded crimson thread overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-realm-crimson-600/30 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-realm-crimson-600/30 to-transparent" />
                </div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-realm-crimson-600">⟐</span>
                      <span className="text-xs font-mono text-realm-crimson-600 uppercase">
                        {post.shadowStatus === 'integrated' ? 'Integrated' : 'Confronted'}
                      </span>
                    </div>
                    <time className="text-xs text-realm-parchment-50/40">
                      {formatDate(post.timestamp)}
                    </time>
                  </div>

                  {/* Content (faded) */}
                  <p className="font-serif text-sm leading-relaxed mb-4 text-realm-parchment-50/60 italic">
                    {post.content}
                  </p>

                  {/* Reflection Note */}
                  {post.shadowNote && (
                    <div className="bg-realm-indigo-800/30 p-3 rounded-realm mb-4 border border-realm-crimson-600/20">
                      <p className="text-xs font-mono text-realm-gold-500 mb-1 uppercase tracking-wide">
                        Integration Reflection
                      </p>
                      <p className="text-sm text-realm-parchment-50/80">
                        {post.shadowNote}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end items-center gap-3 pt-3 border-t border-realm-indigo-700">
                    {confirmBurn === post.id ? (
                      <>
                        <span className="text-xs text-realm-parchment-50/60">
                          Burn this shadow permanently?
                        </span>
                        <button
                          onClick={() => setConfirmBurn(null)}
                          className="btn-ghost text-xs py-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleBurnFromJournal(post.id)}
                          className="btn-destructive text-xs py-1"
                        >
                          🜂 Burn Forever
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setConfirmBurn(post.id)}
                        className="text-xs text-realm-crimson-600 hover:text-realm-crimson-400 transition-colors"
                      >
                        Transmute to Void
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-realm-parchment-50/40 italic">
            "The shadow is a moral problem that challenges the whole ego-personality,
            for no one can become conscious of the shadow without considerable moral effort."
          </p>
          <p className="text-xs text-realm-parchment-50/30 mt-1">
            — C.G. Jung, Psychology and Religion
          </p>
        </div>
      </div>
    </div>
  );
}
