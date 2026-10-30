import { useSearchParams } from 'react-router-dom';
import { Chips, EmptyState, PageHeader, TourCard } from '../components/ui.jsx';
import { Search } from '../components/Icons.jsx';
import { tours, tourCategories, tourDays } from '../data/tours.js';
import { destinations, destinationBySlug } from '../data/destinations.js';
import { matchesTerm, usePageTitle } from '../hooks.js';

const durations = { weekend: ['Up to 4 days', (d) => d <= 4], week: ['5 to 7 days', (d) => d >= 5 && d <= 7], long: ['8 days or more', (d) => d >= 8] };
const prices = { low: ['Under $1,500', (p) => p < 1500], mid: ['$1,500 to $2,500', (p) => p >= 1500 && p <= 2500], high: ['Over $2,500', (p) => p > 2500] };
const sorts = {
  recommended: ['Recommended', (a, b) => Number(!!b.featured) - Number(!!a.featured)],
  priceAsc: ['Price: low to high', (a, b) => a.price - b.price],
  priceDesc: ['Price: high to low', (a, b) => b.price - a.price],
  durAsc: ['Duration: shortest first', (a, b) => tourDays(a) - tourDays(b)],
  durDesc: ['Duration: longest first', (a, b) => tourDays(b) - tourDays(a)],
};

export default function Tours() {
  usePageTitle('Tours', 'Search and filter Landfall\u2019s sample tours by destination, style, duration and illustrative price.');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = tourCategories.includes(params.get('cat')) ? params.get('cat') : 'All';
  const dest = destinationBySlug(params.get('dest')) ? params.get('dest') : '';
  const dur = durations[params.get('dur')] ? params.get('dur') : '';
  const price = prices[params.get('price')] ? params.get('price') : '';
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'recommended';

  const update = (changes) => {
    const next = { q, cat, dest, dur, price, sort, ...changes };
    const sp = new URLSearchParams();
    if (next.q) sp.set('q', next.q);
    if (next.cat !== 'All') sp.set('cat', next.cat);
    if (next.dest) sp.set('dest', next.dest);
    if (next.dur) sp.set('dur', next.dur);
    if (next.price) sp.set('price', next.price);
    if (next.sort !== 'recommended') sp.set('sort', next.sort);
    setParams(sp, { replace: true });
  };

  const term = q.trim().toLowerCase();
  const list = tours
    .filter((t) => (cat === 'All' || t.cat === cat) && (!dest || t.destination === dest)
      && (!dur || durations[dur][1](tourDays(t))) && (!price || prices[price][1](t.price))
      && (!term || matchesTerm([t.title, t.summary, t.cat, destinationBySlug(t.destination).name, destinationBySlug(t.destination).country].join(' '), term)))
    .sort(sorts[sort][1]);
  const filtered = q || cat !== 'All' || dest || dur || price;
  const sel = 'select h-12 w-full border-line bg-base-100';

  return (
    <>
      <PageHeader title="Tours and packages" eyebrow="Tours">Sample trips with day-by-day itineraries. Prices are illustrative, per person, in US dollars.</PageHeader>
      <section className="py-10 md:py-14">
        <div className="wrap">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div className="relative md:col-span-2 lg:col-span-1"><label htmlFor="t-search" className="sr-only">Search tours</label>
              <input id="t-search" type="search" value={q} onChange={(e) => update({ q: e.target.value })} placeholder="Search tours or destinations" className="input h-12 w-full border-line bg-base-100 pr-11" />
              <span className="pointer-events-none absolute right-3 top-3.5 text-muted"><Search /></span></div>
            <div><label htmlFor="t-dest" className="sr-only">Destination</label><select id="t-dest" className={sel} value={dest} onChange={(e) => update({ dest: e.target.value })}><option value="">All destinations</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></div>
            <div><label htmlFor="t-dur" className="sr-only">Duration</label><select id="t-dur" className={sel} value={dur} onChange={(e) => update({ dur: e.target.value })}><option value="">Any duration</option>{Object.entries(durations).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div><label htmlFor="t-price" className="sr-only">Price range</label><select id="t-price" className={sel} value={price} onChange={(e) => update({ price: e.target.value })}><option value="">Any price</option>{Object.entries(prices).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div><label htmlFor="t-sort" className="sr-only">Sort by</label><select id="t-sort" className={sel} value={sort} onChange={(e) => update({ sort: e.target.value })}>{Object.entries(sorts).map(([k, [l]]) => <option key={k} value={k}>Sort: {l}</option>)}</select></div>
          </form>
          <div className="mt-5"><Chips options={tourCategories} value={cat} onChange={(c) => update({ cat: c })} label="Filter by tour category" /></div>
          <p className="my-6 text-muted" role="status">{list.length === 0 ? 'No tours found' : `Showing ${list.length} ${list.length === 1 ? 'tour' : 'tours'}`}</p>
          {list.length === 0 ? (
            <EmptyState title="No tours match your filters" onClear={() => setParams({}, { replace: true })}>Try widening the price or duration, or clear the filters to see every tour.</EmptyState>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((t) => <TourCard key={t.slug} tour={t} />)}</div>
          )}
          {filtered && list.length > 0 && <p className="mt-8"><button type="button" className="link-arrow" onClick={() => setParams({}, { replace: true })}>Clear all filters</button></p>}
        </div>
      </section>
    </>
  );
}
