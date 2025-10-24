import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon, UserGroupIcon, SignalIcon } from '@heroicons/react/24/outline';
import TypewriterCycle from '../components/TypewriterCycle.jsx';
import MatrixRain from '../components/MatrixRain.jsx';
import BreachPath from '../components/BreachPath.jsx';
import usePageMetadata from '../hooks/usePageMetadata.js';

const heroPhrases = [
  'Credential Harvesting',
  'Physical Intrusion',
  'Executive Targeting',
  'Social Engineering',
  'Residential Breach Rehearsals'
];

const capabilityPillars = [
  {
    title: 'Physical Intrusion & Recon',
    description:
      'Route planning, smart-lock bypass, surveillance evasion, and exfiltration drills validate your critical facility controls.'
  },
  {
    title: 'Social Engineering Operations',
    description:
      'Spear phishing, vishing, impersonation, and insider bait campaigns measure human-layer resilience and response posture.'
  },
  {
    title: 'Cyber Adversary Simulation',
    description:
      'Initial access, credential theft, lateral movement, and covert C2 chains align to MITRE ATT&CK and active threat actor TTPs.'
  },
  {
    title: 'Residential Red Teaming',
    description:
      'Estate recon, alarm bypass, Wi-Fi intrusion, and lifestyle analysis safeguard executives, VIPs, and their families.'
  }
];

