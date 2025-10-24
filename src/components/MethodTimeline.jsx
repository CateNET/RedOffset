import { useState } from 'react';
import { motion } from 'framer-motion';

const MethodTimeline = ({ steps, className = '' }) => {
  const [active, setActive] = useState(0);
  return (
    <div className={`relative overflow-hidden rounded border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">Methodology</p>
        <p className="font-mono text-[11px] text-zinc-500">Plan → Rehearse → Execute → Debrief → Improve</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[0.6fr_1.4fr]">
        <div className="flex flex-wrap items-end gap-4">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.24em] transition ${
                i === active ? 'text-ember' : 'text-zinc-400 hover:text-ember'
              }`}
            >
              {s.title}
              <span className={`absolute -bottom-[2px] left-0 h-[2px] bg-ember transition-all ${i === active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded border border-zinc-900 bg-night/70 p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Step Objective</p>
          <p className="mt-2 text-sm text-zinc-300">{steps[active].objective}</p>
          {steps[active].signals?.length ? (
            <div className="mt-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Expected Signals</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {steps[active].signals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default MethodTimeline;

