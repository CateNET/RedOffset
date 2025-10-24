import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const defaultMembers = [
  { name: 'A. Rivera', role: 'Ops Lead', focus: ['Physical', 'OpsSec'], bio: 'Leads physical and multi‑domain coordination. Emphasis on rehearsals, safety controls, and discreet execution.', creds: ['Facilities Assessments', 'Incident Response Partnering'] },
  { name: 'J. Malik', role: 'Adversary Simulation', focus: ['Cyber', 'Purple'], bio: 'Designs cyber behaviors mapped to ATT&CK at a tactic/technique name level. Partners with blue teams for tuning.', creds: ['ATT&CK Mapping', 'Detection Engineering'] },
  { name: 'K. Lin', role: 'Social Engineering', focus: ['Human', 'OSINT'], bio: 'Builds credible, policy‑aligned pretexts with clear escalation paths and review checkpoints.', creds: ['Awareness Training', 'Process Hardening'] },
  { name: 'D. Santos', role: 'Residential Ops', focus: ['Estate', 'IoT/Wi‑Fi'], bio: 'Coordinates estate risk reviews with EP leads. Practical, privacy‑respecting improvements and training.', creds: ['EP Coordination', 'Segmentation Reviews'] },
  { name: 'S. Patel', role: 'Reporting & Risk', focus: ['Executive', 'Metrics'], bio: 'Transforms operational findings into executive clarity with risk deltas, ownership, and timeline options.', creds: ['Board Reporting', 'Risk Modeling'] },
  { name: 'R. Okoye', role: 'Intelligence & QA', focus: ['Intel', 'QA'], bio: 'Keeps scenarios current and safe, maintaining QA checklists and post‑op validation.', creds: ['Threat Intel', 'QA & Evidence Handling'] }
];

const TeamGrid = ({ members = defaultMembers }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="relative">
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <button
            key={m.name + i}
            type="button"
            onClick={() => setOpen({ ...m, i })}
            className="group rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-5 text-left transition hover:shadow-[0_0_30px_rgba(220,38,38,0.12)] min-h-[170px]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-ember/30 bg-black/30">
                <span className="font-mono text-lg text-ember">{m.name.split(' ').map(s => s[0]).join('')}</span>
              </div>
              <div>
                <p className="font-mono text-sm text-zinc-100">{m.name}</p>
                <p className="text-xs text-zinc-400">{m.role}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.focus.map((f) => (
                <span key={f} className="rounded border border-zinc-800 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">{f}</span>
              ))}
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{m.bio}</p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="relative w-full max-w-lg rounded-xl border border-zinc-900 bg-night p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-ember/30 bg-black/30">
                  <span className="font-mono text-lg text-ember">{open.name.split(' ').map(s => s[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-mono text-base text-zinc-100">{open.name}</p>
                  <p className="text-xs text-zinc-400">{open.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-300">{open.bio}</p>
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Focus</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {open.focus.map((f) => (
                    <span key={f} className="rounded border border-zinc-800 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">{f}</span>
                  ))}
                </div>
              </div>
              {open.creds?.length ? (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Capabilities</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                    {open.creds.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={() => setOpen(null)} className="rounded border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:border-ember hover:text-ember">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamGrid;
