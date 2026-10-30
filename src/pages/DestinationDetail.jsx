import { Link, useParams } from 'react-router-dom';
import { Gallery, Photo, TourCard } from '../components/ui.jsx';
import { Arrow, Check, Clock, Pin } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import { destinationBySlug } from '../data/destinations.js';
import { moments } from '../data/images.js';
import { tours } from '../data/tours.js';
import { usePageTitle } from '../hooks.js';

export default function DestinationDetail() {
  const { slug } = useParams();
  const d = destinationBySlug(slug);
  usePageTitle(d ? d.name : 'Destination not found', d?.tagline);
  if (!d) return <NotFound />;

  const list = tours.filter((t) => t.destination === d.slug);
  const gallery = d.gallery.map((name, i) => (i === 0
    ? { name, alt: d.alt, pos: d.pos, caption: `${d.name}: ${d.tagline}` }
    : { name, alt: moments[name].alt, pos: '50% 50%', caption: moments[name].caption }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral text-white">
        <Photo name={d.img} alt={d.alt} pos={d.pos} eager className="absolute inset-0 -z-20 size-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="wrap pb-12 pt-40 md:pb-16 md:pt-56">
          <p className="mb-4 text-sm font-semibold"><Link to="/destinations" className="underline-offset-4 hover:underline">Destinations</Link> <span aria-hidden="true">/</span> {d.name}</p>
          <h1 className="text-5xl md:text-7xl">{d.name}</h1>
          <p className="mt-2 text-lg text-white/90">{d.country}</p>
          <p className="mt-4 max-w-xl text-xl text-white/95">{d.tagline}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl">Overview</h2>
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed">{d.overview}</p>
            <h2 className="mb-5 mt-12 text-3xl md:text-4xl">Key experiences</h2>
            <ul className="grid gap-4 sm:grid-cols-2">{d.attractions.map(([t, x]) => <li key={t} className="surface p-5"><h3 className="font-sans text-lg font-bold tracking-normal">{t}</h3><p className="mt-1 text-muted">{x}</p></li>)}</ul>
            <h2 className="mb-4 mt-12 text-3xl md:text-4xl">Travel tips</h2>
            <ul className="grid gap-3">{d.tips.map((t) => <li key={t} className="flex gap-3"><span className="mt-1 text-primary"><Check width="18" height="18" /></span>{t}</li>)}</ul>
          </div>
          <aside aria-label="At a glance" className="surface h-fit p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl">At a glance</h2>
            <dl className="mt-4 grid gap-4">
              <div><dt className="flex items-center gap-1.5 text-sm font-bold text-muted"><Clock /> Suggested duration</dt><dd className="mt-0.5">{d.duration}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-sm font-bold text-muted"><Pin /> Best time to visit</dt><dd className="mt-0.5">{d.bestTime}</dd></div>
              <div><dt className="text-sm font-bold text-muted">Travel styles</dt><dd className="mt-1 flex flex-wrap gap-1.5">{d.styles.map((s) => <span key={s} className="tag">{s}</span>)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-muted">Travel information is illustrative. Your planner will confirm details for your dates.</p>
            <Link to={`/plan?destination=${d.slug}`} className="btn btn-accent mt-5 w-full">Plan a trip to {d.name}</Link>
          </aside>
        </div>
      </section>

      <section className="bg-base-100 py-12 md:py-16">
        <div className="wrap">
          <h2 className="mb-8 text-3xl md:text-4xl">Tours in {d.name}</h2>
          {list.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TourCard key={t.slug} tour={t} />)}</div> : <p className="text-muted">No sample tours yet. Send an enquiry and we will design one for you.</p>}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="wrap">
          <h2 className="mb-6 text-3xl md:text-4xl">Photo gallery</h2>
          <Gallery items={gallery} />
          <p className="mt-4 text-sm text-muted">Select a photo to enlarge it. Supporting images are illustrative and may not show {d.name}.</p>
        </div>
      </section>

      <section className="on-dark bg-primary py-14 text-primary-content">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-lg text-3xl md:text-4xl">Thinking about {d.name}?</h2>
          <Link to={`/plan?destination=${d.slug}`} className="btn btn-accent btn-lg">Send an enquiry <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
