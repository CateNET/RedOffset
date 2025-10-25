import { useEffect, useMemo, useState } from 'react';
import { PauseIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import HackerTerminal from './HackerTerminal.jsx';

// A full-width, sales-ready terminal console with embedded selling points and tags
// Props:
// - title: string (header)
// - lines: string[] (typed stream)
// - points: string[] (selling points)
// - tags: { mitre?: string[]; nist?: string[]; cis?: string[] }
// - playKey: number (restarts typing)
// - showSidebar: boolean (hide right panel)
const OpsConsole = ({ title = 'RO // OPS', lines = [], points = [], tags = {}, playKey = 0, sections, showSidebar = true }) => {
  const [playing, setPlaying] = useState(true);
  const header = useMemo(() => title, [title]);
  const [tab, setTab] = useState('Run');
  const [localKey, setLocalKey] = useState(playKey);

  const fallback = [
    '$ whoami',
    'operator',
    '$ hostnamectl --static',
    'ro-station',
    '$ uname -srmo',
    'Linux 6.6.15 x86_64 GNU/Linux',
    '',
    '$ echo "Select Run / Evidence / Signals / Notes below"',
  ];
  const current = Array.isArray(sections?.[tab]) ? (sections[tab] || []).filter((l) => typeof l === 'string') : lines;
  const displayLines = (Array.isArray(current) && current.length > 0) ? current : fallback;

  useEffect(() => {
    const handler = () => setLocalKey((k) => k + 1);
    window.addEventListener('ro-ops-console-replay', handler);
    return () => window.removeEventListener('ro-ops-console-replay', handler);
  }, []);

  useEffect(() => {
    setTab('Run');
    setLocalKey(playKey);
  }, [playKey]);

  return (
    <div className="relative rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">{header}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded bg-transparent p-1.5 text-zinc-400 transition hover:text-ember"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="rounded bg-transparent p-1.5 text-zinc-400 transition hover:text-ember"
            onClick={() => window.dispatchEvent(new CustomEvent('ro-ops-console-replay'))}
            aria-label="Replay"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: showSidebar ? '1.6fr 0.8fr' : '1fr' }}>
        <div>
          <HackerTerminal
            lines={displayLines}
            playKey={localKey}
            onComplete={() => { const order = ['Run', 'Evidence', 'Signals', 'Notes']; const idx = order.indexOf(tab); if (sections && idx > -1 && idx < order.length - 1) { setTimeout(() => { setTab(order[idx+1]); setLocalKey((k)=>k+1); }, 400); } }}
            title={header}
            size="tall"
            paused={!playing}
          />
          {sections && (
            <div className="mt-3 flex flex-wrap items-end gap-4">
              {Object.keys(sections).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setTab(name);
                    setLocalKey((k) => k + 1);
                  }}
                  className={`group relative px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.24em] transition ${tab === name ? 'text-ember' : 'text-zinc-400 hover:text-ember'}`}
                >
                  {name}
                  <span className={`absolute -bottom-[2px] left-0 h-[2px] bg-ember transition-all ${tab === name ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
              {tab === 'Evidence' && (
                <button
                  type="button"
                  className="rounded border border-zinc-800 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 hover:border-ember hover:text-ember"
                  onClick={async () => {
                    const text = (sections['Evidence'] || []).join('\n');
                    try { await navigator.clipboard.writeText(text); } catch {}
                  }}
                >Copy Tree</button>
              )}
            </div>
          )}
        </div>
        {showSidebar ? (
          <div className="flex flex-col gap-4">
            <div className="rounded border border-zinc-900 bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Why This Matters</p>
              <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember/70" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {(tags.mitre?.length || tags.nist?.length || tags.cis?.length) && (
              <div className="rounded border border-zinc-900 bg-black/30 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Compliance Mapping</p>
                <div className="mt-2 grid gap-3 sm:grid-cols-3">
                  {tags.mitre?.length ? (
                    <div>
                      <p className="font-mono text-[10px] text-zinc-500">MITRE ATT&CK</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {tags.mitre.map((t) => (
                          <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {tags.nist?.length ? (
                    <div>
                      <p className="font-mono text-[10px] text-zinc-500">NIST 800-53</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {tags.nist.map((t) => (
                          <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {tags.cis?.length ? (
                    <div>
                      <p className="font-mono text-[10px] text-zinc-500">CIS Controls</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {tags.cis.map((t) => (
                          <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <div className="flex items-center justify-end">
              <a href="/contact" className="inline-flex items-center gap-3 rounded border border-ember px-5 py-2.5 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember">Scope an Operation</a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OpsConsole;


