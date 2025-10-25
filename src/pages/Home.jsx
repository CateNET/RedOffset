import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon, UserGroupIcon, SignalIcon } from '@heroicons/react/24/outline';
import TypewriterCycle from '../components/TypewriterCycle.jsx';
import MatrixRain from '../components/MatrixRain.jsx';
import OpsConsole from '../components/OpsConsole.jsx';
import usePageMetadata from '../hooks/usePageMetadata.js';

const heroPhrases = ['Credential Harvesting', 'Physical Intrusion', 'Executive Targeting', 'Social Engineering'];

const scenarioSteps = {
  cyber: [
    {
      label: 'External',
      objective: 'Obtain foothold via realistic user path.',
      actions: ['Targeted spear-phish (vendor theme)', 'Attachment fingerprinted for safety'],
      signals: ['Mail gateway rule hits', 'User click + macro event'],
      artifacts: ['Delivered lure email + headers', 'Macro hash baseline'],
      tags: { mitre: ['TA0001 Initial Access'], nist: ['CA-8', 'IR-4'], cis: ['CIS 14'] }
    },
    {
      label: 'User',
      objective: 'Execute payload and establish C2.',
      actions: ['Staged payload in user context', 'Beacon over egress-safe front'],
      signals: ['EDR process tree anomaly', 'Outbound TLS to unusual SNI'],
      artifacts: ['Beacon cfg (redacted)', 'Process tree capture'],
      tags: { mitre: ['TA0011 Command & Control'], nist: ['SI-4'], cis: ['CIS 8', 'CIS 13'] }
    },
    {
      label: 'Workstation',
      objective: 'Harvest credentials for lateral movement.',
      actions: ['Dump LSASS (protected handle bypass)', 'Parse creds/tokens for reuse'],
      signals: ['Memory access alert', 'Suspicious handle opens'],
      artifacts: ['Sanitized cred cache', 'Technique-to-signal mapping'],
      tags: { mitre: ['TA0006 Credential Access'], nist: ['SI-4'], cis: ['CIS 8'] }
    }
  ],
  physical: [
    { label: 'Street', objective: 'Identify entry windows.', actions: ['Camera coverage mapping'], signals: ['Patrol patterns observed'], artifacts: ['Perimeter map'], tags: { mitre: ['Discovery (physical)'], nist: ['PE-6'] } },
    { label: 'Lobby', objective: 'Bypass lobby control.', actions: ['Clone badge / tailgate'], signals: ['Access logs show duplicate UID'], artifacts: ['Badge UID snapshot'], tags: { nist: ['PE-3'] } },
  ],
  social: [
    { label: 'OSINT', objective: 'Build credible pretext.', actions: ['LinkedIn role mapping', 'Vendor schedules'], signals: ['N/A'], artifacts: ['OSINT summary'], tags: { nist: ['RA-3'] } },
    { label: 'Helpdesk', objective: 'Obtain temporary MFA bypass.', actions: ['Vishing call with ticket reference'], signals: ['Helpdesk ticket + call recording'], artifacts: ['Call script + result'], tags: { mitre: ['Initial Access'] } },
  ],
  residential: [
    { label: 'Perimeter', objective: 'Understand estate rhythms.', actions: ['Night route mapping'], signals: ['Guard log timestamps'], artifacts: ['Perimeter diagram'], tags: { nist: ['PE-6'] } },
    { label: 'Panel', objective: 'Assess alarm system config.', actions: ['Identify model / version'], signals: ['Panel audit logs'], artifacts: ['Panel notes'], tags: { nist: ['PE-3'] } },
  ],
};

const scenarioLabels = [
  { key: 'cyber', label: 'Cyber' },
  { key: 'physical', label: 'Physical' },
  { key: 'social', label: 'Social' },
  { key: 'residential', label: 'Residential' },
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Operator Discipline',
    description: 'Planned, rehearsed, and legally reviewed operations with strict OpSec and safety controls.',
    badges: ['RoE', 'OpSec'],
    points: ['Brief-backs and range rehearsals', 'Chain-of-custody for evidence']
  },
  {
    icon: SignalIcon,
    title: 'Intelligence-Led Tradecraft',
    description: 'Scenarios align to current adversary behaviors with ATT&CK / NIST / CIS mapping.',
    badges: ['MITRE', 'NIST', 'CIS'],
    points: ['Technique-to-signal mapping', 'Purple-team tuning during ops']
  },
  {
    icon: UserGroupIcon,
    title: 'Executive Alignment',
    description: 'Findings tie to business impact with prioritized backlogs, owners, and measurable risk deltas.',
    badges: ['Board-Ready', 'KPI'],
    points: ['Risk narrative with MTTD/MTTC', 'Actionable roadmap with effort']
  }
];

