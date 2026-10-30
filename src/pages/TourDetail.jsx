import { Link, useParams } from 'react-router-dom';
import { Gallery, Photo, TourCard } from '../components/ui.jsx';
import { Check, Clock, Pin, Users, X } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';
import { tourBySlug, tours, tourDays, money, CURRENCY } from '../data/tours.js';
import { destinationBySlug } from '../data/destinations.js';
import { moments } from '../data/images.js';
import { usePageTitle } from '../hooks.js';

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tourBySlug(slug);
  usePageTitle(tour ? tour.title : 'Tour not found', tour?.summary);
  if (!tour) return <NotFound />;

  const dest = destinationBySlug(tour.destination);
  const days = tourDays(tour);
  const related = tours.filter((t) => t.slug !== tour.slug).sort((a, b) => (Number(b.destination === tour.destination) * 2 + Number(b.cat === tour.cat)) - (Number(a.destination === tour.destination) * 2 + Number(a.cat === tour.cat))).slice(0, 3);
  const gallery = dest.gallery.map((name, i) => (i === 0 ? { name, alt: dest.alt, pos: dest.pos, caption: `${dest.name}` } : { name, alt: moments[name].alt, pos: '50% 50%', caption: moments[name].caption }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral text-white">
        <Photo name={tour.img} alt={`${tour.title}: ${dest.alt}`} pos={tour.pos} eager className="absolute inset-0 -z-20 size-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="wrap pb-12 pt-36 md:pb-16 md:pt-52">
          <p className="mb-4 text-sm font-semibold"><Link to="/tours" className="underline-offset-4 hover:underline">Tours</Link> <span aria-hidden="true">/</span> {tour.cat}</p>
          <h1 className="max-w-3xl text-5xl md:text-6xl">{tour.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/95">
            <Link to={`/destinations/${dest.slug}`} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"><Pin /> {dest.name}, {dest.country.startsWith('Location') ? 'location confirmed with you' : dest.country}</Link>
            <span className="inline-flex items-center gap-1.5"><Clock /> {days} days, {tour.nights} nights</span>
            <span className="rounded-full bg-white/15 px-3 py-0.5 text-sm font-semibold">{tour.cat}</span>
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <div className="min-w-0">
            <p className="max-w-[65ch] text-xl leading-relaxed">{tour.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">{tour.highlights.map((h) => <li key={h} className="tag">{h}</li>)}</ul>

            <h2 className="mb-5 mt-14 text-3xl md:text-4xl">Day-by-day itinerary</h2>
            <div className="grid gap-3">
              {tour.itinerary.map((d, i) => (
                <details key={d.title} open={i === 0} className="surface group">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-content" aria-hidden="true">{i + 1}</span>
                    <span><span className="block text-xs font-bold uppercase tracking-wider text-muted">Day {i + 1}</span><span className="font-display text-xl">{d.title}</span></span>
                  </summary>
                  <p className="px-5 pb-5 pl-[4.5rem] text-muted">{d.text}</p>
                </details>
              ))}
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="surface p-6"><h2 className="text-2xl">Included</h2><ul className="mt-4 grid gap-2.5">{tour.included.map((x) => <li key={x} className="flex gap-3"><span className="mt-1 text-success"><Check width="18" height="18" /></span>{x}</li>)}</ul></div>
              <div className="surface p-6"><h2 className="text-2xl">Not included</h2><ul className="mt-4 grid gap-2.5">{tour.excluded.map((x) => <li key={x} className="flex gap-3"><span className="mt-1 text-error"><X width="18" height="18" /></span>{x}</li>)}</ul></div>
            </div>

            <h2 className="mb-4 mt-14 text-3xl md:text-4xl">Good to know</h2>
            <ul className="list-disc space-y-2 pl-5 text-lg">{tour.info.map((x) => <li key={x}>{x}</li>)}</ul>

            <h2 className="mb-6 mt-14 text-3xl md:text-4xl">Photos</h2>
            <Gallery items={gallery} />
            <p className="mt-4 text-sm text-muted">Select a photo to enlarge it. Supporting images are illustrative.</p>
          </div>

          <aside aria-label="Tour summary" className="surface p-6 max-lg:order-first lg:sticky lg:top-24">
            <p className="text-sm text-muted">From</p>
            <p className="text-4xl font-bold">{money(tour.price)} <span className="text-lg font-normal text-muted">{CURRENCY}</span></p>
            <p className="text-sm text-muted">per person, illustrative price</p>
            <Link to={`/plan?tour=${tour.slug}`} className="btn btn-accent btn-lg mt-5 w-full">Plan this trip</Link>
            <ul className="mt-6 grid gap-3 border-t border-line pt-5 text-sm">
              <li className="flex items-center gap-2"><Clock /> {days} days, {tour.nights} nights</li>
              <li className="flex items-center gap-2"><Users /> Sample group size: up to {tour.group} travellers</li>
              <li className="flex items-center gap-2"><Pin /> {dest.name}</li>
            </ul>
            <p className="mt-5 rounded-lg bg-sage p-3 text-xs">Demonstration only: there are no confirmed departure dates, live availability or real bookings. An enquiry sends nothing.</p>
          </aside>
        </div>
      </section>

      <section className="bg-base-100 py-12 md:py-16">
        <div className="wrap">
          <h2 className="mb-8 text-3xl md:text-4xl">You might also like</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
        </div>
      </section>
    </>
  );
}
