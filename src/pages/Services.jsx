import { motion } from 'framer-motion';
import { BuildingOffice2Icon, CpuChipIcon, FingerPrintIcon, UsersIcon } from '@heroicons/react/24/outline';
import usePageMetadata from '../hooks/usePageMetadata.js';

const services = [
  {
    title: 'Physical Intrusion',
    description:
      'Covert entry specialists target executive offices, labs, and data centers to validate physical security assumptions under realistic constraints.',
    icon: BuildingOffice2Icon
  },
  {
    title: 'Social Engineering',
    description:
      'Multi-channel phishing, vishing, and on-site pretexting campaigns assess human resilience and incident response readiness.',
    icon: UsersIcon
  },
  {
    title: 'Cyber Adversary Simulation',
    description:
      'Persistent network footholds, lateral movement, and exfiltration exercises mirror nation-state playbooks without production impact.',
    icon: CpuChipIcon
  },
  {
    title: 'Residential Red Teaming',
    description:
      'Protect high-net-worth families with surveillance detection, perimeter testing, and custom security advisories tailored to lifestyle.',
    icon: FingerPrintIcon
  }
];

const Services = () => {
  usePageMetadata({
    title: 'Services',
    description: 'Explore RedOffset service pillars spanning physical, human, and cyber intrusion campaigns.'
  });

  return (
    <section className="bg-night py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Services</p>
          <h1 className="font-mono text-4xl text-zinc-100 sm:text-5xl">Red Team Disciplines</h1>
          <p className="text-base text-zinc-400">
            Every engagement is scoped for operational realism and executive impact. Our cells integrate into your organization, observe how defenses react, and provide actionable guidance with remediation partners.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <motion.article
              key={service.title}
              whileHover={{ rotateX: 2, rotateY: -2, translateY: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="group relative overflow-hidden rounded border border-zinc-900 bg-gradient-to-br from-steel/80 to-night/80 p-8"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ember/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <service.icon className="h-8 w-8 text-ember" aria-hidden="true" />
              <h2 className="mt-6 font-mono text-2xl text-zinc-100">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              <div className="mt-6 h-[1px] w-16 origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
