/**
 * ShadowConfirmation — Confronting the Unconscious
 *
 * "One does not become enlightened by imagining figures of light,
 *  but by making the darkness conscious."
 *
 * Burn and Revoke actions invoke the Shadow archetype.
 * This modal forces conscious confrontation with destructive actions.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useArchetype } from './ArchetypeProvider';

interface ShadowConfirmationProps {
  action: 'burn' | 'revoke';
  targetName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ShadowConfirmation({
  action,
  targetName,
  onConfirm,
  onCancel,
}: ShadowConfirmationProps) {
  const { enterShadow, exitShadow } = useArchetype();
  const [seconds, setSeconds] = useState(5);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    enterShadow();
    return () => exitShadow();
  }, [enterShadow, exitShadow]);

  useEffect(() => {
    if (seconds > 0 && acknowledged) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, acknowledged]);

  const shadowQuotes = {
    burn: {
      question: "Are you ready to burn this reflection?",
      warning: "What we destroy in haste, we cannot recover in peace.",
      wisdom: "— Marcus Aurelius, Meditations IV.3",
    },
    revoke: {
      question: "Are you revoking Circle access?",
      warning: "The shadow must be integrated consciously, not cast out in anger.",
      wisdom: "— C.G. Jung, Aion",
    },
  };

  const quote = shadowQuotes[action];

  return (
    <div className="modal-overlay flex items-center justify-center">
      <div className="modal-content max-w-md border-l-4 border-l-realm-crimson-600">
        {/* Crimson Glow */}
        <div className="absolute inset-0 bg-realm-crimson-600/5 rounded-realm pointer-events-none" />

        <div className="relative">
          <h2 className="font-serif text-2xl mb-4 text-realm-crimson-600 flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            Confronting the Shadow
          </h2>

          <p className="font-serif text-lg italic text-realm-parchment-50 mb-6">
            "{quote.question}"
          </p>

          <div className="bg-realm-indigo-800 p-4 rounded-realm mb-6 border border-realm-crimson-600/30">
            <p className="text-sm text-realm-parchment-50/80">
              <strong className="text-realm-crimson-600">Target:</strong> {targetName}
            </p>
            <p className="text-xs text-realm-parchment-50/60 mt-2">
              This action cannot be undone. The {action === 'burn' ? 'post' : 'key'} will be permanently removed.
            </p>
          </div>

          <p className="text-sm text-realm-parchment-50/70 mb-4">
            {quote.warning}
          </p>

          <p className="text-xs italic text-realm-parchment-50/40 mb-6">
            {quote.wisdom}
          </p>

          {/* Acknowledgment Checkbox */}
          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-realm-parchment-50/80">
              I acknowledge this is a destructive action. I have made the darkness conscious.
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Return to Light
            </button>
            <button
              onClick={() => {
                exitShadow();
                onConfirm();
              }}
              disabled={!acknowledged || seconds > 0}
              className="btn-destructive flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!acknowledged
                ? 'Acknowledge First'
                : seconds > 0
                ? `Integrating... ${seconds}`
                : action === 'burn'
                ? 'Burn Reflection'
                : 'Revoke Access'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
