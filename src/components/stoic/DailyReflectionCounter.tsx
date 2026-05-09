/**
 * DailyReflectionCounter — The Citadel Principle
 *
 * "Control what is yours. The algorithm cannot decide what you see. You do."
 *
 * Displays a finite count of reflections for the day (max 7-12 posts).
 * No infinite scroll. Content is presented as a daily review,
 * like Marcus Aurelius's evening examination.
 *
 * The counter enforces the dichotomy of control:
 * What you create today is finite. What you consume is finite.
 * This is not a limitation — it is liberation.
 */

'use client';

import React from 'react';

interface DailyReflectionCounterProps {
  current: number;
  total: number;
  circle?: 'vault' | 'family' | 'work' | 'outer';
  date?: Date;
  className?: string;
}

const circleLabels = {
  vault: 'VAULT ONLY',
  family: 'FAMILY REALM',
  work: 'WORK COLLEGIUM',
  outer: 'OUTER WORLD',
};

export function DailyReflectionCounter({
  current,
  total,
  circle = 'vault',
  date = new Date(),
  className = '',
}: DailyReflectionCounterProps) {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const circleLabel = circleLabels[circle];
  const progress = (current / total) * 100;

  return (
    <div className={`vault-card p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Circle & Date */}
        <div className="flex items-center gap-3">
          <span className="text-realm-gold-500 text-sm font-mono font-semibold">
            {circleLabel}
          </span>
          <span className="text-realm-indigo-500 text-sm">•</span>
          <span className="text-realm-parchment-50/70 text-sm">
            {dayName}
          </span>
        </div>

        {/* Counter Badge */}
        <div className="px-3 py-1 bg-realm-indigo-800 rounded-realm border border-realm-indigo-700">
          <span className="text-xs font-mono text-realm-gold-500">
            {current} of {total}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-realm-indigo-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-realm-gold-600 to-realm-gold-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stoic Reminder */}
      <p className="text-xs italic text-realm-parchment-50/40 mt-3 text-center">
        {current < total
          ? `${total - current} reflections remain today`
          : "Today's reflections are complete"}
      </p>
    </div>
  );
}

/**
 * Infinite Scroll Alternative — Finite Feed Message
 *
 * Shown when user reaches the end of today's reflections.
 * Encourages closure instead of endless scrolling.
 */
export function ReflectionEndMessage({ circle = 'vault' }: { circle?: string }) {
  return (
    <div className="vault-card p-8 text-center mt-8">
      <div className="text-4xl mb-4">✓</div>
      <h3 className="text-xl font-serif mb-3 text-realm-parchment-50">
        Today's Reflections Complete
      </h3>
      <p className="text-realm-parchment-50/70 mb-6 max-w-md mx-auto leading-relaxed">
        You have reviewed all thoughts in your {circle} realm for today.
        Return tomorrow for new reflections, or create your own.
      </p>
      <p className="text-xs italic text-realm-gold-500">
        "The obstacle is the way. The end of the scroll is not a wall — it is freedom."
      </p>
    </div>
  );
}
