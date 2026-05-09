/**
 * SovereignRealm Design System Examples
 *
 * This file demonstrates the living archetypes of the design mandala.
 * Use these components as references when building new features.
 *
 * "The soul is dyed by the colour of its thoughts — and the realm by the colour of its interface."
 * — Marcus Aurelius, Meditations, now rendered in React components
 */

import React from 'react';

// ========================================
// Buttons — The Sovereign Actions
// ========================================

export function ButtonExamples() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl mb-4">Buttons</h3>

      {/* Primary — Sovereign Actions */}
      <button className="btn-primary">
        Enter the Vault
      </button>

      {/* Secondary — Alternative Actions */}
      <button className="btn-secondary">
        View in Vault
      </button>

      {/* Destructive — Irreversible Actions */}
      <button className="btn-destructive">
        Burn CircleKey
      </button>
    </div>
  );
}

// ========================================
// Cards — The Sacred Containers
// ========================================

export function CardExamples() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl mb-4">Cards</h3>

      {/* Basic Vault Card */}
      <div className="vault-card">
        <h4 className="text-xl mb-2">Vault Card</h4>
        <p className="text-realm-parchment-50/80">
          The base container for all sacred content in the realm.
        </p>
      </div>

      {/* Vault Only Post */}
      <div className="post-card vault-only">
        <div className="flex justify-between items-start mb-4">
          <span className="circle-sigil vault-only">
            🔒 Vault Only
          </span>
          <span className="text-xs text-realm-indigo-500 font-mono">
            CID: QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnw...
          </span>
        </div>
        <p className="font-serif text-lg leading-relaxed">
          Your private thought, never to leave the browser. The daily *Meditations* — examined, refined, and kept in the inner sanctum.
        </p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-realm-indigo-700">
          <span className="text-sm text-realm-indigo-500">2 minutes ago</span>
          <button className="text-sm text-realm-crimson-600 hover:text-red-400 transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* Family Post */}
      <div className="post-card family">
        <div className="flex justify-between items-start mb-4">
          <span className="circle-sigil family">
            👨‍👩‍👧 Family Realm
          </span>
          <span className="text-xs text-emerald-500/60 font-mono">
            CID: QmX8Zh3KqpoXYLPGo1XchXkwFnPqwQUSa81pxmz...
          </span>
        </div>
        <p className="font-serif text-lg leading-relaxed">
          Shared with those who hold the trust. The intimate circle where vulnerability is safe.
        </p>
      </div>

      {/* Work Post */}
      <div className="post-card work">
        <div className="flex justify-between items-start mb-4">
          <span className="circle-sigil work">
            💼 Work Collegium
          </span>
          <span className="text-xs text-blue-500/60 font-mono">
            CID: QmZ9Xi5UrvpYMLPHp3YdiYlBvGqRrXVTb93qynx...
          </span>
        </div>
        <p className="font-serif text-lg leading-relaxed">
          The professional persona, consciously worn. Gated by CircleKeys or simple consent.
        </p>
      </div>

      {/* Outer World Post */}
      <div className="post-card outer">
        <div className="flex justify-between items-start mb-4">
          <span className="circle-sigil outer">
            🌐 Outer World
          </span>
          <span className="text-xs text-purple-500/60 font-mono">
            CID: QmA7Bk6WsuqZNMQIq4ZfkZmCvHsSxVUc94rxoz...
          </span>
        </div>
        <p className="font-serif text-lg leading-relaxed">
          The public projection. The individuated Self ready for the agora. Federated to the Fediverse.
        </p>
      </div>
    </div>
  );
}

// ========================================
// Inputs — The Entry Points
// ========================================

export function InputExamples() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl mb-4">Inputs</h3>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          ENS Name or Wallet Address
        </label>
        <input
          type="text"
          className="input"
          placeholder="vitalik.eth or 0x..."
        />
      </div>

      {/* Textarea — Post Composer */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Your Thought
        </label>
        <textarea
          className="textarea"
          placeholder="What have you learned today? The Vault listens..."
          rows={6}
        />
        <p className="text-xs text-realm-indigo-500 mt-2">
          This thought will be encrypted with Web Crypto API and stored only in your browser.
        </p>
      </div>

      {/* Select — Circle Chooser */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Share With
        </label>
        <select className="input">
          <option value="vault">🔒 Vault Only (Private)</option>
          <option value="family">👨‍👩‍👧 Family Realm</option>
          <option value="work">💼 Work Collegium</option>
          <option value="outer">🌐 Outer World (Public)</option>
        </select>
      </div>
    </div>
  );
}

