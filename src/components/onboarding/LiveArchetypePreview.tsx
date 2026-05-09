/**
 * LiveArchetypePreview — Real-Time Visual Sample
 *
 * Shows a miniature version of what the archetype looks like,
 * applying the actual CSS theme so users can see before choosing.
 */

'use client';

import React from 'react';

type ArchetypeId = 'stoic' | 'jungian' | 'anima' | 'shadow' | 'wise' | 'hero' | 'persona' | 'integrated';

interface LiveArchetypePreviewProps {
  archetypeId: ArchetypeId;
  className?: string;
}

const archetypeCSSMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  shadow: 'archetype-shadow',
  wise: 'archetype-wise',
  hero: 'archetype-hero',
  persona: 'archetype-persona-weaver',
  integrated: 'archetype-integrated',
};

const sampleContent = {
  stoic: 'The dichotomy of control.',
  jungian: 'The shadow made conscious.',
  anima: 'I and Thou, meeting here.',
  shadow: 'Guard what must stay hidden.',
  wise: 'What did you guard today?',
  hero: 'Each Circle is a new stage.',
  persona: 'The mask we show the world.',
  integrated: 'All paths united as one.',
};

export function LiveArchetypePreview({ archetypeId, className = '' }: LiveArchetypePreviewProps) {
  const cssClass = archetypeCSSMap[archetypeId];

  return (
    <div className={`${cssClass} ${className} scale-75 origin-center p-4 rounded-lg`}>
      {/* Mini Vault Card with archetype styling */}
      <div className="vault-card p-3 rounded-md border-l-2 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <span className="circle-sigil text-xs">
            {archetypeId === 'stoic' ? '🏛️' :
             archetypeId === 'jungian' ? '🜁' :
             archetypeId === 'anima' ? '💫' :
             archetypeId === 'shadow' ? '🌑' :
             archetypeId === 'wise' ? '📜' :
             archetypeId === 'hero' ? '⚔️' :
             archetypeId === 'persona' ? '🎭' : '⚖️'}
          </span>
          <span className="text-xs opacity-50 font-mono">CID</span>
        </div>

        {/* Content */}
        <p className="text-xs font-serif leading-relaxed mb-2 opacity-90">
          {sampleContent[archetypeId]}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs opacity-60">
          <span>2h ago</span>
          <div className="flex gap-1">
            <span>✏️</span>
            <span>→</span>
          </div>
        </div>

        {/* Subtle archetype indicator */}
        <div className="absolute bottom-0 right-0 w-8 h-8 opacity-10 pointer-events-none">
          <div className="w-full h-full rounded-tl-lg" style={{
            background: archetypeId === 'stoic'
              ? 'linear-gradient(135deg, #050505, #c9a15f)'
              : archetypeId === 'jungian'
              ? 'linear-gradient(135deg, #6366f1, #c9a15f)'
              : archetypeId === 'anima'
              ? 'linear-gradient(135deg, #d4af77, #f5eede)'
              : archetypeId === 'shadow'
              ? 'linear-gradient(135deg, #050505, #9f1239)'
              : archetypeId === 'wise'
              ? 'linear-gradient(135deg, #f5eede, #6366f1)'
              : archetypeId === 'hero'
              ? 'linear-gradient(135deg, #967439, #d4af77)'
              : archetypeId === 'persona'
              ? 'linear-gradient(135deg, #f5eede, #6366f1)'
              : 'linear-gradient(135deg, #6366f1, #c9a15f, #d4af77)'
          }} />
        </div>
      </div>
    </div>
  );
}
