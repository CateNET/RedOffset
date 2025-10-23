import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `relative inline-flex items-center px-1 py-2 text-sm uppercase tracking-[0.25em] transition-colors duration-200 ${
      isActive ? 'text-ember' : 'text-zinc-200'
    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-ember after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-night/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded border border-ember/60 bg-steel/60">
            <span className="sr-only">RedOffset</span>
            <span className="font-mono text-lg text-ember">RO</span>
          </div>
          <span className="glitch font-mono text-2xl font-semibold text-zinc-100" data-text="RedOffset">
            RedOffset
          </span>
        </NavLink>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded border border-zinc-800 bg-steel/80 p-2 text-zinc-200 transition hover:border-ember hover:text-ember md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-zinc-800 bg-night/95 md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-3 text-sm uppercase tracking-[0.25em] ${isActive ? 'text-ember' : 'text-zinc-200'} hover:text-ember`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