// Scenario step definitions (used by BreachPath)
const scenarioSteps = {
  cyber: [
    {
      label: 'External',
      objective: 'Obtain foothold through a realistic user path.',
      actions: ['Targeted spear phish with vendor-themed invoice macro', 'Attachment fingerprinted to evade common AV signatures'],
      signals: ['Mail gateway rule hits', 'User click and macro execution event'],
      artifacts: ['Delivered lure email + header', 'Macro hash + VT baseline']
    },
    {
      label: 'User',
      objective: 'Execute payload and establish C2.',
      actions: ['Staged payload spawns in user context', 'Beacon over egress-safe domain front'],
      signals: ['EDR process tree anomaly', 'Outbound TLS to unusual SNI'],
      artifacts: ['Beacon config (redacted)', 'Process tree capture']
    },
    {
      label: 'Workstation',
      objective: 'Harvest credentials for lateral movement.',
      actions: ['Dump LSASS via protected handle bypass', 'Parse creds and tokens for reuse'],
      signals: ['Memory access alert (if configured)', 'Suspicious handle opens'],
      artifacts: ['Sanitized cred cache sample', 'Technique mapping (T1003)']
    },
    {
      label: 'Server',
      objective: 'Privileged access on finance server.',
      actions: ['Pivot using SMB exec with harvested token', 'Establish short‑lived admin session'],
      signals: ['Lateral movement event', 'Admin logon outside baseline'],
      artifacts: ['Host timeline snippet', 'Lateral path diagram']
    },
    {
      label: 'Data',
      objective: 'Demonstrate impact with controlled sampling.',
      actions: ['Enumerate sensitive paths', 'Exfil small evidence set over low‑noise channel'],
      signals: ['DLP/detection hits if present'],
      artifacts: ['Evidence list (redacted)', 'Risk summary + MITRE map']
    },
  ],
  physical: [
    {
      label: 'Street',
      objective: 'Identify entry windows without raising attention.',
      actions: ['Camera coverage mapping', 'Vendor and shift timing observation'],
      signals: ['Security patrol patterns observed'],
      artifacts: ['Annotated perimeter map']
    },
    {
      label: 'Lobby',
      objective: 'Bypass lobby control discreetly.',
      actions: ['Clone badge from long‑range capture', 'Tailgate during rush window'],
      signals: ['Access control logs show duplicate UID'],
      artifacts: ['Badge UID snapshot (redacted)']
    },
    {
      label: 'Ops Floor',
      objective: 'Reach operational area and find weak points.',
      actions: ['Identify unattended workstation and confidential desk items'],
      signals: ['Potential CCTV angle coverage gaps'],
      artifacts: ['Desk/terminal proximity photos (sanitized)']
    },
    {
      label: 'Records',
      objective: 'Prove document handling risk.',
      actions: ['Collect sensitive printouts for evidence only'],
      signals: ['Printer job logs'],
      artifacts: ['Redacted document photos']
    },
    {
      label: 'Exit',
      objective: 'Exfiltrate without challenge.',
      actions: ['Use service corridor to exit'],
      signals: ['Door contact logs'],
      artifacts: ['Route map']
    },
  ],
  social: [
    {
      label: 'OSINT',
      objective: 'Build a credible pretext with specifics.',
      actions: ['LinkedIn role mapping', 'Vendor schedules', 'Have I Been Pwned + paste sites', 'Property/SEC filings for naming'],
      signals: ['None (passive collection)'],
      artifacts: ['OSINT summary table']
    },
    {
      label: 'Pretext',
      objective: 'Craft delivery/vendor scenario that matches cadence.',
      actions: ['Script with time/place cues', 'Voice tone and escalation path'],
      signals: ['N/A'],
      artifacts: ['Pretext script (redacted)']
    },
    {
      label: 'Helpdesk',
      objective: 'Obtain temporary MFA bypass.',
      actions: ['Vishing call with ticket reference + urgency'],
      signals: ['Helpdesk ticket + call recording if policy allows'],
      artifacts: ['Call script + result']
    },
    {
      label: 'MFA',
      objective: 'Hijack active session within window.',
      actions: ['Prompt bombing avoidance', 'Timing hijack to approval'],
      signals: ['MFA logs show temp override'],
      artifacts: ['Session logs (sanitized)']
    },
    {
      label: 'Internal',
      objective: 'Demonstrate access impact.',
      actions: ['Portal entry + scoped actions (no destructive ops)'],
      signals: ['UEBA anomaly'],
      artifacts: ['Action list + screenshots (redacted)']
    },
  ],
  residential: [
    {
      label: 'Perimeter',
      objective: 'Understand estate rhythms and observation points.',
      actions: ['Night route mapping', 'Camera angles and blind spots'],
      signals: ['Guard logs timestamps'],
      artifacts: ['Perimeter diagram']
    },
    {
      label: 'Panel',
      objective: 'Assess alarm system configuration risks.',
      actions: ['Identify panel model/version', 'Check for default installer code'],
      signals: ['Alarm panel audit logs'],
      artifacts: ['Panel model notes']
    },
    {
      label: 'Wi‑Fi',
      objective: 'Evaluate guest network posture.',
      actions: ['AP discovery and PSK strength', 'Segmentation checks'],
      signals: ['Wireless controller logs'],
      artifacts: ['SSID list + signal map']
    },
    {
      label: 'IoT',
      objective: 'Identify exploitable IoT pivot risk.',
      actions: ['CVE check and basic exploitation in lab context'],
      signals: ['Device logs'],
      artifacts: ['Vuln summary + CVE mapping']
    },
    {
      label: 'Home Office',
      objective: 'Demonstrate executive workspace exposure.',
      actions: ['Data handling review', 'Physical document risk'],
      signals: ['N/A'],
      artifacts: ['Workspace photos (sanitized)']
    },
  ],
};

const scenarioLabels = [
  { key: 'cyber', label: 'Cyber' },
  { key: 'physical', label: 'Physical' },
  { key: 'social', label: 'Social' },
  { key: 'residential', label: 'Residential' },
];

// Metrics removed per feedback; keep focus on terminal content and CTAs

