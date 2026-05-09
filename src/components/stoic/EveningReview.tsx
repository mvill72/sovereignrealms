/**
 * EveningReview — The Daily Reflection Ritual
 *
 * "What did you guard today? What did you release wisely?"
 *
 * At local sunset (detected via browser) or on logout,
 * a gentle full-screen prompt appears asking for reflection.
 * One-click JSON export is framed as "Carry your Meditations with you."
 *
 * This turns the app into a daily Stoic practice rather than another feed.
 */

'use client';

import React, { useState, useEffect } from 'react';

interface EveningReviewProps {
  onComplete: () => void;
  onExport?: () => void;
  vaultCount: number;
  familyCount: number;
  workCount: number;
  outerCount: number;
}

export function EveningReview({
  onComplete,
  onExport,
  vaultCount = 0,
  familyCount = 0,
  workCount = 0,
  outerCount = 0,
}: EveningReviewProps) {
  const [reflection, setReflection] = useState({
    guarded: '',
    released: '',
  });

  const totalPosts = vaultCount + familyCount + workCount + outerCount;

  return (
    <div className="fixed inset-0 bg-realm-indigo-950 flex items-center justify-center z-50 fade-in">
      <div className="max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌙</div>
          <h2 className="text-3xl font-serif mb-3 text-realm-gold-500">
            Evening Review
          </h2>
          <p className="text-realm-parchment-50/70">
            Before you leave the realm, reflect on today's journey.
          </p>
        </div>

        {/* Today's Statistics */}
        <div className="vault-card p-6 mb-6">
          <h3 className="text-sm font-mono text-realm-gold-500 mb-4">
            TODAY'S REFLECTIONS
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-serif text-realm-indigo-500">
                {vaultCount}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">
                🔒 Vault
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-emerald-500">
                {familyCount}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">
                👨‍👩‍👧 Family
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-blue-500">
                {workCount}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">
                💼 Work
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-serif text-purple-500">
                {outerCount}
              </div>
              <div className="text-xs text-realm-parchment-50/60 mt-1">
                🌐 Outer
              </div>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-realm-indigo-700">
            <span className="text-sm text-realm-parchment-50/70">
              Total: <span className="text-realm-gold-500 font-mono">{totalPosts}</span> reflections
            </span>
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="vault-card p-6 mb-6">
          <div className="space-y-6">
            {/* Question 1 */}
            <div>
              <label className="block text-sm font-serif italic text-realm-gold-500 mb-2">
                What did you guard in the Vault today?
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={reflection.guarded}
                onChange={(e) => setReflection({ ...reflection, guarded: e.target.value })}
                placeholder="The thoughts I kept private, the boundaries I honored..."
              />
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-sm font-serif italic text-realm-gold-500 mb-2">
                What did you release wisely to the Circles?
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={reflection.released}
                onChange={(e) => setReflection({ ...reflection, released: e.target.value })}
                placeholder="The insights I shared with family, the work I published..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button onClick={onComplete} className="btn-primary w-full text-lg py-4">
            Complete Review
          </button>

          {onExport && (
            <button
              onClick={onExport}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <span>📦</span>
              <span>Carry Your Meditations (Export JSON)</span>
            </button>
          )}

          <button
            onClick={onComplete}
            className="w-full text-sm text-realm-indigo-500 hover:text-realm-indigo-400 py-2"
          >
            Skip for now
          </button>
        </div>

        {/* Stoic Quote */}
        <p className="text-xs italic text-realm-parchment-50/40 text-center mt-6">
          "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous and surly. But I have the power to guard my own thoughts."
          <span className="block mt-1 text-realm-gold-500">— Marcus Aurelius</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Hook to detect evening time (sunset)
 * Triggers the Evening Review automatically
 */
export function useEveningReview() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Trigger between 6 PM and 11 PM
      if (hour >= 18 && hour < 23) {
        const lastReview = localStorage.getItem('last_evening_review');
        const today = new Date().toDateString();

        if (lastReview !== today) {
          setShouldShow(true);
        }
      }
    };

    checkTime();
    // Check every hour
    const interval = setInterval(checkTime, 3600000);

    return () => clearInterval(interval);
  }, []);

  const markComplete = () => {
    localStorage.setItem('last_evening_review', new Date().toDateString());
    setShouldShow(false);
  };

  return { shouldShow, markComplete };
}
