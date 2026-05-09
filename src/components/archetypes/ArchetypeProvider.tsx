/**
 * ArchetypeProvider — The Psychological Context
 *
 * "The soul is dyed by the colour of its thoughts."
 *
 * This provider tracks which archetype is currently active in the UI,
 * allowing the entire interface to shift its visual language and interaction
 * patterns based on the psychological state.
 *
 * Active Archetypes:
 * - Self (Vault) — The center, the wholeness
 * - Persona (Circles) — The social masks
 * - Shadow (Burn/Revoke) — The confrontation
 * - Hero (Onboarding) — The journey
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Archetype = 'self' | 'shadow' | 'persona' | 'anima' | 'hero';

type Circle = 'vault' | 'family' | 'work' | 'outer';

interface ArchetypeContextValue {
  activeArchetype: Archetype;
  activeCircle: Circle;
  setActiveCircle: (circle: Circle) => void;
  enterShadow: () => void;
  exitShadow: () => void;
  enterHero: () => void;
  exitHero: () => void;
}

const ArchetypeContext = createContext<ArchetypeContextValue | undefined>(undefined);

export function useArchetype() {
  const context = useContext(ArchetypeContext);
  if (!context) {
    throw new Error('useArchetype must be used within ArchetypeProvider');
  }
  return context;
}

interface ArchetypeProviderProps {
  children: React.ReactNode;
}

export function ArchetypeProvider({ children }: ArchetypeProviderProps) {
  const [activeArchetype, setActiveArchetype] = useState<Archetype>('self');
  const [activeCircle, setActiveCircle] = useState<Circle>('vault');

  // Load archetype preference on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedArchetype = localStorage.getItem('sovereignUIArchetype');

    // Map saved archetype ID to initial active archetype
    const archetypeMap: Record<string, Archetype> = {
      stoic: 'self',
      jungian: 'persona',
      anima: 'anima',
      balanced: 'self',
    };

    if (savedArchetype && archetypeMap[savedArchetype]) {
      setActiveArchetype(archetypeMap[savedArchetype]);
    }
  }, []);

  // Map Circle to Archetype
  useEffect(() => {
    if (activeArchetype === 'shadow' || activeArchetype === 'hero') {
      // Shadow and Hero override Circle mapping
      return;
    }

    if (activeCircle === 'vault') {
      setActiveArchetype('self');
    } else if (activeCircle === 'family' || activeCircle === 'work') {
      setActiveArchetype('anima'); // Relational archetypes
    } else {
      setActiveArchetype('persona'); // Outer world = social mask
    }
  }, [activeCircle, activeArchetype]);

  const enterShadow = () => setActiveArchetype('shadow');
  const exitShadow = () => {
    // Return to Circle-based archetype
    if (activeCircle === 'vault') setActiveArchetype('self');
    else if (activeCircle === 'family' || activeCircle === 'work') setActiveArchetype('anima');
    else setActiveArchetype('persona');
  };

  const enterHero = () => setActiveArchetype('hero');
  const exitHero = () => setActiveArchetype('self');

  return (
    <ArchetypeContext.Provider
      value={{
        activeArchetype,
        activeCircle,
        setActiveCircle,
        enterShadow,
        exitShadow,
        enterHero,
        exitHero,
      }}
    >
      <div className={`archetype-${activeArchetype}`} data-archetype={activeArchetype}>
        {children}
      </div>
    </ArchetypeContext.Provider>
  );
}
