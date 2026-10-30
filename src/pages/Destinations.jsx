import { useSearchParams } from 'react-router-dom';
import { Chips, DestinationCard, EmptyState, PageHeader } from '../components/ui.jsx';
import { Search } from '../components/Icons.jsx';
import { destinations, regions, travelStyles } from '../data/destinations.js';
import { tours } from '../data/tours.js';
import { matchesTerm, usePageTitle } from '../hooks.js';

export default function Destinations() {
  usePageTitle('Destinations', 'Browse Landfall\u2019s sample destinations by name, region or travel style.');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const region = regions.includes(params.get('region')) ? params.get('region') : 'All';
  const style = travelStyles.includes(params.get('style')) ? params.get('style') : 'All';

  const update = (changes) => {
    const next = { q, region, style, ...changes };
    const sp = new URLSearchParams();
    if (next.q) sp.set('q', next.q);
    if (next.region !== 'All') sp.set('region', next.region);
    if (next.style !== 'All') sp.set('style', next.style);
    setParams(sp, { replace: true });
  };
  const term = q.trim().toLowerCase();
  const list = destinations.filter((d) => (region === 'All' || d.region === region) && (style === 'All' || d.styles.includes(style))
    && (!term || matchesTerm([d.name, d.country, d.tagline, ...d.styles].join(' '), term)));

  return (
    <>
      <PageHeader title="Destinations" eyebrow="Explore">Find somewhere that suits the way you like to travel. Search by name, or narrow by region and travel style.</PageHeader>
      <section className="py-10 md:py-14">
        <div className="wrap">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="relative"><label htmlFor="d-search" className="sr-only">Search destinations</label>
              <input id="d-search" type="search" value={q} onChange={(e) => update({ q: e.target.value })} placeholder="Search destinations" className="input h-12 w-full border-line bg-base-100 pr-11" />
              <span className="pointer-events-none absolute right-3 top-3.5 text-muted"><Search /></span></div>
            <div><label htmlFor="d-region" className="sr-only">Region</label>
              <select id="d-region" className="select h-12 w-full border-line bg-base-100" value={region} onChange={(e) => update({ region: e.target.value })}><option value="All">All regions</option>{regions.map((r) => <option key={r}>{r}</option>)}</select></div>
          </form>
          <div className="mt-5"><Chips options={travelStyles} value={style} onChange={(s) => update({ style: s })} label="Filter by travel style" /></div>
          <p className="my-6 text-muted" role="status">{list.length === 0 ? 'No destinations found' : `Showing ${list.length} ${list.length === 1 ? 'destination' : 'destinations'}`}</p>
          {list.length === 0 ? (
            <EmptyState title="No destinations match" onClear={() => setParams({}, { replace: true })}>Try a different word, or remove a filter to see everything again.</EmptyState>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DestinationCard key={d.slug} d={d} tourCount={tours.filter((t) => t.destination === d.slug).length} />)}</div>
          )}
        </div>
      </section>
    </>
  );
}
