import { motion } from 'framer-motion';
import { BuildingOffice2Icon, CpuChipIcon, FingerPrintIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';
import usePageMetadata from '../hooks/usePageMetadata.js';
import TacticsCoverage from '../components/TacticsCoverage.jsx';
import HUDCorners from '../components/HUDCorners.jsx';

const services = [
  {
    title: 'Physical Intrusion & Recon',
    summary:
      'Operators test the perimeter, bypass smart security, and exfiltrate evidence to mirror a determined on-site adversary.',
    icon: BuildingOffice2Icon,
    capabilities: [
      'Perimeter assessment, blind spots, and route planning',
      'Smart lock, alarm, and access control bypass techniques',
      'Tailgating, badge cloning, and lock picking drills',
      'Mail interception and secure package manipulation'
    ]
  },
  {
    title: 'Social Engineering',
    summary:
      'Campaigns weaponize social trust to expose people, process, and technology gaps before adversaries do.',
    icon: UsersIcon,
    capabilities: [
      'Spear phishing, vishing, and multi-channel lures',
      'Executive targeting and social profiling',
      'Pretext design with psychological triggers',
      'Insider threat simulation and bait testing'
    ]
  },
  {
    title: 'Cyber Adversary Simulation',
    summary:
      'Full-spectrum intrusion chains validate detection, response, and containment across your environment.',
    icon: CpuChipIcon,
    capabilities: [
      'Initial access via phishing payloads and drive-by downloads',
      'Credential harvesting, session hijacking, and privilege escalation',
      'Covert C2 infrastructure with long-haul persistence',
      'Custom malware, obfuscation, and exfiltration tradecraft'
    ]
  },
  {
    title: 'Residential Red Teaming',
    summary:
      'Discrete estate-focused assessments that keep high-visibility clients and their families secure.',
    icon: FingerPrintIcon,
    capabilities: [
      'Estate reconnaissance and covert access attempts',
      'Alarm system bypass and entry point testing',
      'Wi-Fi and IoT exploitation across household networks',
      'Lifestyle pattern tracking and household staff vetting'
    ]
  }
];

const assurance = [
  {
    title: 'Operational Rigor',
    description:
      'Engagements align to MITRE ATT&CK, NIST 800-53, and PTES with strict OpSec, NDAs, and post-operation clean up.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Tailored Rules of Engagement',
    description:
      'Scenarios reflect your risk appetite, environment, and regulatory landscape with purple team collaboration where needed.',
    icon: UsersIcon
  },
  {
    title: 'Actionable Intelligence',
    description:
      'Deliverables include tradecraft reconstructions, risk scoring, remediation roadmaps, and executive-ready briefings.',
    icon: CpuChipIcon
  }
];

const sectors = [
  'Enterprises, SMBs, and venture-backed startups',
  'Executive protection teams and VIP households',
  'Financial institutions, law firms, and consultancies',
  'Energy, logistics, manufacturing, and infrastructure',
  'Private security firms and estate management teams'
];

const Services = () => {
  usePageMetadata({
    title: 'Services',
    description:
      'Explore RedOffset red team disciplines across physical intrusion, social engineering, cyber adversary simulation, and residential security.'
  });

  return (
    <section className="relative bg-night py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_300px_at_50%_-10%,rgba(220,38,38,0.12),transparent)]" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        {/* Mini hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Services</p>
          <h1 className="font-mono text-4xl text-zinc-100 sm:text-5xl">Red Team Disciplines</h1>
          <p className="mx-auto max-w-3xl text-sm text-zinc-400">
            Our converged teams execute physical, human, and cyber intrusion scenarios in tandem. Each mission is scoped for operational realism, executive clarity, and measurable uplift to your security program.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Disciplines">
            {["Physical","Social","Cyber","Residential"].map((t) => (
              <span key={t} className="cursor-default select-none rounded-full border border-zinc-900 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Detection coverage */}
        <TacticsCoverage className="mt-2" />

        {/* Service cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="group relative overflow-hidden rounded-xl border border-zinc-900 bg-gradient-to-br from-steel/80 to-night/80 p-8"
            >
              <HUDCorners />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ember/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-ember/30 bg-black/30">
                  <service.icon className="h-6 w-6 text-ember" aria-hidden="true" />
                </div>
                <h2 className="font-mono text-2xl text-zinc-100">{service.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-500">
                {service.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember/60" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {['MITRE', 'NIST', 'CIS'].map((b) => (
                  <span key={b} className="rounded border border-zinc-800 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    {b}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Assurance + Sectors */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 rounded border border-zinc-900 bg-gradient-to-br from-night/90 via-night/70 to-steel/70 p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">Why RedOffset</p>
            <h2 className="font-mono text-2xl text-zinc-100">Sentinel-Grade Assurance</h2>
            <p className="text-sm text-zinc-400">
              Our operators maintain the same discipline as nation-state adversaries. Every operation is planned, rehearsed, and
              executed with full legal compliance, ethical oversight, and collaborative debriefs for your defensive teams.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {assurance.map((item) => (
                <div key={item.title} className="space-y-3">
                  <item.icon className="h-7 w-7 text-ember" aria-hidden="true" />
                  <h3 className="font-mono text-sm text-zinc-200">{item.title}</h3>
                  <p className="text-xs text-zinc-500">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 rounded border border-zinc-900 bg-night/80 p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">Who We Partner With</p>
            <p className="text-sm text-zinc-400">
              RedOffset supports offensive security programs for organizations operating in high-threat, high-regulation sectors.
            </p>
            <ul className="space-y-3 text-sm text-zinc-500">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember/60" aria-hidden="true" />
                  <span>{sector}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Services;
