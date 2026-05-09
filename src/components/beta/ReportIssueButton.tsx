/**
 * ReportIssueButton — The Feedback Threshold
 *
 * "Every bug report is a reflection on sovereignty."
 *
 * Quick feedback button in app header during beta.
 */

'use client';

import React, { useState } from 'react';

export function ReportIssueButton() {
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState({
    type: 'bug' as 'bug' | 'ux' | 'suggestion',
    description: '',
    context: '',
  });

  // Only show during beta period
  const betaStartDate = new Date('2026-05-01');
  const betaEndDate = new Date('2026-06-30');
  const now = new Date();

  if (now < betaStartDate || now > betaEndDate) {
    return null;
  }

  const handleSubmit = () => {
    const issueReport = {
      ...issue,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Save locally
    const allIssues = JSON.parse(localStorage.getItem('beta_issues') || '[]');
    allIssues.push(issueReport);
    localStorage.setItem('beta_issues', JSON.stringify(allIssues));

    // Reset and close
    setIssue({ type: 'bug', description: '', context: '' });
    setShowModal(false);

    // Show success message
    alert('Issue saved locally. Export from Settings to share with team.');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-ghost text-xs flex items-center gap-1"
        title="Report Issue (Beta)"
      >
        <span>🐛</span>
        <span className="hidden sm:inline">Report Issue</span>
      </button>

      {showModal && (
        <div className="modal-overlay flex items-center justify-center">
          <div className="modal-content max-w-xl border-l-4 border-l-realm-gold-500">
            <div className="relative">
              <h2 className="font-serif text-2xl mb-4 text-realm-gold-500 flex items-center gap-3">
                <span className="text-3xl">🐛</span>
                Report Issue
              </h2>

              <p className="text-sm text-realm-parchment-50/70 mb-6">
                Your feedback helps shape the citadel. Issue is saved locally — export from Settings to share.
              </p>

              {/* Issue Type */}
              <div className="mb-4">
                <label className="block text-sm font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                  Issue Type
                </label>
                <select
                  value={issue.type}
                  onChange={(e) => setIssue({ ...issue, type: e.target.value as any })}
                  className="input"
                >
                  <option value="bug">🐛 Bug / Error</option>
                  <option value="ux">🎨 UX / Confusion</option>
                  <option value="suggestion">💡 Suggestion</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                  Description *
                </label>
                <textarea
                  value={issue.description}
                  onChange={(e) => setIssue({ ...issue, description: e.target.value })}
                  placeholder="What happened? What did you expect?"
                  className="textarea"
                  rows={4}
                />
              </div>

              {/* Context */}
              <div className="mb-6">
                <label className="block text-sm font-mono text-realm-gold-500 mb-2 uppercase tracking-wide">
                  Context (Optional)
                </label>
                <textarea
                  value={issue.context}
                  onChange={(e) => setIssue({ ...issue, context: e.target.value })}
                  placeholder="What were you doing when this occurred? Any additional details?"
                  className="textarea"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!issue.description.trim()}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Issue Locally
                </button>
              </div>

              <p className="text-xs text-realm-parchment-50/40 text-center mt-4">
                Saved locally only. Export from Settings → Beta Feedback to share with team.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
