import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DestinationCard, Photo, TourCard } from '../components/ui.jsx';
import { Arrow, Search } from '../components/Icons.jsx';
import { destinations } from '../data/destinations.js';
import { tours, tourCategories } from '../data/tours.js';
import { experiences, benefits, guides, testimonials } from '../data/site.js';
import { usePageTitle } from '../hooks.js';

function SearchPanel() {
  const navigate = useNavigate();
  const [f, setF] = useState({ dest: '', cat: '', dur: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => v && sp.set(k, v));
    navigate(`/tours${sp.toString() ? `?${sp}` : ''}`);
  };
  const sel = 'select h-12 w-full border-line bg-base-100';
  return (
    <form onSubmit={submit} role="search" aria-label="Find a trip" className="surface grid gap-4 p-5 shadow-xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:p-6">
      <div><label htmlFor="s-dest" className="mb-1 block text-sm font-bold">Where to?</label>
        <select id="s-dest" className={sel} value={f.dest} onChange={set('dest')}><option value="">Anywhere</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></div>
      <div><label htmlFor="s-cat" className="mb-1 block text-sm font-bold">Trip style</label>
        <select id="s-cat" className={sel} value={f.cat} onChange={set('cat')}><option value="">Any style</option>{tourCategories.map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label htmlFor="s-dur" className="mb-1 block text-sm font-bold">How long?</label>
        <select id="s-dur" className={sel} value={f.dur} onChange={set('dur')}><option value="">Any length</option><option value="weekend">Up to 4 days</option><option value="week">5 to 7 days</option><option value="long">8 days or more</option></select></div>
      <button type="submit" className="btn btn-primary h-12 px-6"><Search /> Find your trip</button>
    </form>
  );
}

export default function Home() {
  usePageTitle('', 'Landfall is a fictional travel company offering thoughtfully planned tours to Santorini, Cape Town, Iceland, New York and more. A demonstration website.');
  const featured = tours.filter((t) => t.featured);
  const tourCount = (slug) => tours.filter((t) => t.destination === slug).length;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral text-white">
        <Photo name="capetown" alt="A hiker looking out at the flat-topped mountain above Cape Town" pos="50% 40%" eager sizes="100vw" className="absolute inset-0 -z-20 size-full" />
        <div className="absolute inset-0 -z-10 bg-black/55 md:bg-gradient-to-r md:from-[#0c1a16]/90 md:via-[#0c1a16]/55 md:to-transparent" />
        <div className="wrap pb-28 pt-20 md:pb-36 md:pt-32">
          <p className="eyebrow rise !text-[#f3b9a3]">Travel, thoughtfully planned</p>
          <h1 className="rise mt-4 max-w-3xl text-5xl leading-[1.04] md:text-7xl" style={{ animationDelay: '.08s' }}>Discover places that stay with you.</h1>
          <p className="rise mt-6 max-w-xl text-lg text-white/90 md:text-xl" style={{ animationDelay: '.16s' }}>From whitewashed island villages to glacier lagoons, we plan unhurried trips with local experiences and room to wander.</p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '.24s' }}>
            <Link to="/destinations" className="btn btn-accent btn-lg">Explore destinations <Arrow /></Link>
            <Link to="/tours" className="btn btn-lg border-white/70 bg-transparent text-white hover:bg-white hover:text-neutral">Find your trip</Link>
          </div>
        </div>
      </section>
      <div className="wrap relative z-10 -mt-14 md:-mt-16"><SearchPanel /></div>

      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-2">Destinations</p><h2 className="text-4xl md:text-5xl">Where would you like to go?</h2></div><Link to="/destinations" className="link-arrow">All destinations <Arrow /></Link></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{destinations.map((d) => <DestinationCard key={d.slug} d={d} tourCount={tourCount(d.slug)} />)}</div>
        </div>
      </section>

      <section className="bg-base-100 py-16 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-2">Featured tours</p><h2 className="text-4xl md:text-5xl">Trips we love planning</h2></div><Link to="/tours" className="link-arrow">All tours <Arrow /></Link></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
          <p className="mt-6 text-sm text-muted">All prices are illustrative, per person, in US dollars.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="wrap">
          <p className="eyebrow mb-2">Travel experiences</p>
          <h2 className="text-4xl md:text-5xl">Choose how you like to travel</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e) => (
              <li key={e.cat}>
                <Link to={`/tours?cat=${encodeURIComponent(e.cat)}`} className="group relative block overflow-hidden rounded-[0.625rem] bg-neutral text-white">
                  <Photo name={e.img} sizes="(min-width: 1024px) 380px, 50vw" className="aspect-[16/10] w-full opacity-90 transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-14"><span className="block font-display text-2xl">{e.cat}</span><span className="text-sm text-white/90">{e.text}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-content md:py-24">
        <div className="wrap on-dark grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow !text-[#f3b9a3]">Why travel with us</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Trips planned around you</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {benefits.map(([t, d]) => <li key={t}><h3 className="font-sans text-lg font-bold tracking-normal">{t}</h3><p className="mt-1 text-primary-content/80">{d}</p></li>)}
            </ul>
          </div>
          <Photo name="lounge" alt="A bright sitting room with a grey sofa and teal cushions" sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-[0.625rem]" />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="wrap">
          <h2 className="text-4xl md:text-5xl">Words from travellers</h2>
          <p className="mt-3 text-sm text-muted">Illustrative sample testimonials written for this demonstration. They are not verified reviews.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.trip} className="surface flex flex-col p-6">
                <p className="flex-1 text-lg leading-relaxed">“{t.text}”</p>
                <p className="mt-5 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-sage font-bold text-primary" aria-hidden="true">{t.name.slice(-1)}</span><span><span className="block font-bold">{t.name}</span><span className="text-sm text-muted">{t.trip}</span></span></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-base-100 py-16 md:py-24">
        <div className="wrap">
          <div className="mb-10"><p className="eyebrow mb-2">Travel inspiration</p><h2 className="text-4xl md:text-5xl">Guides and ideas</h2></div>
          <div className="grid gap-8 md:grid-cols-3">
            {guides.map((g) => (
              <article key={g.title} className="group">
                <Link to={g.to} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-[0.625rem]"><Photo name={g.img} sizes="(min-width: 768px) 380px, 100vw" className="aspect-[3/2] w-full transition duration-700 group-hover:scale-105" /></Link>
                <h3 className="mt-4 text-2xl"><Link to={g.to} className="hover:text-accent">{g.title}</Link></h3>
                <p className="mt-2 text-muted">{g.text}</p>
                <Link to={g.to} className="link-arrow mt-3">Read the destination guide <Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-neutral py-16 text-neutral-content md:py-24">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div><h2 className="max-w-xl text-4xl text-white md:text-5xl">Tell us where you dream of going.</h2><p className="mt-3 max-w-md text-neutral-content/75">Share a few details and a planner will suggest a trip that fits. This is a demonstration enquiry: nothing is sent.</p></div>
          <Link to="/plan" className="btn btn-accent btn-lg">Plan your trip <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