const capabilityPillars = [
  { title: 'Physical Intrusion & Recon', description: 'Route planning, smart-lock bypass, surveillance evasion, and exfiltration drills validate your critical facility controls.' },
  { title: 'Social Engineering Operations', description: 'Spear phishing, vishing, impersonation, and insider bait campaigns measure human-layer resilience and response posture.' },
  { title: 'Cyber Adversary Simulation', description: 'Initial access, credential theft, lateral movement, and covert C2 chains aligned to active TTPs.' },
  { title: 'Residential Red Teaming', description: 'Estate recon, alarm bypass, Wi‑Fi intrusion, and lifestyle analysis to safeguard executives and families.' },
];

// Detection coverage data (simple, scenario-aware)
const coverageDomains = ['Email','Endpoint','Identity','Network','Cloud','Physical'];
const coverageScores = {
  cyber:      { Email: 3, Endpoint: 4, Identity: 3, Network: 3, Cloud: 2, Physical: 1 },
  physical:   { Email: 1, Endpoint: 2, Identity: 3, Network: 2, Cloud: 1, Physical: 4 },
  social:     { Email: 3, Endpoint: 2, Identity: 3, Network: 1, Cloud: 1, Physical: 2 },
  residential:{ Email: 1, Endpoint: 2, Identity: 2, Network: 3, Cloud: 2, Physical: 3 },
};
function scoreToClass(n){
  // 0..4 heat scale
  return n >= 4 ? 'bg-emerald-500/80' : n === 3 ? 'bg-ember/80' : n === 2 ? 'bg-amber-500/80' : n === 1 ? 'bg-zinc-600/80' : 'bg-zinc-800/80';
}


