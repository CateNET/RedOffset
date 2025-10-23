import { motion } from 'framer-motion';
import usePageMetadata from '../hooks/usePageMetadata.js';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  usePageMetadata({
    title: 'About',
    description: 'Learn about RedOffset’s mission, methodology, and leadership behind our red team operations.'
  });

  return (
    <section className="bg-night py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-10">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-ember">Our Mission</p>
            <h1 className="font-mono text-4xl text-zinc-100 sm:text-5xl">Offset the Threat Curve</h1>
            <p className="text-base text-zinc-400">
              RedOffset is a collective of former special operations, intelligence, and enterprise security operators. We exist to keep your organization ahead of sophisticated attackers by combining offensive discipline with executive-ready intelligence.
            </p>
          </motion.div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-sm text-zinc-400"
          >
            <p>
              We embed with your defenders, observe command decisions, and escalate pressure across physical and cyber domains. The goal is not chaos—it’s clarity for leadership on where to invest, how to restructure processes, and which threats matter most.
            </p>
            <p>
              Engagements culminate in detailed tradecraft reconstructions, executive briefings, and long-term partnership. We operate discreetly, ethically, and with the accountability expected of trusted advisors.
            </p>
          </motion.div>
          <motion.ul
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 text-sm"
          >
            {[
              'Global red team operations since 2014',
              'Cell-based operators with TS/SCI experience',
              'Reporting aligned to MITRE ATT&CK and executive risk',
              'Trusted by Fortune 200 security leaders'
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative min-h-[320px] overflow-hidden rounded border border-zinc-900"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.25),transparent_60%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1100&q=80')] bg-cover bg-center opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-night via-night/60 to-transparent" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-end gap-4 p-10">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-ember">Tradecraft</p>
            <p className="max-w-xs text-sm text-zinc-300">
              Operators rehearse ingress routes, surveillance evasion, and controlled exploitation in our dedicated range before every client engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
