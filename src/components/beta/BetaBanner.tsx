/**
 * BetaBanner — The Threshold Announcement
 *
 * "The gates are open. The first citizens cross the threshold."
 *
 * Displayed at top of landing page during beta period.
 */

'use client';

import React from 'react';

export function BetaBanner() {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const isDismissed = localStorage.getItem('beta_banner_dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('beta_banner_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  // Only show during beta period (May-June 2026)
  const betaStartDate = new Date('2026-05-01');
  const betaEndDate = new Date('2026-06-30');
  const now = new Date();

  if (now < betaStartDate || now > betaEndDate) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-realm-indigo-900 via-realm-indigo-800 to-realm-indigo-900 border-b-2 border-realm-gold-500/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-3xl">🏛️</span>
            <div className="flex-1">
              <p className="font-serif text-lg text-realm-gold-500 mb-1">
                <strong>Beta is Live</strong> — The Citadel Opens Its Gates
              </p>
              <p className="text-sm text-realm-parchment-50/70">
                First citizens welcome. Limited invites. Sepolia/Base testnet contracts.{' '}
                <span className="text-realm-gold-400">Your feedback shapes the final realm.</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="btn-ghost text-sm shrink-0"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