const Home = () => {
  const [scenario, setScenario] = useState('cyber');
  const [consoleKey, setConsoleKey] = useState(0);

  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [0, 1], [6, -6]);
  const rotY = useTransform(mx, [0, 1], [-6, 6]);

  usePageMetadata({
    title: 'Adversary Simulation',
    description: 'RedOffset executes converged red team operations—physical, social, and cyber—to expose real-world gaps before adversaries do.'
  });

  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section
        ref={containerRef}
        className="relative flex min-h-[calc(100vh-88px)] items-center justify-center"
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          mx.set(x);
          my.set(y);
        }}
      >
        <div className="hero-background" aria-hidden="true" />
        <MatrixRain intensity={0.5} hue={0} className="pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center">
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Red Team Agency</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="max-w-4xl font-mono text-4xl font-semibold text-zinc-100 sm:text-5xl md:text-6xl">Red Team Operations</motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }} className="font-mono text-lg text-zinc-400 sm:text-xl">Physical | Social | Cyber</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex flex-col items-center gap-4">
            <TypewriterCycle phrases={heroPhrases} typingSpeed={70} pause={1500} />
            <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">We emulate real adversaries to validate controls, train defenders, and prioritize fixes.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="/contact" className="inline-flex items-center gap-3 rounded border border-ember px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember">
              Scope an Operation
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="/services" className="inline-flex items-center gap-3 rounded border border-zinc-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-zinc-200 transition hover:border-ember hover:text-ember">
              View Playbooks
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* PREVIEW CONSOLE */}
      <section className="border-t border-zinc-900 bg-night/95">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mb-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">Preview</p>
            <h2 className="mt-2 font-mono text-3xl text-zinc-100 sm:text-4xl">Attack Path, At a Glance</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-400">Select a domain to preview a realistic breach path. Each step shows objectives, abstracted actions, expected defensive signals, and sanitized artifacts.</p>
          </div>
          <div className="mb-6 flex flex-wrap items-end justify-center gap-5">
            {scenarioLabels.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => { setScenario(s.key); setConsoleKey((k) => k + 1); }}
                className={`group relative px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.28em] transition ${scenario === s.key ? 'text-ember' : 'text-zinc-300 hover:text-ember'}`}
              >
                {s.label}
                <span className={`absolute -bottom-[3px] left-0 h-[2px] bg-ember transition-all duration-300 ${scenario === s.key ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative w-full" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="pointer-events-none absolute -inset-3 rounded bg-gradient-to-r from-ember/15 via-transparent to-ember/10 blur-lg" />
            {(() => {
              const steps = scenarioSteps[scenario] || [];
              const header = `RO // ${scenario.toUpperCase()} OPS`;
              const banner = [
                '$ whoami', 'operator',
                '$ hostnamectl --static', 'ro-station',
                '$ uname -srmo', 'Linux 6.6.15 x86_64 GNU/Linux',
                '',
                `$ ro-sim --scenario ${scenario} --safety --roe`,
                '[ok] environment prepared',
                ''
              ];
              const run = [
                ...banner,
                ...steps.flatMap((s, i) => {
                  const out = [];
                  out.push(`$ step:${String(i + 1).padStart(2, '0')} ${s.label}`);
                  if (s.objective) out.push(`# objective: ${s.objective}`);
                  if (s.actions?.length) out.push(`# actions: ${s.actions[0]}`);
                  if (s.signals?.length) out.push(`# signals: ${s.signals[0]}`);
                  out.push('[ok] recorded');
                  out.push('');
                  return out;
                }),
                '$ echo "run complete"'
              ];
              const evidence = [
                '$ tree ~/ro/evidence',
                ...steps.flatMap((s, i) => {
                  const idx = String(i + 1).padStart(2, '0');
                  const items = s.artifacts?.slice(0, 2) || [];
                  return items.map((a) => `- ${idx}_${s.label.toLowerCase().replace(/\s+/g,'-')}/${a.toLowerCase().replace(/\s+/g,'-')}`);
                }),
                '- summary.txt'
              ];
              const signals = [
                '$ cat ~/ro/signals.expected',
                ...steps.flatMap((s, i) => {
                  const idx = String(i + 1).padStart(2, '0');
                  return (s.signals || []).slice(0, 2).map((sig) => `-> [${idx}] ${sig}`);
                })
              ];
              const notes = [
                '$ cat ~/ro/compliance.map',
                ...steps.flatMap((s, i) => {
                  const idx = String(i + 1).padStart(2, '0');
                  const tags = s.tags || {};
                  const rows = [];
                  if (tags.mitre?.length) rows.push(`MITRE[${idx}]: ${tags.mitre.join(', ')}`);
                  if (tags.nist?.length) rows.push(`NIST[${idx}]: ${tags.nist.join(', ')}`);
                  if (tags.cis?.length) rows.push(`CIS[${idx}]: ${tags.cis.join(', ')}`);
                  return rows;
                })
              ];
              const sections = { Run: run, Evidence: evidence, Signals: signals, Notes: notes };
              return (
                <OpsConsole
                  showSidebar={false}
                  key={`${scenario}-${consoleKey}`}
                  title={header}
                  sections={sections}
                  lines={run}
                  playKey={consoleKey}
                  points={['Maps steps to realistic detections', 'Sanitized evidence without sensitive details', 'Compliance tags for executive traceability']}
                />
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-zinc-900 bg-night/95">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -6, boxShadow: '0 0 30px rgba(220,38,38,0.15)' }}
              className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-gradient-to-br from-steel/80 to-night/80 p-8"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ember/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-ember/30 bg-black/30">
                  <feature.icon className="h-6 w-6 text-ember" aria-hidden="true" />
                </div>
                <h3 className="font-mono text-lg text-zinc-100">{feature.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{feature.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {feature.badges?.map((b) => (
                  <span key={b} className="rounded border border-zinc-800 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">{b}</span>
                ))}
              </div>
              {feature.points && (
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {feature.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember/70" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-zinc-900 bg-night/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24">
          <div className="space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Red Team Capabilities</p>
            <h2 className="font-mono text-3xl text-zinc-100 sm:text-4xl">Sentinel Ops At Your Doorstep</h2>
            <p className="mx-auto max-w-3xl text-sm text-zinc-400">RedOffset delivers converged operations exposing the full attack surface—people, facilities, and infrastructure. We find the cracks now so real adversaries cannot exploit them later.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilityPillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group space-y-3 rounded border border-zinc-900 bg-gradient-to-br from-night/90 via-night/70 to-steel/60 p-6"
              >
                <h3 className="font-mono text-lg text-zinc-100">{pillar.title}</h3>
                <p className="text-sm text-zinc-400">{pillar.description}</p>
                <div className="pointer-events-none mt-3 h-0.5 w-0 bg-ember/0 transition-all duration-300 group-hover:w-full group-hover:bg-ember/60" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;




