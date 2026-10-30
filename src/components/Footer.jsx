import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { Mark, Check } from './Icons.jsx';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter an email address like name@example.com.');
    setError('');
    setDone(true); // demonstration only: nothing is sent or stored
  };
  if (done) return <p className="flex items-start gap-2 rounded-lg bg-white/10 p-4 text-sm" role="status"><Check width="18" height="18" /> Thank you. This is a demonstration, so nothing was sent or saved.</p>;
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="news" className="mb-2 block font-semibold">Travel notes by email</label>
      <div className="flex gap-2">
        <input id="news" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!error} aria-describedby={error ? 'news-err' : undefined} className="input h-11 min-w-0 flex-1 border-transparent bg-white text-base-content" />
        <button type="submit" className="btn btn-accent h-11">Subscribe</button>
      </div>
      {error && <p id="news-err" className="mt-2 text-sm font-medium text-[#ffb59f]">{error}</p>}
      <p className="mt-2 text-xs text-neutral-content/65">Demonstration form: no subscription is created.</p>
    </form>
  );
}

const col = 'flex flex-col gap-2.5';
const h = 'mb-1 font-sans text-sm font-bold uppercase tracking-wider text-neutral-content/60';
export default function Footer() {
  return (
    <footer className="on-dark bg-neutral pt-16 text-neutral-content">
      <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <p className="mb-3 flex items-center gap-2.5 font-display text-3xl"><Mark size={32} /> Landfall</p>
          <p className="max-w-xs text-neutral-content/75">{site.tagline}. A fictional travel company created for demonstration.</p>
        </div>
        <nav aria-label="Footer" className={col}>
          <h2 className={h}>Explore</h2>
          {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-[#f0b49f]">{n.label}</Link>)}
          <Link to="/plan" className="hover:text-[#f0b49f]">Plan your trip</Link>
        </nav>
        <address className={`${col} not-italic`}>
          <h2 className={h}>Get in touch</h2>
          <a href={`mailto:${site.email}`} className="hover:text-[#f0b49f]">{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-[#f0b49f]">{site.phone}</a>
          <span className="text-neutral-content/75">{site.hours}</span>
          <span className="text-xs text-neutral-content/55">Contact details are placeholders.</span>
        </address>
        <Newsletter />
      </div>
      <div className="wrap mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-white/15 py-6 text-sm text-neutral-content/70">
        <p>© {new Date().getFullYear()} Landfall. Illustrative prices; no real bookings are made.</p>
        <p className="flex flex-wrap items-center gap-x-5">
          <span className="font-semibold text-white">Website designed and built by Zohair.</span>
          <Link to="/credits" className="hover:text-[#f0b49f]">Credits</Link>
        </p>
      </div>
    </footer>
  );
}
