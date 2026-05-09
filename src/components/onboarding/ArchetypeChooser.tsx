/**
 * ArchetypeChooser — The Sovereign Choice (Expanded Mandala)
 *
 * "The first act of sovereignty is not connecting the wallet —
 *  it is declaring how the Self wishes to be seen by itself."
 *
 * At the liminal threshold of first entry, the user chooses
 * which archetypal garment will color their daily Meditations.
 *
 * Eight distinct paths:
 * - Stoic, Jungian, Anima, Shadow, Wise, Hero, Persona, Integrated
 *
 * No forced default. No corporate "recommended" theme.
 * Only the sovereign choosing their own mirror.
 */

'use client';

import React, { useState } from 'react';

interface Archetype {
  id: 'stoic' | 'jungian' | 'anima' | 'shadow' | 'wise' | 'hero' | 'persona' | 'integrated';
  name: string;
  description: string;
  colors: string;
  previewClass: string;
  philosophy: string;
  icon: string;
  isDefault?: boolean;
}

const archetypes: Archetype[] = [
  {
    id: 'stoic',
    name: 'The Stoic Citadel',
    description: 'Discipline. Clarity. Finite reflections. The browser as pure inner sanctum.',
    colors: 'obsidian + burnished gold',
    previewClass: 'archetype-self',
    philosophy: 'The path of Marcus Aurelius — control what is yours, release what is not.',
    icon: '🏛️',
  },
  {
    id: 'jungian',
    name: 'The Jungian Temenos',
    description: 'Symbols of the unconscious. Shadow work. Archetypes made visible.',
    colors: 'deep indigo + alchemical gold',
    previewClass: 'archetype-persona',
    philosophy: 'The path of Carl Jung — confront the archetypes, individuate through the psyche.',
    icon: '🜁',
  },
  {
    id: 'anima',
    name: 'The Relational Bridge',
    description: 'Warmth. Mirrored reflections. The living tension of I and Thou.',
    colors: 'warm gold + flowing parchment',
    previewClass: 'archetype-anima',
    philosophy: 'The path of connection — Family and Work circles honored, the relational soul.',
    icon: '💫',
  },
  {
    id: 'shadow',
    name: 'The Shadow Guardian',
    description: 'Privacy first. Revocation as power. Confront the darkness consciously.',
    colors: 'obsidian + crimson warning',
    previewClass: 'archetype-shadow',
    philosophy: 'The path of privacy — guard what must remain hidden, burn what no longer serves.',
    icon: '🌑',
  },
  {
    id: 'wise',
    name: 'The Wise Old One',
    description: 'Evening review. Inner guidance. Every thought becomes a meditation.',
    colors: 'parchment + muted indigo',
    previewClass: 'archetype-wise',
    philosophy: 'The path of reflection — daily examination, the inner guide always present.',
    icon: '📜',
  },
  {
    id: 'hero',
    name: 'The Hero of Individuation',
    description: 'The journey. Claim each Circle as a step toward wholeness.',
    colors: 'growing gold rings',
    previewClass: 'archetype-hero',
    philosophy: 'The path of becoming — each Circle unlocked is a stage in the journey.',
    icon: '⚔️',
  },
  {
    id: 'persona',
    name: 'The Persona Weaver',
    description: 'Express the outer mask. Optional federation. Step into the agora when ready.',
    colors: 'parchment + globe sigil',
    previewClass: 'archetype-persona-weaver',
    philosophy: 'The path of expression — the outer world as stage for the conscious persona.',
    icon: '🎭',
  },
  {
    id: 'integrated',
    name: 'The Integrated Self',
    description: 'Wholeness. Stoic structure meets Jungian depth. The path of the sovereign.',
    colors: 'balanced indigo + gold',
    previewClass: 'archetype-integrated',
    philosophy: 'All paths united — discipline and depth, structure and soul, privacy and expression.',
    icon: '⚖️',
    isDefault: true,
  },
];

interface ArchetypeChooserProps {
  onChosen: (archetypeId: Archetype['id']) => void;
}

export function ArchetypeChooser({ onChosen }: ArchetypeChooserProps) {
  const [selectedId, setSelectedId] = useState<Archetype['id']>('integrated');
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

        {/* Archetype Grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {archetypes.map((archetype) => (
            <button
              key={archetype.id}
              onClick={() => setSelectedId(archetype.id)}
              className={`group p-6 text-left border-2 rounded-realm transition-all duration-300 flex flex-col h-full ${
                selectedId === archetype.id
                  ? 'border-realm-gold-500 bg-realm-indigo-900/50 scale-105 ring-2 ring-realm-gold-400/30'
                  : 'border-realm-indigo-700 hover:border-realm-indigo-500 hover:bg-realm-indigo-900/30'
              }`}
            >
              {/* Icon + Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{archetype.icon}</span>
                {archetype.isDefault && (
                  <span className="text-xs font-mono text-realm-gold-500 px-2 py-1 bg-realm-gold-500/10 rounded">
                    Recommended
                  </span>
                )}
              </div>

              {/* Color Preview Bar */}
              <div className={`h-2 w-full rounded-full mb-4 transition-all group-hover:scale-105 ${archetype.previewClass}`}
                   style={{
                     background: archetype.id === 'stoic'
                       ? 'linear-gradient(to right, #050505, #c9a15f)'
                       : archetype.id === 'jungian'
                       ? 'linear-gradient(to right, #6366f1, #c9a15f)'
                       : archetype.id === 'anima'
                       ? 'linear-gradient(to right, #d4af77, #f5eede)'
                       : archetype.id === 'shadow'
                       ? 'linear-gradient(to right, #050505, #9f1239)'
                       : archetype.id === 'wise'
                       ? 'linear-gradient(to right, #f5eede, #6366f1)'
                       : archetype.id === 'hero'
                       ? 'linear-gradient(to right, #967439, #c9a15f, #d4af77)'
                       : archetype.id === 'persona'
                       ? 'linear-gradient(to right, #f5eede, #c9a15f)'
                       : 'linear-gradient(to right, #6366f1, #c9a15f, #d4af77)'
                   }}
              />

              {/* Title */}
              <h3 className="font-serif text-lg mb-2 text-realm-gold-500 min-h-[3.5rem]">
                {archetype.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-realm-parchment-50/80 mb-3 leading-relaxed flex-1">
                {archetype.description}
              </p>

              {/* Color Label */}
              <div className="flex items-center justify-between pt-3 border-t border-realm-indigo-700 mt-auto">
                <span className="text-xs font-mono text-realm-gold-400">
                  {archetype.colors}
                </span>
                {selectedId === archetype.id && (
                  <span className="text-realm-gold-500 text-sm">✓</span>
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
                  <span className="text-5xl">{selectedArchetype.icon}</span>
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
