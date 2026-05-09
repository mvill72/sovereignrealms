/**
 * ArchetypePreview — Visual Samples
 *
 * Shows a miniature preview of what each archetype looks like,
 * allowing the user to see before choosing.
 */

'use client';

import React from 'react';

type ArchetypeId = 'stoic' | 'jungian' | 'anima' | 'balanced';

interface ArchetypePreviewProps {
  archetypeId: ArchetypeId;
  className?: string;
}

export function ArchetypePreview({ archetypeId, className = '' }: ArchetypePreviewProps) {
  const archetypeStyles = {
    stoic: {
      cardBg: 'bg-realm-obsidian-900',
      borderColor: 'border-realm-gold-500',
      textColor: 'text-realm-parchment-50',
      accentColor: 'text-realm-gold-500',
    },
    jungian: {
      cardBg: 'bg-realm-indigo-900',
      borderColor: 'border-realm-indigo-500',
      textColor: 'text-realm-parchment-50',
      accentColor: 'text-realm-gold-500',
    },
    anima: {
      cardBg: 'bg-realm-indigo-900',
      borderColor: 'border-realm-gold-400',
      textColor: 'text-realm-parchment-50',
      accentColor: 'text-realm-gold-400',
    },
    balanced: {
      cardBg: 'bg-realm-indigo-900',
      borderColor: 'border-realm-gold-500',
      textColor: 'text-realm-parchment-50',
      accentColor: 'text-realm-gold-500',
    },
  };

  const style = archetypeStyles[archetypeId];

  return (
    <div className={`${className} scale-75 origin-center`}>
      {/* Mini Post Card */}
      <div className={`${style.cardBg} border-l-4 ${style.borderColor} p-4 rounded-lg shadow-lg`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs font-mono ${style.accentColor}`}>
            {archetypeId === 'stoic' ? '🏛️' :
             archetypeId === 'jungian' ? '🜁' :
             archetypeId === 'anima' ? '💫' : '⚖️'}
          </span>
          <span className="text-xs font-mono opacity-60">CID: baf...</span>
        </div>

        {/* Content */}
        <p className={`text-sm ${style.textColor} font-serif leading-relaxed mb-3`}>
          {archetypeId === 'stoic'
            ? 'Discipline. Clarity. No distractions.'
            : archetypeId === 'jungian'
            ? 'The unconscious made conscious.'
            : archetypeId === 'anima'
            ? 'The soul that meets the other.'
            : 'Structure and depth united.'}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs opacity-60">
          <span>2 hours ago</span>
          <div className="flex gap-2">
            <span>✏️</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
