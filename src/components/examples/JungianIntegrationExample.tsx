/**
 * Jungian Integration Example — Complete Implementation
 *
 * This demonstrates how to integrate all Jungian archetype components
 * into a SovereignRealm application with Stoic UI patterns.
 */

'use client';

import React, { useState } from 'react';
import { useArchetype, HeroCall, ShadowConfirmation } from '@/components/archetypes';
import { ImmutablePostCard, ReflectionGate } from '@/components/stoic';

export function JungianIntegrationExample() {
  const { activeArchetype, activeCircle, setActiveCircle, enterShadow } = useArchetype();

  const [showHeroCall, setShowHeroCall] = useState(false);
  const [showShadowModal, setShowShadowModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Example post data
  const examplePost = {
    id: '1',
    cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
    content: 'This is an example reflection from the Vault. Notice the Wise Old One prompt below.',
    circle: 'vault' as const,
    createdAt: new Date(),
  };

  return (
    <div className="min-h-screen bg-realm-indigo-950 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Archetype Status Display */}
        <div className="vault-card">
          <h2 className="font-serif text-2xl mb-4 text-realm-gold-500">
            Jungian UI Integration
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-realm-parchment-50/60">Active Archetype:</span>
              <span className="ml-2 font-mono text-realm-gold-500">
                {activeArchetype}
              </span>
            </div>
            <div>
              <span className="text-realm-parchment-50/60">Active Circle:</span>
              <span className="ml-2 font-mono text-realm-gold-500">
                {activeCircle}
              </span>
            </div>
          </div>
        </div>

        {/* Hero's Call Demo */}
        <div className="vault-card">
          <h3 className="font-serif text-xl mb-3">The Hero — Onboarding Journey</h3>
          <p className="text-sm text-realm-parchment-50/70 mb-4">
            First-time users see the Hero's Call. This frames wallet connection
            as the beginning of individuation, not just authentication.
          </p>
          <button
            onClick={() => setShowHeroCall(true)}
            className="btn-primary"
          >
            Launch Hero's Call
          </button>
        </div>

        {/* Shadow Confrontation Demo */}
        <div className="vault-card border-l-4 border-l-realm-crimson-600">
          <h3 className="font-serif text-xl mb-3">The Shadow — Destructive Actions</h3>
          <p className="text-sm text-realm-parchment-50/70 mb-4">
            Burn and Revoke actions invoke the Shadow archetype with
            a 5-second reflection timer and conscious acknowledgment.
          </p>
          <button
            onClick={() => setShowShadowModal(true)}
            className="btn-destructive"
          >
            Demonstrate Shadow Modal
          </button>
        </div>

        {/* Post Card with Wise Old One */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl text-realm-gold-500">
            The Wise Old One — Reflection Prompts
          </h3>
          <p className="text-sm text-realm-parchment-50/70 mb-4">
            Each post card includes a daily reflection prompt from the archetype
            of wisdom. The question changes based on the Circle and rotates daily.
          </p>
          <ImmutablePostCard
            post={examplePost}
            onRefine={(id) => console.log('Refine:', id)}
            onRelease={(id, circle) => console.log('Release:', id, circle)}
            onBurn={(id) => {
              console.log('Burn triggered:', id);
              setShowShadowModal(true);
            }}
          />
        </div>

        {/* Circle Selector Integration */}
        <div className="vault-card">
          <h3 className="font-serif text-xl mb-3">The Persona — Circle Navigation</h3>
          <p className="text-sm text-realm-parchment-50/70 mb-4">
            The four Circles represent the Persona's four expressions.
            Switching Circles shifts the archetype and UI accent colors.
          </p>
          <div className="flex gap-3">
            {(['vault', 'family', 'work', 'outer'] as const).map((circle) => (
              <button
                key={circle}
                onClick={() => setActiveCircle(circle)}
                className={`px-4 py-2 rounded-realm transition-all ${
                  activeCircle === circle
                    ? 'bg-realm-gold-500 text-realm-indigo-950'
                    : 'bg-realm-indigo-800 text-realm-parchment-50/70 hover:bg-realm-indigo-700'
                }`}
              >
                {circle.charAt(0).toUpperCase() + circle.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Notes */}
        <div className="vault-card bg-realm-indigo-800/50 border-realm-gold-500">
          <h3 className="font-serif text-xl mb-3 text-realm-gold-500">
            Integration Complete ✓
          </h3>
          <div className="space-y-2 text-sm text-realm-parchment-50/70">
            <p>✓ ArchetypeProvider wraps entire app (see layout.tsx)</p>
            <p>✓ Dynamic theme switching based on active archetype</p>
            <p>✓ Hero's Call for first-time wallet connection</p>
            <p>✓ Shadow confirmation for destructive actions</p>
            <p>✓ Wise Old One prompts on every post card</p>
            <p>✓ Circle-based archetype mapping (Self/Persona/Anima)</p>
          </div>
        </div>
      </div>

      {/* Hero Call Modal */}
      {showHeroCall && (
        <HeroCall
          onBegin={() => setShowHeroCall(false)}
          isConnected={isConnected}
          onConnect={() => setIsConnected(true)}
        />
      )}

      {/* Shadow Confirmation Modal */}
      {showShadowModal && (
        <ShadowConfirmation
          action="burn"
          targetName="Example Reflection"
          onConfirm={() => {
            console.log('Shadow integrated - post burned');
            setShowShadowModal(false);
          }}
          onCancel={() => setShowShadowModal(false)}
        />
      )}
    </div>
  );
}
