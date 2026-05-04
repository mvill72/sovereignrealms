'use client';

import { useState, useEffect } from 'react';
import {
  loadFederationState,
  saveFederationState,
  enableFederation,
  disableFederation,
  type FederationState,
} from '@/federation/fedify-instance';

export function FederationSettings() {
  const [state, setState] = useState<FederationState>({
    enabled: false,
    followers: [],
    following: [],
    instanceBlocks: [],
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setState(loadFederationState());
  }, []);

  const handleToggle = () => {
    if (state.enabled) {
      disableFederation();
      setState({ ...state, enabled: false });
    } else {
      enableFederation();
      setState({ ...state, enabled: true });
    }
  };

  const domain = typeof window !== 'undefined'
    ? window.location.host
    : 'localhost:3000';

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">🌐 Fediverse Federation</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-violet-400 hover:text-violet-300"
        >
          {showSettings ? 'Hide' : 'Settings'}
        </button>
      </div>

      {/* Federation Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-medium">Enable Federation</p>
          <p className="text-sm text-zinc-500">
            Share public posts with Mastodon, Pixelfed, etc.
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            state.enabled ? 'bg-violet-600' : 'bg-zinc-700'
          }`}
        >
          <div
            className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
              state.enabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {state.enabled && (
        <>
          {/* Your Fediverse Handle */}
          <div className="bg-zinc-950 p-4 rounded-lg mb-4">
            <p className="text-sm text-zinc-500 mb-1">Your Fediverse Handle:</p>
            <code className="text-violet-400 select-all">@user@{domain}</code>
            <p className="text-xs text-zinc-600 mt-2">
              Others can follow you from any Fediverse instance using this handle
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950 p-4 rounded-lg">
              <p className="text-2xl font-bold text-violet-400">
                {state.followers.length}
              </p>
              <p className="text-sm text-zinc-500">Followers</p>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">
                {state.following.length}
              </p>
              <p className="text-sm text-zinc-500">Following</p>
            </div>
          </div>

          {showSettings && (
            <div className="mt-6 space-y-4 pt-6 border-t border-zinc-800">
              {/* Followers List */}
              <div>
                <h4 className="font-medium mb-2">Followers</h4>
                {state.followers.length === 0 ? (
                  <p className="text-sm text-zinc-500">No followers yet</p>
                ) : (
                  <div className="space-y-2">
                    {state.followers.map((follower, i) => (
                      <div
                        key={i}
                        className="bg-zinc-950 p-3 rounded text-sm flex justify-between items-center"
                      >
                        <span className="text-zinc-400 truncate">{follower}</span>
                        <button className="text-xs text-red-500 hover:text-red-400">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Instance Blocks */}
              <div>
                <h4 className="font-medium mb-2">Blocked Instances</h4>
                {state.instanceBlocks.length === 0 ? (
                  <p className="text-sm text-zinc-500">No instances blocked</p>
                ) : (
                  <div className="space-y-2">
                    {state.instanceBlocks.map((domain, i) => (
                      <div
                        key={i}
                        className="bg-zinc-950 p-3 rounded text-sm flex justify-between items-center"
                      >
                        <span className="text-zinc-400">{domain}</span>
                        <button className="text-xs text-violet-400 hover:text-violet-300">
                          Unblock
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {!state.enabled && (
        <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-4 mt-4">
          <p className="text-sm text-amber-400">
            ⚠️ Federation is disabled. Your realm remains entirely private.
          </p>
        </div>
      )}
    </div>
  );
}
