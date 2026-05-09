/**
 * BurnRitualModal — The Alchemical Choice
 *
 * "Before the crimson gate, the Self must choose:
 *  Burn and forget, or integrate and transmute?"
 *
 * This modal appears when a user attempts to burn a post.
 * It offers two paths:
 * 1. Burn — Permanent deletion
 * 2. Integrate — Move to Shadow Journal with reflection
 *
 * The ritual forces conscious choice, not impulsive destruction.
 */

'use client';

import React, { useState } from 'react';
import { integratePostIntoShadow, deletePost } from '@/utils/storage';

interface BurnRitualModalProps {
  postId: string;
  postContent: string;
  onComplete: () => void;
  onCancel: () => void;
}

type RitualStep = 'choice' | 'reflect' | 'confirm-burn';

export function BurnRitualModal({
  postId,
  postContent,
  onComplete,
  onCancel,
}: BurnRitualModalProps) {
  const [step, setStep] = useState<RitualStep>('choice');
  const [reflectionNote, setReflectionNote] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);

  const handleBurn = () => {
    deletePost(postId);
    onComplete();
  };

  const handleIntegrate = () => {
    if (!reflectionNote.trim()) {
      alert('Please write a brief reflection on what this post revealed to you.');
      return;
    }
    integratePostIntoShadow(postId, reflectionNote);
    onComplete();
  };

  // Step 1: Choose path
  if (step === 'choice') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-2xl border-l-4 border-l-realm-crimson-600">
          {/* Crimson ambient glow */}
          <div className="absolute inset-0 bg-realm-crimson-600/5 rounded-realm pointer-events-none animate-pulse-slow" />

          <div className="relative">
            {/* Header */}
            <h2 className="font-serif text-3xl mb-4 text-realm-crimson-600 flex items-center gap-3">
              <span className="text-4xl">🜂</span>
              Confronting the Shadow
            </h2>

            <p className="font-serif text-lg italic text-realm-parchment-50/90 mb-6">
              "You stand before the crimson gate. This thought seeks release.
              Will you burn it to void, or integrate it as wisdom?"
            </p>

            {/* Post preview (faded) */}
            <div className="bg-realm-indigo-800/50 p-4 rounded-realm mb-6 border border-realm-crimson-600/30">
              <p className="text-sm font-serif text-realm-parchment-50/70 italic line-clamp-3">
                {postContent}
              </p>
            </div>

            {/* The Two Paths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Path 1: Integrate */}
              <button
                onClick={() => setStep('reflect')}
                className="group p-6 text-left border-2 border-realm-gold-500 hover:border-realm-gold-400 bg-realm-indigo-900/30 hover:bg-realm-indigo-900/50 rounded-realm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⚗️</span>
                  <h3 className="font-serif text-xl text-realm-gold-500">
                    Integrate
                  </h3>
                </div>
                <p className="text-sm text-realm-parchment-50/70 mb-3">
                  Move this to the Shadow Journal with a reflection on what it revealed.
                </p>
                <p className="text-xs italic text-realm-parchment-50/50">
                  "Making the darkness conscious."
                </p>
              </button>

              {/* Path 2: Burn */}
              <button
                onClick={() => setStep('confirm-burn')}
                className="group p-6 text-left border-2 border-realm-crimson-600 hover:border-realm-crimson-500 bg-realm-obsidian-900/30 hover:bg-realm-obsidian-900/50 rounded-realm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🜂</span>
                  <h3 className="font-serif text-xl text-realm-crimson-600">
                    Burn
                  </h3>
                </div>
                <p className="text-sm text-realm-parchment-50/70 mb-3">
                  Permanently delete this reflection. It will be unrecoverable.
                </p>
                <p className="text-xs italic text-realm-parchment-50/50">
                  "Cast to the void."
                </p>
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={onCancel}
              className="btn-secondary w-full"
            >
              Return to Light
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Integration Reflection
  if (step === 'reflect') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-2xl border-l-4 border-l-realm-gold-500">
          <div className="relative">
            <h2 className="font-serif text-2xl mb-4 text-realm-gold-500 flex items-center gap-3">
              <span className="text-3xl">⚗️</span>
              Shadow Integration Ritual
            </h2>

            <p className="text-sm text-realm-parchment-50/70 mb-6">
              Before integrating this shadow, reflect briefly on what it revealed about you.
              What pattern? What projection? What part of the Self was hidden here?
            </p>

            {/* Original post (faded) */}
            <div className="bg-realm-indigo-800/30 p-3 rounded-realm mb-4 border border-realm-gold-500/20">
              <p className="text-xs font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                Original Reflection
              </p>
              <p className="text-sm font-serif text-realm-parchment-50/60 italic line-clamp-3">
                {postContent}
              </p>
            </div>

            {/* Reflection input */}
            <div className="mb-6">
              <label className="block text-sm font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                Integration Reflection
              </label>
              <textarea
                value={reflectionNote}
                onChange={(e) => setReflectionNote(e.target.value)}
                placeholder="What did this post reveal about my unconscious patterns? How shall I transmute this shadow?"
                className="textarea"
                rows={4}
                autoFocus
              />
              <p className="text-xs text-realm-parchment-50/40 mt-2">
                This reflection will be saved with the post in your Shadow Journal.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep('choice')}
                className="btn-secondary flex-1"
              >
                ← Back
              </button>
              <button
                onClick={handleIntegrate}
                disabled={!reflectionNote.trim()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⚗️ Integrate Into Shadow Journal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Confirm Burn
  if (step === 'confirm-burn') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-2xl border-l-4 border-l-realm-crimson-600">
          <div className="absolute inset-0 bg-realm-crimson-600/5 rounded-realm pointer-events-none" />

          <div className="relative">
            <h2 className="font-serif text-2xl mb-4 text-realm-crimson-600 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              Final Warning
            </h2>

            <p className="font-serif text-lg italic text-realm-parchment-50 mb-4">
              "What we destroy in haste, we cannot recover in peace."
            </p>

            <div className="bg-realm-indigo-800 p-4 rounded-realm mb-6 border border-realm-crimson-600/30">
              <p className="text-sm font-serif text-realm-parchment-50/70 italic">
                {postContent}
              </p>
            </div>

            <p className="text-sm text-realm-parchment-50/70 mb-4">
              This action is irreversible. The post will be permanently deleted from your Vault.
            </p>

            {/* Acknowledgment */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-realm-parchment-50/80">
                I acknowledge this is permanent destruction. I have made the choice consciously.
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep('choice')}
                className="btn-secondary flex-1"
              >
                ← Reconsider
              </button>
              <button
                onClick={handleBurn}
                disabled={!acknowledged}
                className="btn-destructive flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🜂 Burn to Void
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
