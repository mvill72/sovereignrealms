/**
 * HeroCall — The Journey Begins
 *
 * "The hero's journey is the journey from the unconscious to consciousness,
 *  from sleep to awakening."
 *
 * This onboarding screen appears on first wallet connection.
 * It frames the realm not as a social app, but as the Hero's descent
 * into the Vault — the beginning of individuation.
 */

'use client';

import React, { useState } from 'react';
import { useArchetype } from './ArchetypeProvider';

interface HeroCallProps {
  onBegin: () => void;
  isConnected: boolean;
  onConnect: () => void;
}

export function HeroCall({ onBegin, isConnected, onConnect }: HeroCallProps) {
  const { enterHero, exitHero } = useArchetype();
  const [step, setStep] = useState<'call' | 'descent' | 'claim'>('call');

  const handleBegin = () => {
    if (!isConnected) {
      onConnect();
      return;
    }
    setStep('descent');
  };

  const handleClaimVault = () => {
    setStep('claim');
    setTimeout(() => {
      exitHero();
      onBegin();
    }, 2000);
  };

  if (step === 'call') {
    return (
      <div className="fixed inset-0 bg-realm-indigo-950 flex items-center justify-center z-50">
        <div className="vault-card p-12 text-center max-w-2xl">
          {/* Alchemical Symbol — The Self */}
          <div className="mx-auto w-32 h-32 rounded-full border-4 border-realm-gold-500 flex items-center justify-center mb-8 animate-pulse-slow">
            <span className="text-6xl">🜁</span>
          </div>

          <h1 className="font-serif text-5xl mb-6 text-realm-gold-500">
            The Call to Adventure
          </h1>

          <p className="font-serif text-xl text-realm-parchment-50/80 max-w-md mx-auto mb-8 leading-relaxed">
            Your wallet is not a login. It is the <span className="text-realm-gold-500">sigil of the Self</span>
            — the cryptographic seal of your sovereign identity.
          </p>

          <p className="text-sm text-realm-parchment-50/60 max-w-lg mx-auto mb-12">
            Before you enter the agora, you must first descend into the Vault.
            Here, in the innermost circle, your thoughts remain yours alone.
            Only when ready do you release them to the outer realms.
          </p>

          <button
            onClick={handleBegin}
            className="btn-primary text-lg px-12 py-5"
          >
            {isConnected ? 'Enter the Vault' : 'Connect Wallet to Begin'}
          </button>

          <p className="text-xs italic text-realm-parchment-50/40 mt-8">
            "Know thyself." — The Oracle at Delphi
          </p>
        </div>
      </div>
    );
  }

  if (step === 'descent') {
    return (
      <div className="fixed inset-0 bg-realm-indigo-950 flex items-center justify-center z-50">
        <div className="vault-card p-12 text-center max-w-2xl">
          <h2 className="font-serif text-4xl mb-6 text-realm-gold-500">
            The Descent into the Vault
          </h2>

          <p className="font-serif text-lg text-realm-parchment-50/80 mb-8 leading-relaxed">
            This is your <span className="text-realm-gold-500">temenos</span> —
            the sacred inner enclosure where the individuated Self exists first,
            before any projection into the collective.
          </p>

          {/* The Four Circles — Unlocking */}
          <div className="my-12">
            <svg viewBox="0 0 320 240" className="w-full max-w-md mx-auto">
              {/* Vault — Center (glowing) */}
              <circle
                cx="160"
                cy="120"
                r="40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="4"
                className="animate-pulse-slow"
              />
              <text x="160" y="130" textAnchor="middle" fill="#c9a15f" fontSize="14" fontFamily="serif">
                Vault (You)
              </text>

              {/* Family — Inner ring (locked) */}
              <circle
                cx="160"
                cy="120"
                r="70"
                fill="none"
                stroke="#2a2a7a"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.3"
              />

              {/* Work — Middle ring (locked) */}
              <circle
                cx="160"
                cy="120"
                r="100"
                fill="none"
                stroke="#2a2a7a"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.3"
              />

              {/* Outer — Outer ring (locked) */}
              <circle
                cx="160"
                cy="120"
                r="130"
                fill="none"
                stroke="#2a2a7a"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            </svg>
          </div>

          <p className="text-sm text-realm-parchment-50/60 mb-8">
            The outer circles remain locked until you are ready to share.
            Start here, in the center. Guard what is yours.
          </p>

          <button
            onClick={handleClaimVault}
            className="btn-primary px-10 py-4"
          >
            Claim the Vault
          </button>
        </div>
      </div>
    );
  }

  if (step === 'claim') {
    return (
      <div className="fixed inset-0 bg-realm-indigo-950 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mx-auto w-32 h-32 rounded-full border-4 border-realm-gold-500 flex items-center justify-center mb-8 animate-pulse">
            <span className="text-6xl">✓</span>
          </div>
          <h2 className="font-serif text-4xl text-realm-gold-500">
            The Vault is Yours
          </h2>
          <p className="text-realm-parchment-50/60 mt-4">
            The Hero's journey has begun...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
