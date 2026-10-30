import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { photo, widths } from '../data/images.js';
import { destinationBySlug } from '../data/destinations.js';
import { tourDays, money, CURRENCY } from '../data/tours.js';
import { Clock, Pin, Close, Prev, Next } from './Icons.jsx';

export function Photo({ name, alt = '', className = '', pos = '50% 50%', sizes = '100vw', eager = false }) {
  const p = photo(name);
  const w = widths[name];
  return (
    <img src={p.src} srcSet={w ? `${p.src} ${w[0]}w, ${p.large} ${w[1]}w` : undefined} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
      className={`object-cover ${className}`} style={{ objectPosition: pos }} />
  );
}

export const PageHeader = ({ title, children, eyebrow }) => (
  <section className="border-b border-line bg-base-100">
    <div className="wrap py-12 md:py-16">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-4xl md:text-6xl">{title}</h1>
      {children && <p className="lede mt-4">{children}</p>}
    </div>
  </section>
);

export function DestinationCard({ d, tourCount }) {
  return (
    <Link to={`/destinations/${d.slug}`} className="group relative block overflow-hidden rounded-[0.625rem] bg-neutral focus-visible:outline-offset-4">
      <Photo name={d.img} alt={d.alt} pos={d.pos} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5 pt-20 text-white">
        <p className="text-sm font-semibold text-white/85">{d.country}</p>
        <h3 className="text-3xl">{d.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/90">{d.tagline}</p>
        {tourCount != null && <p className="mt-3 text-sm font-semibold underline-offset-4 group-hover:underline">{tourCount} {tourCount === 1 ? 'tour' : 'tours'} available</p>}
      </div>
    </Link>
  );
}

export function TourCard({ tour }) {
  const dest = destinationBySlug(tour.destination);
  return (
    <article className="surface group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/tours/${tour.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <Photo name={tour.img} pos={tour.pos} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] w-full transition duration-700 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{tour.cat}</p>
        <h3 className="mt-2 text-2xl leading-tight"><Link to={`/tours/${tour.slug}`} className="hover:text-accent">{tour.title}</Link></h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1"><Pin /> {dest.name}</span>
          <span className="inline-flex items-center gap-1"><Clock /> {tourDays(tour)} days</span>
        </p>
        <p className="mt-3 text-muted">{tour.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">{tour.highlights.slice(0, 2).map((h) => <li key={h} className="tag">{h}</li>)}</ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p><span className="text-sm text-muted">From </span><span className="text-2xl font-bold">{money(tour.price)}</span> <span className="text-sm text-muted">{CURRENCY}</span><span className="block text-xs text-muted">per person, illustrative</span></p>
          <Link to={`/tours/${tour.slug}`} className="btn btn-primary btn-sm h-10">View tour</Link>
        </div>
      </div>
    </article>
  );
}

export const Chips = ({ options, value, onChange, label, all = 'All' }) => (
  <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
    {[all, ...options].map((o) => (
      <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}
        className={`btn btn-sm h-10 rounded-full border-primary px-5 ${value === o ? 'btn-primary' : 'bg-transparent hover:bg-base-300'}`}>{o}</button>
    ))}
  </div>
);

export const EmptyState = ({ title, children, onClear }) => (
  <div className="surface mx-auto max-w-xl border-dashed p-10 text-center">
    <h2 className="text-3xl">{title}</h2>
    <p className="mx-auto mt-3 max-w-sm text-muted">{children}</p>
    {onClear && <button type="button" className="btn btn-primary mt-6" onClick={onClear}>Clear all filters</button>}
  </div>
);

// Photo grid with a keyboard-friendly lightbox built on the native <dialog> element.
export function Gallery({ items }) {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);
  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % items.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, items.length]);
  const cur = open !== null ? items[open] : null;
  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-3">
        {items.map((g, i) => (
          <li key={g.name + i}>
            <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-[0.625rem]" aria-label={`Enlarge photo: ${g.caption}`}>
              <Photo name={g.name} alt={g.alt} pos={g.pos} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] w-full transition duration-500 group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={ref} onClose={() => setOpen(null)} onClick={(e) => e.target === ref.current && setOpen(null)} className="m-auto w-[min(60rem,calc(100%-1.5rem))] rounded-xl bg-neutral p-0 text-neutral-content backdrop:bg-black/80">
        {cur && (
          <div className="relative">
            <Photo name={cur.name} alt={cur.alt} pos={cur.pos} sizes="100vw" eager className="max-h-[75vh] w-full object-contain" />
            <div className="flex items-center justify-between gap-4 p-4">
              <p className="text-sm">{cur.caption}</p>
              <p className="flex shrink-0 items-center gap-1">
                <button type="button" className="btn btn-ghost btn-square btn-sm" aria-label="Previous photo" onClick={() => setOpen((open - 1 + items.length) % items.length)}><Prev /></button>
                <span className="text-sm tabular-nums">{open + 1} / {items.length}</span>
                <button type="button" className="btn btn-ghost btn-square btn-sm" aria-label="Next photo" onClick={() => setOpen((open + 1) % items.length)}><Next /></button>
              </p>
            </div>
            <button type="button" className="btn btn-circle btn-sm absolute right-3 top-3 border-0 bg-black/60 text-white hover:bg-black" aria-label="Close photo" onClick={() => setOpen(null)}><Close /></button>
          </div>
        )}
      </dialog>
    </>
  );
}
