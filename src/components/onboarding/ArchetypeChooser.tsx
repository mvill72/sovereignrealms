/**
 * ArchetypeChooser — The Sovereign Choice
 *
 * "The first act of sovereignty is not connecting the wallet —
 *  it is declaring how the Self wishes to be seen by itself."
 *
 * At the liminal threshold of first entry, the user chooses
 * which archetypal garment will color their daily Meditations.
 *
 * No forced default. No corporate "recommended" theme.
 * Only the sovereign choosing their own mirror.
 */

'use client';

import React, { useState } from 'react';

interface Archetype {
  id: 'stoic' | 'jungian' | 'anima' | 'balanced';
  name: string;
  description: string;
  colors: string;
  previewClass: string;
  philosophy: string;
  isDefault?: boolean;
}

const archetypes: Archetype[] = [
  {
    id: 'stoic',
    name: 'The Stoic Citadel',
    description: 'Discipline. Clarity. Finite reflections. No distractions.',
    colors: 'obsidian + burnished gold',
    previewClass: 'archetype-self',
    philosophy: 'The path of Marcus Aurelius — control what is yours, release what is not.',
  },
  {
    id: 'jungian',
    name: 'The Archetypal Temenos',
    description: 'Symbols. Shadow. The unconscious made conscious.',
    colors: 'deep indigo + alchemical gold',
    previewClass: 'archetype-persona',
    philosophy: 'The path of Carl Jung — confront the archetypes, individuate through the psyche.',
  },
  {
    id: 'anima',
    name: 'The Relational Bridge',
    description: 'Warmth. Mirrored reflections. The soul that meets the other.',
    colors: 'warm gold + flowing parchment',
    previewClass: 'archetype-anima',
    philosophy: 'The path of connection — Family and Work circles honored, the relational soul.',
  },
  {
    id: 'balanced',
    name: 'The Integrated Self',
    description: 'Stoic structure with Jungian depth — the path of wholeness.',
    colors: 'balanced indigo + gold',
    previewClass: 'archetype-self',
    philosophy: 'All paths united — discipline and depth, structure and soul.',
    isDefault: true,
  },
];

interface ArchetypeChooserProps {
  onChosen: (archetypeId: Archetype['id']) => void;
}

export function ArchetypeChooser({ onChosen }: ArchetypeChooserProps) {
  const [selectedId, setSelectedId] = useState<Archetype['id']>('balanced');
  const selectedArchetype = archetypes.find(a => a.id === selectedId);

  const handleChoose = () => {
    // Save to localStorage
    localStorage.setItem('sovereignUIArchetype', selectedId);

    // Notify parent
    onChosen(selectedId);
  };

  return (
    <div className="fixed inset-0 bg-realm-indigo-950 flex items-center justify-center z-50 fade-in">
      <div className="max-w-5xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-realm-gold-500 flex items-center justify-center animate-pulse-slow">
              <span className="text-4xl">🜁</span>
            </div>
          </div>
          <h1 className="font-serif text-5xl text-realm-gold-500 mb-4">
            Choose Your Garment, Sovereign
          </h1>
          <p className="font-serif text-xl text-realm-parchment-50/70 max-w-2xl mx-auto leading-relaxed">
            The Vault is ready. How shall it appear to your inner eye?
          </p>
          <p className="text-sm text-realm-parchment-50/50 mt-4">
            This choice colors your daily Meditations. You may re-garment the realm anytime in Settings.
          </p>
        </div>

        {/* Archetype Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {archetypes.map((archetype) => (
            <button
              key={archetype.id}
              onClick={() => setSelectedId(archetype.id)}
              className={`group p-8 text-left border-2 rounded-realm transition-all duration-300 ${
                selectedId === archetype.id
                  ? 'border-realm-gold-500 bg-realm-indigo-900/50 scale-105'
                  : 'border-realm-indigo-700 hover:border-realm-indigo-500 hover:bg-realm-indigo-900/30'
              }`}
            >
              {/* Color Preview Bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`h-3 flex-1 rounded-full ${archetype.previewClass}`}
                     style={{
                       background: archetype.id === 'stoic'
                         ? 'linear-gradient(to right, #050505, #c9a15f)'
                         : archetype.id === 'jungian'
                         ? 'linear-gradient(to right, #6366f1, #c9a15f)'
                         : archetype.id === 'anima'
                         ? 'linear-gradient(to right, #d4af77, #f5eede)'
                         : 'linear-gradient(to right, #6366f1, #c9a15f, #d4af77)'
                     }}
                />
                {archetype.isDefault && (
                  <span className="text-xs font-mono text-realm-gold-500 px-2 py-1 bg-realm-gold-500/10 rounded">
                    Recommended
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl mb-3 text-realm-gold-500">
                {archetype.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-realm-parchment-50/80 mb-4 leading-relaxed">
                {archetype.description}
              </p>

              {/* Philosophy */}
              <p className="text-xs italic text-realm-parchment-50/60 mb-4">
                {archetype.philosophy}
              </p>

              {/* Color Label */}
              <div className="flex items-center justify-between pt-4 border-t border-realm-indigo-700">
                <span className="text-xs font-mono text-realm-gold-400">
                  {archetype.colors}
                </span>
                {selectedId === archetype.id && (
                  <span className="text-realm-gold-500 text-lg">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Preview */}
        {selectedArchetype && (
          <div className="vault-card mb-8 p-8 border-2 border-realm-gold-500/30">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h4 className="text-sm font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                  Your Choice
                </h4>
                <p className="font-serif text-2xl mb-3">
                  {selectedArchetype.name}
                </p>
                <p className="text-sm text-realm-parchment-50/70">
                  {selectedArchetype.philosophy}
                </p>
              </div>
              <div className="w-32 h-32 rounded-realm border-2 border-realm-gold-500 flex items-center justify-center bg-realm-indigo-900">
                <div className={`w-full h-full ${selectedArchetype.previewClass} flex items-center justify-center`}>
                  <span className="text-4xl">
                    {selectedArchetype.id === 'stoic' ? '🏛️' :
                     selectedArchetype.id === 'jungian' ? '🜁' :
                     selectedArchetype.id === 'anima' ? '💫' : '⚖️'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleChoose}
            className="btn-primary flex-1 text-lg py-5"
          >
            Enter the Vault with {selectedArchetype?.name}
          </button>
        </div>

        {/* Footer Quote */}
        <p className="text-xs italic text-realm-parchment-50/40 text-center mt-8">
          "Know thyself." — The Oracle at Delphi
        </p>
      </div>
    </div>
  );
}