const Home = () => {
  const [engaged, setEngaged] = useState(true);
  const [scenario, setScenario] = useState('cyber');
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [0, 1], [6, -6]);
  const rotY = useTransform(mx, [0, 1], [-6, 6]);

  usePageMetadata({
    title: 'Adversary Simulation',
    description:
      'RedOffset executes converged red team operations—physical, social, and cyber—to expose real-world security gaps before threat actors do.'
  });

  return (
    <div className="relative overflow-hidden">
      {/* HERO: full-viewport intro */}
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
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-ember"
          >
            Red Team Agency
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="max-w-4xl font-mono text-4xl font-semibold text-zinc-100 sm:text-5xl md:text-6xl"
          >
            Red Team Attack Operations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="font-mono text-lg text-zinc-400 sm:text-xl"
          >
            Physical | Social | Cyber
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <TypewriterCycle phrases={heroPhrases} typingSpeed={70} pause={1500} />
            <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
              We emulate real adversaries to validate controls, train defenders, and prioritize fixes. Engage a controlled operation with clear outcomes and executive reporting.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded border border-ember px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember"
            >
              Scope an Operation
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-3 rounded border border-zinc-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-zinc-200 transition hover:border-ember hover:text-ember"
            >
              View Playbooks
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE: Breach path preview below the fold */}
      <section className="border-t border-zinc-900 bg-night/95">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mb-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">Preview</p>
            <h2 className="mt-2 font-mono text-3xl text-zinc-100 sm:text-4xl">Attack Path, At a Glance</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-400">
              Select a domain to see a succinct, realistic breach path with the objectives, actions, defensive signals, and report artifacts you can expect.
            </p>
          </div>
          <div className="mb-4 flex flex-wrap items-end justify-center gap-5">
            {scenarioLabels.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setScenario(s.key)}
                className={`group relative px-1 pb-1 font-mono text-[11px] uppercase tracking-[0.28em] transition ${
                  scenario === s.key ? 'text-ember' : 'text-zinc-300 hover:text-ember'
                }`}
              >
                {s.label}
                <span
                  className={`absolute -bottom-[3px] left-0 h-[2px] bg-ember transition-all duration-300 ${
                    scenario === s.key ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY }}
            className="relative w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pointer-events-none absolute -inset-3 rounded bg-gradient-to-r from-ember/15 via-transparent to-ember/10 blur-lg" />
            <BreachPath key={scenario} steps={scenarioSteps[scenario]} title={`RO // Path: ${scenario.toUpperCase()}`} />
          </motion.div>
        </div>
      </section>
      <section className="border-t border-zinc-900 bg-night/95">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheckIcon,
              title: 'Operator Discipline',
              description:
                'Planned, rehearsed, and legally reviewed operations with strict OpSec, safety controls, and documented clean‑up.',
              badges: ['RoE', 'OpSec'],
              points: ['Brief‑backs and range rehearsals', 'Chain‑of‑custody for evidence']
            },
            {
              icon: SignalIcon,
              title: 'Intelligence‑Led Tradecraft',
              description:
                'Scenarios align to current adversary behaviors with ATT&CK/NIST/CIS mapping—no procedural how‑to.',
              badges: ['MITRE', 'NIST', 'CIS'],
              points: ['Technique → signal mapping', 'Purple‑team tuning during ops']
            },
            {
              icon: UserGroupIcon,
              title: 'Executive Alignment',
              description:
                'Findings tie to business impact with prioritized backlogs, owners, and measurable risk deltas.',
              badges: ['Board‑Ready', 'KPI'],
              points: ['Risk narrative with MTTD/MTTC', 'Actionable roadmap with effort']
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-gradient-to-br from-steel/80 to-night/80 p-8 transition-shadow hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]"
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
                  <span key={b} className="rounded border border-zinc-800 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    {b}
                  </span>
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
      <section className="border-t border-zinc-900 bg-night/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24">
          <div className="space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Red Team Capabilities</p>
            <h2 className="font-mono text-3xl text-zinc-100 sm:text-4xl">Sentinel Ops At Your Doorstep</h2>
            <p className="mx-auto max-w-3xl text-sm text-zinc-400">
              RedOffset delivers converged operations that expose the full attack surface—people, facilities, and infrastructure.
              We find the cracks now, so the real adversary cannot exploit them later.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilityPillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
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


