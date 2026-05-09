/**
 * CircleSelector — The Four Concentric Temenos
 *
 * "The browser is your citadel, and the UI is its daily Meditations."
 *
 * Four concentric glowing rings representing the Four Realms:
 * - Vault Only: Innermost obsidian core (Privacy)
 * - Family Realm: Warm gold ring (Kinship)
 * - Work Collegium: Cool indigo ring (Discipline)
 * - Outer World: Faint parchment rim (Participation)
 *
 * Clicking a ring creates a visual breath before the transition.
 * The psyche must feel the boundary between realms.
 */

'use client';

import React, { useState } from 'react';

type Circle = 'vault' | 'family' | 'work' | 'outer';

interface CircleMeta {
  label: string;
  icon: string;
  virtue: string;
  color: string;
  strokeColor: string;
  radius: number;
  strokeWidth: number;
}

const circles: Record<Circle, CircleMeta> = {
  vault: {
    label: 'Vault Only',
    icon: '🔒',
    virtue: 'Privacy',
    color: 'realm-indigo-500',
    strokeColor: '#6366f1',
    radius: 40,
    strokeWidth: 24,
  },
  family: {
    label: 'Family Realm',
    icon: '👨‍👩‍👧',
    virtue: 'Kinship',
    color: 'realm-gold-500',
    strokeColor: '#d4af77',
    radius: 80,
    strokeWidth: 18,
  },
  work: {
    label: 'Work Collegium',
    icon: '💼',
    virtue: 'Discipline',
    color: 'blue-500',
    strokeColor: '#3b82f6',
    radius: 120,
    strokeWidth: 14,
  },
  outer: {
    label: 'Outer World',
    icon: '🌐',
    virtue: 'Participation',
    color: 'purple-500',
    strokeColor: '#a855f7',
    radius: 140,
    strokeWidth: 10,
  },
};

interface CircleSelectorProps {
  selected: Circle;
  onSelect: (circle: Circle) => void;
  className?: string;
}

export function CircleSelector({ selected, onSelect, className = '' }: CircleSelectorProps) {
  const [hovered, setHovered] = useState<Circle | null>(null);
  const [expanding, setExpanding] = useState<Circle | null>(null);

  const handleSelect = (circle: Circle) => {
    if (circle === selected) return;

    // Visual breath - expand the ring before transition
    setExpanding(circle);
    setTimeout(() => {
      onSelect(circle);
      setExpanding(null);
    }, 300);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* The Concentric Rings */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox="0 0 320 320"
          style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))' }}
        >
          {(Object.entries(circles) as [Circle, CircleMeta][]).map(([key, meta]) => {
            const isSelected = selected === key;
            const isHovered = hovered === key;
            const isExpanding = expanding === key;

            const opacity = isSelected ? 1 : isHovered ? 0.8 : 0.3;
            const scale = isExpanding ? 1.05 : 1;
            const radiusAdjusted = meta.radius * scale;

            return (
              <g key={key}>
                {/* Ring */}
                <circle
                  cx="160"
                  cy="160"
                  r={radiusAdjusted}
                  fill="none"
                  stroke={meta.strokeColor}
                  strokeWidth={meta.strokeWidth}
                  opacity={opacity}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    transformOrigin: 'center',
                    strokeLinecap: 'round',
                  }}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleSelect(key)}
                />

                {/* Active pulse */}
                {isSelected && (
                  <circle
                    cx="160"
                    cy="160"
                    r={meta.radius}
                    fill="none"
                    stroke={meta.strokeColor}
                    strokeWidth={meta.strokeWidth / 2}
                    opacity="0.5"
                    className="pulse-slow"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">{circles[selected].icon}</div>
        </div>
      </div>

      {/* Selected Circle Info */}
      <div className="mt-6 text-center fade-in">
        <h3 className="text-2xl font-serif mb-2 text-realm-parchment-50">
          {circles[selected].label}
        </h3>
        <p className="text-sm text-realm-gold-500">
          Virtue: {circles[selected].virtue}
        </p>
      </div>

      {/* Circle Legend */}
      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
        {(Object.entries(circles) as [Circle, CircleMeta][]).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            className={`p-3 rounded-realm transition-all ${
              selected === key
                ? 'bg-realm-indigo-800 border-2 border-' + meta.color
                : 'bg-realm-indigo-900 border border-realm-indigo-700 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{meta.icon}</span>
              <div className="text-left flex-1">
                <p className="text-sm font-medium text-realm-parchment-50">
                  {meta.label}
                </p>
                <p className="text-xs text-realm-indigo-500">
                  {meta.virtue}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
