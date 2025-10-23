import { NavLink } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-night/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:flex-row md:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-ember/60 bg-steel/60">
              <span className="font-mono text-lg text-ember">RO</span>
            </div>
            <p className="font-mono text-lg text-zinc-200">Adversaries Simulated. Threats Offset.</p>
          </div>
          <p className="text-sm text-zinc-400">
            We partner with executive leadership and security teams to expose blind spots across digital, physical, and human vectors.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-10 text-sm uppercase tracking-[0.3em] md:flex-row md:justify-end">
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-zinc-500">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-zinc-300">
                <EnvelopeIcon className="h-4 w-4 text-ember" aria-hidden="true" />
                <a href="mailto:operations@redoffset.io" className="hover:text-ember">
                  operations@redoffset.io
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <PhoneIcon className="h-4 w-4 text-ember" aria-hidden="true" />
                <a href="tel:+14085550199" className="hover:text-ember">
                  +1 (408) 555-0199
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-zinc-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-ember">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-ember">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-ember">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-ember">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800/60 bg-night/60 py-6">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
          © {new Date().getFullYear()} RedOffset Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