// ========================================
// Navigation — The Citadel's Compass
// ========================================

export function NavigationExample() {
  return (
    <nav className="nav">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-serif text-realm-gold-500">
            SovereignRealm
          </h1>

          {/* Nav Links */}
          <div className="flex gap-2">
            <a href="#vault" className="nav-link active">
              Vault
            </a>
            <a href="#family" className="nav-link">
              Family
            </a>
            <a href="#work" className="nav-link">
              Work
            </a>
            <a href="#outer" className="nav-link">
              Outer
            </a>
          </div>

          {/* Wallet */}
          <button className="btn-primary text-sm px-4 py-2">
            0x742d...bEb0
          </button>
        </div>
      </div>
    </nav>
  );
}

// ========================================
// Modal — The Sacred Dialogue
// ========================================

export function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button className="btn-secondary" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="modal-content pointer-events-auto">
              <h2 className="text-2xl mb-4">Connect Wallet</h2>
              <p className="text-realm-parchment-50/80 mb-6">
                Sign in with Ethereum to enter your sovereign realm. Your data never leaves your browser.
              </p>
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  MetaMask
                </button>
                <button className="btn-secondary w-full">
                  WalletConnect
                </button>
              </div>
              <button
                className="mt-4 text-sm text-realm-indigo-500 hover:text-realm-indigo-400"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ========================================
// Circle Sigils — The Four Gates
// ========================================

export function CircleSigilExamples() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl mb-4">Circle Sigils</h3>

      <div className="flex flex-wrap gap-3">
        <span className="circle-sigil vault-only">
          🔒 Vault Only
        </span>
        <span className="circle-sigil family">
          👨‍👩‍👧 Family Realm
        </span>
        <span className="circle-sigil work">
          💼 Work Collegium
        </span>
        <span className="circle-sigil outer">
          🌐 Outer World
        </span>
      </div>
    </div>
  );
}

// ========================================
// Typography — The Sacred Scripts
// ========================================

export function TypographyExamples() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl mb-4">Typography</h3>

      {/* Headings */}
      <div className="space-y-4">
        <h1>Heading 1 — The Manifesto Title</h1>
        <h2>Heading 2 — The Section Header</h2>
        <h3>Heading 3 — The Subsection</h3>
        <h4>Heading 4 — The Card Title</h4>
      </div>

      {/* Body Text */}
      <div className="space-y-4">
        <p className="font-serif text-lg leading-relaxed">
          This is body text in Instrument Serif. Used for post content, the scroll of Aurelius.
          It invites reflection, deliberate reading, conscious thought.
        </p>
        <p className="text-base">
          This is UI text in Inter. Clear, modern, functional. Used for labels, navigation, metadata.
        </p>
        <code className="font-mono text-sm bg-realm-indigo-900 px-2 py-1 rounded">
          QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnwpfs9X
        </code>
      </div>

      {/* Text Utilities */}
      <div className="space-y-4">
        <p className="text-gradient-gold text-2xl font-serif">
          Gold Gradient Text (for special emphasis)
        </p>
        <p className="glow-gold text-realm-gold-500 text-2xl">
          Text with Gold Glow
        </p>
      </div>
    </div>
  );
}

// ========================================
// Complete Example Page
// ========================================

export function CompleteExample() {
  return (
    <div className="min-h-screen bg-realm-indigo-950">
      <NavigationExample />

      <div className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-3xl mb-6 text-realm-gold-500">
            Design System Examples
          </h2>
          <p className="text-realm-parchment-50/80 max-w-2xl mb-8">
            The living archetypes of the SovereignRealm visual mandala. Each component embodies the philosophy: minimal, sacred, Stoic.
          </p>
        </section>

        <CircleSigilExamples />
        <ButtonExamples />
        <InputExamples />
        <CardExamples />
        <TypographyExamples />
        <ModalExample />
      </div>
    </div>
  );
}

export default CompleteExample;
