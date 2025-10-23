import { motion } from 'framer-motion';
import { ArrowRightIcon, ShieldCheckIcon, UserGroupIcon, SignalIcon } from '@heroicons/react/24/outline';
import TypewriterCycle from '../components/TypewriterCycle.jsx';
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

const Home = () => {
  usePageMetadata({
    title: 'Adversary Simulation',
    description:
      'RedOffset executes converged red team operations—physical, social, and cyber—to expose real-world security gaps before threat actors do.'
  });

  return (
    <div className="relative overflow-hidden">
      <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center">
        <div className="hero-background" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center">
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
            className="max-w-3xl font-mono text-4xl font-semibold text-zinc-100 sm:text-5xl md:text-6xl"
          >
            Adversaries Simulated. Threats Offset.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <TypewriterCycle phrases={heroPhrases} typingSpeed={70} pause={1500} />
            <p className="max-w-xl text-sm text-zinc-400 sm:text-base">
              Operator-grade teams that think, move, and adapt like determined adversaries. We pressure-test your defenses under the same tradecraft used in real intrusions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <a
              href="/services"
              className="inline-flex items-center gap-3 rounded border border-ember px-6 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ember transition hover:shadow-ember"
            >
              See How We Breach
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
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
                'Former special operations, intelligence, and red team veterans plan, rehearse, and execute every op with strict OpSec.'
            },
            {
              icon: SignalIcon,
              title: 'Intelligence-Led Tradecraft',
              description:
                'Campaigns track live adversary TTPs and leverage custom tooling, ensuring realism across physical, human, and cyber domains.'
            },
            {
              icon: UserGroupIcon,
              title: 'Executive Alignment',
              description:
                'Findings map to business risk, with board-ready briefings, purple team integrations, and actionable remediation roadmaps.'
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded border border-zinc-900 bg-gradient-to-br from-steel/80 to-night/80 p-8"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ember/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <feature.icon className="h-8 w-8 text-ember" aria-hidden="true" />
              <h3 className="mt-6 font-mono text-lg text-zinc-100">{feature.title}</h3>
              <p className="mt-4 text-sm text-zinc-400">{feature.description}</p>
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
                className="space-y-3 rounded border border-zinc-900 bg-gradient-to-br from-night/90 via-night/70 to-steel/60 p-6"
              >
                <h3 className="font-mono text-lg text-zinc-100">{pillar.title}</h3>
                <p className="text-sm text-zinc-400">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
