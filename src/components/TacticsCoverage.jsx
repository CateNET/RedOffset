import { useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_TACTICS = [
  'Initial Access',
  'Execution',
  'Persistence',
  'Privilege Escalation',
  'Defense Evasion',
  'Credential Access',
  'Discovery',
  'Lateral Movement',
  'Collection',
  'Command & Control',
  'Exfiltration',
  'Impact'
];

const sampleState = {
  current: [40, 52, 35, 46, 38, 41, 60, 42, 33, 55, 36, 28],
  tuned: [68, 74, 63, 71, 66, 70, 82, 73, 61, 79, 69, 58]
};

const cellColor = (v) => {
  if (v >= 75) return 'bg-emerald-600/70';
  if (v >= 55) return 'bg-amber-500/70';
  return 'bg-ember/70';
};

const TacticsCoverage = ({ tactics = DEFAULT_TACTICS, data = sampleState, className = '' }) => {
  const [view, setView] = useState('current');
  const vals = data[view] || [];

  return (
    <div className={`relative overflow-hidden rounded border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">Detection Coverage</p>
        <div className="inline-flex rounded border border-zinc-800 p-1">
          {['current', 'tuned'].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setView(k)}
              className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] transition ${
                view === k ? 'bg-zinc-900 text-ember' : 'text-zinc-400 hover:text-ember'
              }`}
            >
              {k === 'current' ? 'Current' : 'Post‑Tuning'}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {tactics.map((t, i) => (
          <div key={t} className="rounded border border-zinc-800 bg-black/40 p-3">
            <div className="flex items-center justify-between">
              <p className="w-2/3 truncate pr-2 font-mono text-[11px] tracking-[0.18em] text-zinc-400">{t}</p>
              <motion.span
                key={`${view}-${i}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className={`rounded px-2 py-0.5 text-xs text-white ${cellColor(vals[i] || 0)}`}
              >
                {vals[i] || 0}%
              </motion.span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded bg-zinc-800">
              <motion.div
                key={`bar-${view}-${i}`}
                initial={{ width: '0%' }}
                animate={{ width: `${vals[i] || 0}%` }}
                transition={{ duration: 0.5 }}
                className={`h-1.5 rounded ${cellColor(vals[i] || 0)}`}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">Figures are illustrative; your report includes environment‑specific metrics.</p>
    </div>
  );
};

export default TacticsCoverage;

