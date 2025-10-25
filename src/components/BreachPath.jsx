import { useEffect, useMemo, useRef, useState } from 'react';
import { PauseIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Pro breach path visualizer
// Props: { steps: { label: string, detail?: string, objective?: string, actions?: string[], signals?: string[], artifacts?: string[], tags?: { mitre?: string[], nist?: string[], cis?: string[] } }[], title?: string }
const BreachPath = ({ steps = [], title = 'Attack Path' }) => {
  const width = 820;
  const height = 320;
  const paddingX = 56;
  const usableW = width - paddingX * 2;
  const stepX = usableW / Math.max(1, steps.length - 1);
  const curveAmp = 60;

  const points = useMemo(() => {
    return steps.map((_, i) => {
      const x = paddingX + i * stepX;
      const y = height / 2 + Math.sin((i / Math.max(1, steps.length - 1)) * Math.PI) * curveAmp - 6;
      return { x, y };
    });
  }, [steps.length, stepX]);

  const curves = useMemo(() => {
    const list = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const midx = (a.x + b.x) / 2;
      const midy = (a.y + b.y) / 2 + (i % 2 === 0 ? -curveAmp * 0.6 : curveAmp * 0.6);
      const d = `M ${a.x} ${a.y} Q ${midx} ${midy} ${b.x} ${b.y}`;
      list.push({ a, b, c: { x: midx, y: midy }, d });
    }
    return list;
  }, [points]);

  const [active, setActive] = useState(0); // segment index
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!playing || curves.length === 0) return;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      const speed = 0.0008; // lower = slower
      const next = t + dt * speed;
      if (next >= 1) {
        if (active < curves.length - 1) {
          setActive((v) => v + 1);
          setT(0);
        } else {
          // loop
          setActive(0);
          setT(0);
        }
      } else {
        setT(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, active, curves.length, t]);

  const pos = useMemo(() => {
    if (curves.length === 0) return { x: 0, y: 0 };
    const { a, b, c } = curves[active];
    const x = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * c.x + t * t * b.x;
    const y = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * c.y + t * t * b.y;
    return { x, y };
  }, [curves, active, t]);

  return (
    <div className="group relative overflow-hidden rounded border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-4">
      <div className="pointer-events-none absolute inset-0 scanlines opacity-[0.04]" aria-hidden="true" />
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">{title}</p>
        <div className="hidden items-center gap-2 sm:flex">
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
            onClick={() => {
              setActive(0);
              setT(0);
              setPlaying(true);
            }}
            aria-label="Replay"
          >
            <ArrowPathIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          <defs>
            <linearGradient id="gp" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(220,38,38,0.08)" />
              <stop offset="50%" stopColor="rgba(220,38,38,0.9)" />
              <stop offset="100%" stopColor="rgba(220,38,38,0.08)" />
            </linearGradient>
          </defs>
          {/* grid */}
          <g opacity="0.25">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={(i + 1) * (width / 14)} y1="0" x2={(i + 1) * (width / 14)} y2={height} stroke="#18181b" strokeWidth="1" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i + 1) * (height / 8)} x2={width} y2={(i + 1) * (height / 8)} stroke="#18181b" strokeWidth="1" />
            ))}
          </g>

          {/* edges */}
          {curves.map((seg, idx) => (
            <motion.path
              key={`e${idx}`}
              d={seg.d}
              stroke="url(#gp)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: idx * 0.12, ease: 'easeInOut' }}
              opacity={idx <= active ? 1 : 0.65}
            />
          ))}

          {/* nodes */}
          {points.map((p, i) => (
            <g key={`n${i}`} onMouseEnter={() => setActive(Math.min(i, curves.length - 1))}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="8"
                fill="#0f0f0f"
                stroke="#dc2626"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 200, damping: 18 }}
              >
                <title>{steps[i]?.label}{steps[i]?.objective ? ` — ${steps[i].objective}` : ''}</title>
              </motion.circle>
              <text x={p.x} y={p.y - 18} textAnchor="middle" className="fill-zinc-400" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
                {steps[i]?.label ?? `Step ${i + 1}`}
              </text>
            </g>
          ))}

          {/* tracer */}
          {curves.length > 0 && (
            <g>
              <circle cx={pos.x} cy={pos.y} r="5" fill="#dc2626" />
              <circle cx={pos.x} cy={pos.y} r="13" fill="rgba(220,38,38,0.12)" />
            </g>
          )}
        </svg>
      </div>

      {/* Operational context panel */}
      {steps[active] && (
        <div className="mt-3 rounded border border-zinc-900 bg-night/70 p-4 text-sm text-zinc-300">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Operational Context</p>
            <span className="font-mono text-[11px] text-ember">{steps[active].label}</span>
          </div>
          {steps[active].objective && (
            <div className="mb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Objective</p>
              <p className="mt-1 text-[13px]">{steps[active].objective}</p>
            </div>
          )}
          {Array.isArray(steps[active].actions) && steps[active].actions.length > 0 && (
            <div className="mb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Actions</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px]">
                {steps[active].actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(steps[active].signals) && steps[active].signals.length > 0 && (
            <div className="mb-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Signals</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px]">
                {steps[active].signals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(steps[active].artifacts) && steps[active].artifacts.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Artifacts</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px]">
                {steps[active].artifacts.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {steps[active].tags && (
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {steps[active].tags.mitre?.length ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">MITRE ATT&CK</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {steps[active].tags.mitre.map((t) => (
                      <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              {steps[active].tags.nist?.length ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">NIST 800-53</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {steps[active].tags.nist.map((t) => (
                      <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              {steps[active].tags.cis?.length ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">CIS Controls</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {steps[active].tags.cis.map((t) => (
                      <span key={t} className="rounded border border-zinc-800 bg-black/30 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {steps[active].detail && !steps[active].objective && (
            <p className="text-[13px]">{steps[active].detail}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BreachPath;
