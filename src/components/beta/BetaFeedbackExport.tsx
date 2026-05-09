/**
 * BetaFeedbackExport — The Sovereign Export
 *
 * "All feedback lives in your Vault first. Share only when ready."
 *
 * Export all beta feedback, issues, and reflections as JSON.
 */

'use client';

import React from 'react';

export function BetaFeedbackExport() {
  const [stats, setStats] = React.useState({
    feedbackCount: 0,
    issueCount: 0,
    lastFeedback: null as string | null,
    lastIssue: null as string | null,
  });

  React.useEffect(() => {
    const feedback = JSON.parse(localStorage.getItem('beta_feedback') || '[]');
    const issues = JSON.parse(localStorage.getItem('beta_issues') || '[]');
    const lastFeedback = localStorage.getItem('beta_feedback_last');
    const lastIssue = issues.length > 0 ? issues[issues.length - 1].timestamp : null;

    setStats({
      feedbackCount: feedback.length,
      issueCount: issues.length,
      lastFeedback,
      lastIssue,
    });
  }, []);

  const handleExport = () => {
    const feedback = JSON.parse(localStorage.getItem('beta_feedback') || '[]');
    const issues = JSON.parse(localStorage.getItem('beta_issues') || '[]');
    const profile = JSON.parse(localStorage.getItem('sovereign_profile') || '{}');

    const exportData = {
      betaFeedback: {
        weeklyReflections: feedback,
        issueReports: issues,
        exportedAt: new Date().toISOString(),
      },
      userContext: {
        walletAddress: profile.walletAddress || 'anonymous',
        archetype: localStorage.getItem('sovereignUIArchetype') || 'unknown',
        onboardingComplete: localStorage.getItem('onboarding_complete') || 'false',
      },
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sovereignrealm-beta-feedback-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (!confirm('Clear all beta feedback and issues? This cannot be undone.')) {
      return;
    }

    localStorage.removeItem('beta_feedback');
    localStorage.removeItem('beta_issues');
    localStorage.removeItem('beta_feedback_last');
    localStorage.removeItem('beta_feedback_reminder');

    setStats({
      feedbackCount: 0,
      issueCount: 0,
      lastFeedback: null,
      lastIssue: null,
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="vault-card border-2 border-realm-gold-500/30">
      <h3 className="text-sm font-mono text-realm-gold-500 mb-4 uppercase tracking-wide flex items-center gap-2">
        <span>📜</span> Beta Feedback Export
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-realm-indigo-800/50 rounded-realm">
          <div className="text-2xl font-serif text-realm-gold-500">
            {stats.feedbackCount}
          </div>
          <div className="text-xs text-realm-parchment-50/60 mt-1">Weekly Reflections</div>
          <div className="text-xs text-realm-parchment-50/40 mt-1">
            Last: {formatDate(stats.lastFeedback)}
          </div>
        </div>

        <div className="text-center p-4 bg-realm-indigo-800/50 rounded-realm">
          <div className="text-2xl font-serif text-realm-gold-500">
            {stats.issueCount}
          </div>
          <div className="text-xs text-realm-parchment-50/60 mt-1">Issue Reports</div>
          <div className="text-xs text-realm-parchment-50/40 mt-1">
            Last: {formatDate(stats.lastIssue)}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-realm-indigo-800/30 p-4 rounded-realm mb-4 border border-realm-gold-500/20">
        <p className="text-xs text-realm-parchment-50/70 mb-2">
          All feedback is saved locally in your Vault. Export as JSON to share with the team
          via Discord, email, or GitHub.
        </p>
        <p className="text-xs italic text-realm-parchment-50/50">
          Your wallet address and archetype are included (optional anonymization in Discord).
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          disabled={stats.feedbackCount === 0 && stats.issueCount === 0}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📦 Export Feedback JSON
        </button>
        <button
          onClick={handleClear}
          disabled={stats.feedbackCount === 0 && stats.issueCount === 0}
          className="btn-destructive disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🗑️ Clear All
        </button>
      </div>

      {stats.feedbackCount === 0 && stats.issueCount === 0 && (
        <p className="text-xs text-realm-parchment-50/40 text-center mt-4 italic">
          No feedback yet. Complete a Weekly Reflection or Report an Issue to get started.
        </p>
      )}
    </div>
  );
}
