import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../data/site.js';
import { Menu, Close, Mark } from './Icons.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const linkClass = ({ isActive }) =>
    `block border-b-2 px-3.5 py-2 font-semibold transition-colors hover:border-line max-lg:border-b max-lg:py-3.5 max-lg:text-lg ${isActive ? 'border-accent text-primary' : 'border-transparent'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base-200/95 backdrop-blur-sm">
      <div className="wrap flex min-h-[76px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-3xl tracking-tight text-primary" aria-label="Landfall home"><Mark /> Landfall</Link>
        <div id="site-nav" className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-4 border-b border-line bg-base-200 px-5 pb-6 pt-2 lg:static lg:flex lg:flex-row lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0`}>
          <nav aria-label="Main" className="flex flex-col lg:flex-row lg:gap-1">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkClass}>{n.label}</NavLink>)}
          </nav>
          <Link to="/plan" className="btn btn-accent">Plan your trip</Link>
        </div>
        <button type="button" className="btn btn-square btn-ghost border-line lg:hidden" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
