import { motion } from 'framer-motion';
import usePageMetadata from '../hooks/usePageMetadata.js';
import MethodTimeline from '../components/MethodTimeline.jsx';
import HUDCorners from '../components/HUDCorners.jsx';
import KPICounter from '../components/KPICounter.jsx';
import TeamGrid from '../components/TeamGrid.jsx';
import MatrixRain from '../components/MatrixRain.jsx';
import TypewriterCycle from '../components/TypewriterCycle.jsx';
import TrustStrip from '../components/TrustStrip.jsx';
import CertificationsStrip from '../components/CertificationsStrip.jsx';

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const About = () => {
  usePageMetadata({
    title: 'About',
    description:
      "Learn about RedOffset’s mission, methodology, and governance executing converged red team operations with MITRE-/NIST-aligned rigor."
  });

  return (
    <section className="bg-night">
      {/* Mini hero */}
      <div className="relative overflow-hidden border-b border-zinc-900">
        <div className="hero-background" aria-hidden="true" />
        <MatrixRain intensity={0.4} hue={0} className="pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Inside RedOffset</p>
          <h1 className="font-mono text-4xl text-zinc-100 sm:text-5xl">Operators | Intelligence | Assurance</h1>
          <TypewriterCycle phrases={["Plan | Rehearse | Execute | Debrief | Improve", "OpSec | Governance | Evidence | Reporting"]} typingSpeed={65} pause={1300} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 py-20">
        <TrustStrip />
        {/* Mission + Assurance grid */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-8"
          >
            <HUDCorners />
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Our Mission</p>
            <h2 className="mt-2 font-mono text-4xl text-zinc-100 sm:text-5xl">Offset the Threat Curve</h2>
            <p className="mt-3 text-base text-zinc-400">
              RedOffset runs converged red‑team operations across physical, social, and cyber domains to reveal real‑world weaknesses before adversaries do. Campaigns are planned with your leaders, rehearsed for safety, and executed with disciplined OpSec.
            </p>
            <p className="mt-3 text-base text-zinc-400">Outcomes: executive clarity, prioritized fixes, reduced exposure.</p>
            <ul className="mt-5 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              {[
                'Rehearsed operations with strict OpSec and safety controls',
                'Purple-team collaboration to uplift detections during the op',
                'Executive reports with risk deltas and ownership',
                'Traceable mapping to MITRE/NIST/CIS'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70"
          >
            <HUDCorners />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.2),transparent_60%)]" aria-hidden="true" />
            <div className="relative p-10">
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-ember">Assurance</p>
              <div className="mt-4 grid gap-4 text-sm text-zinc-300">
                <div className="rounded border border-zinc-900 bg-black/30 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Governance</p>
                  <p className="mt-1">RoE, NDAs, comms cadence, and abort conditions are established up‑front with stakeholders.</p>
                </div>
                <div className="rounded border border-zinc-900 bg-black/30 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Evidence</p>
                  <p className="mt-1">Artifacts are sanitized, versioned, and shared via secure channels with chain‑of‑custody.</p>
                </div>
                <div className="rounded border border-zinc-900 bg-black/30 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Reporting</p>
                  <p className="mt-1">Executive narrative, technique‑to‑signal mapping, and prioritized fixes with estimated risk deltas.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* KPI row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Years Operating', from: 0, to: 5, suffix: '+' },
            { label: 'Operations Completed', from: 60, to: 150, suffix: '+' },
            { label: 'Detections Tuned', from: 100, to: 700, suffix: '+' },
            { label: 'Playbooks Delivered', from: 30, to: 180, suffix: '+' }
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-zinc-900 bg-gradient-to-b from-steel/70 to-night/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{kpi.label}</p>
              <KPICounter from={kpi.from} to={kpi.to} suffix={kpi.suffix} duration={1100} className="mt-1 block font-mono text-3xl text-ember" />
            </div>
          ))}
        </div>

        {/* Methodology */}
        <MethodTimeline
          steps={[
            { title: 'Plan', objective: 'Align scenarios, safety controls, and RoE.', signals: ['Approved windows and escalation paths'] },
            { title: 'Rehearse', objective: 'Dry-run routes and comms to reduce risk.', signals: ['Operator checklists validated'] },
            { title: 'Execute', objective: 'Run scenarios under OpSec with tight comms.', signals: ['Detections and workflow observations'] },
            { title: 'Debrief', objective: 'Reconstruct tradecraft and tune detections.', signals: ['Updated alerts and playbooks'] },
            { title: 'Improve', objective: 'Deliver fixes and retest if desired.', signals: ['Reduced exposure window'] }
          ]}
        />

        {/* Team section */}
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">Team</p>
          <p className="text-sm text-zinc-400">We’re a multidisciplinary crew with backgrounds in physical intrusion, social engineering, and cyber operations. Several of our operators are former offensive practitioners who now work on the right side of the fence—using the adversary’s playbook to anticipate moves, reproduce realistic paths, and help your defenders close them fast.</p>
          <TeamGrid />
        </div>

        {/* Certifications */}
        <CertificationsStrip />
      </div>
    </section>
  );
};

export default About;

