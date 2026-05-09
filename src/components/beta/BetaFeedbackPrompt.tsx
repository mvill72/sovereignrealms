/**
 * BetaFeedbackPrompt — The Weekly Reflection Ritual
 *
 * "Beta testers are not QA engineers. They are the first citizens
 *  whose reflections shape the final citadel."
 *
 * Appears every 7 days during beta period.
 * Frames feedback as conscious reflection, not complaints.
 */

'use client';

import React, { useState, useEffect } from 'react';

interface BetaFeedbackPromptProps {
  onComplete: (feedback: BetaFeedback) => void;
  onDismiss: () => void;
}

export interface BetaFeedback {
  sovereigntyExperience: string;
  archetypeResonance: string;
  shadowWork: string;
  technicalIssues: string;
  suggestions: string;
  submittedAt: string;
}

export function BetaFeedbackPrompt({ onComplete, onDismiss }: BetaFeedbackPromptProps) {
  const [step, setStep] = useState<'intro' | 'questions' | 'complete'>('intro');
  const [feedback, setFeedback] = useState<Partial<BetaFeedback>>({});

  const questions = [
    {
      key: 'sovereigntyExperience' as const,
      label: 'Sovereignty',
      prompt: 'How has the Vault served your sovereignty this week?',
      placeholder: 'Has the local-first Vault helped you feel more sovereign over your thoughts? How?',
    },
    {
      key: 'archetypeResonance' as const,
      label: 'Archetype',
      prompt: 'Which archetype garment resonates most deeply?',
      placeholder: 'Are you still wearing your chosen archetype? Did you switch? What drew you to it?',
    },
    {
      key: 'shadowWork' as const,
      label: 'Shadow',
      prompt: 'What shadows have you confronted?',
      placeholder: 'Have you used the Shadow Journal or Burn Ritual? How did it feel?',
    },
    {
      key: 'technicalIssues' as const,
      label: 'Technical',
      prompt: 'What technical barriers did you encounter?',
      placeholder: 'Bugs, errors, confusing UI, performance issues... (Optional)',
    },
    {
      key: 'suggestions' as const,
      label: 'Vision',
      prompt: 'How would you deepen the realm?',
      placeholder: 'What features, rituals, or patterns would make SovereignRealm more sovereign? (Optional)',
    },
  ];

  const handleSubmit = () => {
    const completeFeedback: BetaFeedback = {
      sovereigntyExperience: feedback.sovereigntyExperience || '',
      archetypeResonance: feedback.archetypeResonance || '',
      shadowWork: feedback.shadowWork || '',
      technicalIssues: feedback.technicalIssues || '',
      suggestions: feedback.suggestions || '',
      submittedAt: new Date().toISOString(),
    };

    // Save locally
    const allFeedback = JSON.parse(localStorage.getItem('beta_feedback') || '[]');
    allFeedback.push(completeFeedback);
    localStorage.setItem('beta_feedback', JSON.stringify(allFeedback));

    // Mark last feedback date
    localStorage.setItem('beta_feedback_last', new Date().toISOString());

    setStep('complete');
    setTimeout(() => onComplete(completeFeedback), 2000);
  };

  const canSubmit = feedback.sovereigntyExperience && feedback.archetypeResonance && feedback.shadowWork;

  // Intro step
  if (step === 'intro') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-2xl border-l-4 border-l-realm-gold-500">
          <div className="relative">
            <h2 className="font-serif text-3xl mb-4 text-realm-gold-500 flex items-center gap-3">
              <span className="text-4xl">📜</span>
              Weekly Reflection — Beta Citizen
            </h2>

            <p className="font-serif text-lg mb-6 text-realm-parchment-50/90">
              "You are not a tester. You are a first citizen whose reflections shape the final citadel."
            </p>

            <div className="bg-realm-indigo-800/50 p-6 rounded-realm mb-6 border border-realm-gold-500/20">
              <p className="text-sm text-realm-parchment-50/80 mb-4">
                Every 7 days, the realm invites you to reflect on your journey. This is not a bug report —
                it is a conscious examination of how sovereignty feels in practice.
              </p>

              <p className="text-sm text-realm-parchment-50/80 mb-4">
                Your feedback is saved locally and optionally exported. No data leaves your Vault unless
                you consciously choose to share it.
              </p>

              <p className="text-xs italic text-realm-parchment-50/60">
                The first three questions are required. Technical issues and suggestions are optional.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onDismiss}
                className="btn-secondary flex-1"
              >
                Dismiss (Remind Me Tomorrow)
              </button>
              <button
                onClick={() => setStep('questions')}
                className="btn-primary flex-1"
              >
                Begin Weekly Reflection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions step
  if (step === 'questions') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-4xl max-h-[90vh] overflow-y-auto border-l-4 border-l-realm-gold-500">
          <div className="relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-2xl text-realm-gold-500 mb-1">
                  Weekly Reflection Ritual
                </h2>
                <p className="text-xs text-realm-parchment-50/60">
                  Take your time. This is reflection, not a form.
                </p>
              </div>
              <button
                onClick={onDismiss}
                className="btn-ghost text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-6">
              {questions.map((q, idx) => (
                <div key={q.key} className="vault-card border-l-2 border-l-realm-gold-500/30">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl mt-1">
                      {idx === 0 ? '🏛️' : idx === 1 ? '🜁' : idx === 2 ? '⟐' : idx === 3 ? '⚙️' : '💡'}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-mono text-realm-gold-500 uppercase tracking-wide mb-2">
                        {q.label} {idx < 3 && <span className="text-realm-crimson-600">*</span>}
                      </h3>
                      <p className="font-serif text-base mb-3 text-realm-parchment-50/90">
                        {q.prompt}
                      </p>
                      <textarea
                        value={feedback[q.key] || ''}
                        onChange={(e) => setFeedback({ ...feedback, [q.key]: e.target.value })}
                        placeholder={q.placeholder}
                        className="textarea"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4 border-t border-realm-indigo-700">
              <button
                onClick={() => setStep('intro')}
                className="btn-secondary flex-1"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {canSubmit ? '📜 Submit Reflection' : 'Complete Required Fields First'}
              </button>
            </div>

            <p className="text-xs text-realm-parchment-50/40 text-center mt-4">
              * Required fields. Your feedback is saved locally and never uploaded without your consent.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Complete step
  if (step === 'complete') {
    return (
      <div className="modal-overlay flex items-center justify-center">
        <div className="modal-content max-w-md border-l-4 border-l-realm-gold-500">
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">✅</span>
            <h2 className="font-serif text-2xl text-realm-gold-500 mb-3">
              Reflection Received
            </h2>
            <p className="text-sm text-realm-parchment-50/70">
              Your feedback has been saved locally. Thank you for shaping the citadel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Hook to manage beta feedback prompts
 */
export function useBetaFeedback() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only during beta period (May-June 2026)
    const betaStartDate = new Date('2026-05-01');
    const betaEndDate = new Date('2026-06-30');
    const now = new Date();

    if (now < betaStartDate || now > betaEndDate) {
      setShouldShow(false);
      return;
    }

    // Check last feedback date
    const lastFeedback = localStorage.getItem('beta_feedback_last');
    if (!lastFeedback) {
      // First time - show after 7 days of first use
      const firstUse = localStorage.getItem('onboarding_complete');
      if (firstUse) {
        const daysSinceFirstUse = (now.getTime() - new Date(firstUse).getTime()) / (1000 * 60 * 60 * 24);
        setShouldShow(daysSinceFirstUse >= 7);
      }
      return;
    }

    // Check if 7 days since last feedback
    const daysSinceLastFeedback = (now.getTime() - new Date(lastFeedback).getTime()) / (1000 * 60 * 60 * 24);
    setShouldShow(daysSinceLastFeedback >= 7);
  }, []);

  const dismiss = () => {
    // Set reminder for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('beta_feedback_reminder', tomorrow.toISOString());
    setShouldShow(false);
  };

  const complete = () => {
    setShouldShow(false);
  };

  return {
    shouldShow,
    dismiss,
    complete,
  };
}
