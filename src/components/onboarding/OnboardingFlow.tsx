/**
 * OnboardingFlow — The Sacred Threshold
 *
 * "The first act of sovereignty must be to choose the mirror
 *  in which you will confront your own thoughts."
 *
 * Complete onboarding ritual:
 * 1. Wallet connection (if not connected)
 * 2. SIWE authentication (prove wallet ownership)
 * 3. Archetype selection (choose the UI garment)
 * 4. First Vault entry (the descent is complete)
 *
 * This orchestrates all liminal moments into one cohesive journey.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { HeroCall } from '@/components/archetypes';
import { ArchetypeChooser } from './ArchetypeChooser';
import { isAuthenticated } from '@/utils/siwe';

type OnboardingStep = 'hero-call' | 'archetype-choice' | 'complete';

interface OnboardingFlowProps {
  onComplete: (archetypeId: string) => void;
  onConnect: () => void;
  onSignIn: () => Promise<void>;
}

export function OnboardingFlow({ onComplete, onConnect, onSignIn }: OnboardingFlowProps) {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('hero-call');
  const [authenticated, setAuthenticated] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    if (address && isConnected) {
      setAuthenticated(isAuthenticated(address));
    }
  }, [address, isConnected]);

  // Skip to archetype choice if already authenticated
  useEffect(() => {
    if (authenticated && currentStep === 'hero-call') {
      setCurrentStep('archetype-choice');
    }
  }, [authenticated, currentStep]);

  const handleHeroBegin = async () => {
    // If not connected, prompt wallet connection
    if (!isConnected) {
      onConnect();
      return;
    }

    // If connected but not authenticated, trigger SIWE
    if (!authenticated) {
      try {
        await onSignIn();
        setAuthenticated(true);
        setCurrentStep('archetype-choice');
      } catch (error) {
        console.error('SIWE failed:', error);
      }
      return;
    }

    // Already authenticated, proceed to archetype choice
    setCurrentStep('archetype-choice');
  };

  const handleArchetypeChosen = (archetypeId: string) => {
    // Mark onboarding as complete
    localStorage.setItem('onboarding_complete', 'true');

    // Apply archetype globally
    if (typeof document !== 'undefined') {
      // Remove any existing archetype classes
      document.documentElement.classList.remove(
        'archetype-self',
        'archetype-shadow',
        'archetype-persona',
        'archetype-anima',
        'archetype-hero',
        'archetype-wise',
        'archetype-persona-weaver',
        'archetype-integrated'
      );

      // Apply chosen archetype (map archetype ID to CSS class)
      const archetypeClassMap = {
        stoic: 'archetype-self',
        jungian: 'archetype-persona',
        anima: 'archetype-anima',
        shadow: 'archetype-shadow',
        wise: 'archetype-wise',
        hero: 'archetype-hero',
        persona: 'archetype-persona-weaver',
        integrated: 'archetype-integrated',
      };

      const archetypeClass = archetypeClassMap[archetypeId as keyof typeof archetypeClassMap];
      if (archetypeClass) {
        document.documentElement.classList.add(archetypeClass);
      }
    }

    setCurrentStep('complete');

    // Notify parent with slight delay for visual completion
    setTimeout(() => {
      onComplete(archetypeId);
    }, 500);
  };

  // Step 1: Hero's Call (wallet connection + SIWE)
  if (currentStep === 'hero-call') {
    return (
      <HeroCall
        onBegin={handleHeroBegin}
        isConnected={isConnected}
        onConnect={onConnect}
      />
    );
  }

  // Step 2: Archetype Selection
  if (currentStep === 'archetype-choice') {
    return (
      <ArchetypeChooser onChosen={handleArchetypeChosen} />
    );
  }

  // Step 3: Complete (parent handles transition to main app)
  return null;
}

/**
 * Hook to check if user should see onboarding
 */
export function useOnboardingStatus() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onboardingComplete = localStorage.getItem('onboarding_complete');
    const hasArchetype = localStorage.getItem('sovereignUIArchetype');

    // Show onboarding if:
    // 1. Never completed onboarding, OR
    // 2. Wallet connected but no archetype chosen
    const shouldShow = !onboardingComplete || (isConnected && !hasArchetype);

    setShouldShowOnboarding(shouldShow);
  }, [isConnected, address]);

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setShouldShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_complete');
    localStorage.removeItem('sovereignUIArchetype');
    setShouldShowOnboarding(true);
  };

  return {
    shouldShowOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
}
