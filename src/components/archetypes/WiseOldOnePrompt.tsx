/**
 * WiseOldOnePrompt — The Inner Guide
 *
 * "The wise old one appears in dreams as the archetype of meaning,
 *  the one who knows the deeper patterns."
 *
 * This subtle prompt appears at the bottom of each post card,
 * offering a reflective question from the archetype of wisdom.
 */

'use client';

import React from 'react';

type Circle = 'vault' | 'family' | 'work' | 'outer';

interface WiseOldOnePromptProps {
  circle: Circle;
  className?: string;
}

const wisdom: Record<Circle, string[]> = {
  vault: [
    "What have you guarded in the Vault today?",
    "Is this thought truly yours, or inherited?",
    "What does this reflection reveal about the Self?",
    "Have you examined your own assumptions?",
  ],
  family: [
    "Does this serve the bonds of kinship?",
    "Have you spoken from the heart, not the mask?",
    "What bridges understanding here?",
    "Is this gift freely given, or obligation?",
  ],
  work: [
    "Does this advance the work, or the ego?",
    "Have you served excellence over appearance?",
    "What virtue does this embody?",
    "Is this contribution worthy of your calling?",
  ],
  outer: [
    "Are you sharing wisdom, or seeking validation?",
    "Does this add signal to the world, or noise?",
    "What will this look like in ten years?",
    "Have you released attachment to the outcome?",
  ],
};

export function WiseOldOnePrompt({ circle, className = '' }: WiseOldOnePromptProps) {
  // Deterministically select wisdom based on date (changes daily)
  const today = new Date().toDateString();
  const hash = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const promptIndex = hash % wisdom[circle].length;
  const prompt = wisdom[circle][promptIndex];

  return (
    <div className={`flex items-start gap-2 mt-4 pt-4 border-t border-realm-indigo-700 ${className}`}>
      <span className="text-lg opacity-60">📜</span>
      <p className="text-xs italic text-realm-parchment-50/50 flex-1">
        {prompt}
      </p>
    </div>
  );
}
