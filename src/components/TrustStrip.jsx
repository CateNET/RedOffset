import { ShieldCheckIcon, DocumentCheckIcon, LockClosedIcon, ScaleIcon } from '@heroicons/react/24/outline';

const items = [
  { icon: ShieldCheckIcon, title: 'OpSec First', body: 'Planned, rehearsed, and deconflicted operations.' },
  { icon: DocumentCheckIcon, title: 'Evidence Hygiene', body: 'Sanitized artifacts with chain-of-custody.' },
  { icon: LockClosedIcon, title: 'Governed Access', body: 'Strict RoE, safety controls, and aborts.' },
  { icon: ScaleIcon, title: 'Executive Clarity', body: 'Risk deltas, ownership, and timelines.' }
];

const TrustStrip = ({ className = '' }) => {
  return (
    <div className={`rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/60 to-night/60 p-4 ${className}`}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded border border-ember/30 bg-black/30">
              <it.icon className="h-4 w-4 text-ember" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-300">{it.title}</p>
              <p className="text-xs text-zinc-500">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrustStrip;

