/**
 * ReflectionGate — The Pause Before Release
 *
 * "Examine before you release. Is this worthy of the Family Realm?
 *  Does it serve the Work Collegium? Or does it belong to the Outer World?"
 *
 * A deliberate 3-second pause before any post leaves Vault Only.
 * This turns every share into a micro-practice of premeditatio malorum —
 * foreseeing consequences before action.
 */

'use client';

import React, { useState, useEffect } from 'react';

interface ReflectionGateProps {
  onConfirm: () => void;
  onCancel: () => void;
  targetCircle: 'family' | 'work' | 'outer';
}

const circleWisdom = {
  family: {
    question: "Is this worthy of the Family Realm?",
    virtue: "Kinship",
    description: "Those who hold your trust. The intimate circle where vulnerability is safe.",
  },
  work: {
    question: "Does this serve the Work Collegium?",
    virtue: "Discipline",
    description: "The professional persona, consciously worn for function.",
  },
  outer: {
    question: "Is this ready for the Outer World?",
    virtue: "Participation",
    description: "The public projection. The individuated Self ready for the agora.",
  },
};

export function ReflectionGate({ onConfirm, onCancel, targetCircle }: ReflectionGateProps) {
  const [seconds, setSeconds] = useState(3);
  const wisdom = circleWisdom[targetCircle];

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="fixed inset-0 bg-realm-obsidian-950/90 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div className="vault-card max-w-md p-8 text-center">
        {/* Stoic Question */}
        <p className="font-serif text-2xl italic mb-2 text-realm-parchment-50">
          "{wisdom.question}"
        </p>

        {/* Virtue */}
        <p className="text-sm text-realm-gold-500 mb-6">
          Virtue: {wisdom.virtue}
        </p>

        {/* Description */}
        <p className="text-realm-parchment-50/70 mb-8 leading-relaxed">
          {wisdom.description}
        </p>

        {/* Reflection Timer */}
        {seconds > 0 && (
          <div className="mb-6">
            <div className="relative w-16 h-16 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  className="text-realm-indigo-700"
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  className="text-realm-gold-500 transition-all duration-1000"
                  strokeWidth="4"
                  strokeDasharray={`${((3 - seconds) / 3) * 176} 176`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-serif text-realm-gold-500">
                {seconds}
              </span>
            </div>
            <p className="text-xs text-realm-indigo-500 mt-3">
              Reflecting on your choice...
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            disabled={seconds > 0}
            onClick={onConfirm}
            className={`w-full px-8 py-4 rounded-realm font-semibold transition-all ${
              seconds > 0
                ? 'bg-realm-indigo-800 text-realm-indigo-500 cursor-not-allowed opacity-50'
                : 'btn-primary'
            }`}
          >
            {seconds > 0 ? `Pause & Reflect (${seconds})` : 'Open the Gate'}
          </button>

          <button
            onClick={onCancel}
            className="w-full text-sm text-realm-indigo-500 hover:text-realm-indigo-400 py-2"
          >
            Return to Vault
          </button>
        </div>

        {/* Stoic Quote */}
        <p className="text-xs italic text-realm-parchment-50/40 mt-6">
          "What is in my power here?"
        </p>
      </div>
    </div>
  );
}
