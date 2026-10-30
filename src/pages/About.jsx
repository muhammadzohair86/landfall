import { Link } from 'react-router-dom';
import { PageHeader, Photo } from '../components/ui.jsx';
import { Arrow } from '../components/Icons.jsx';
import { portrait } from '../data/images.js';
import { team, benefits } from '../data/site.js';
import { usePageTitle } from '../hooks.js';

const steps = [['Listen', 'We start with a conversation about how you like to travel, who is coming and what you hope to feel.'], ['Plan', 'A planner drafts a day-by-day itinerary with one highlight a day and space to wander.'], ['Refine', 'We adjust the pace, the stays and the activities until it feels right.'], ['Travel', 'You go, and a named planner stays reachable in case plans need to change.']];

export default function About() {
  usePageTitle('About', 'About Landfall, a fictional travel company built around thoughtful itineraries and personal planning.');
  return (
    <>
      <PageHeader title="Travel that leaves room to wander" eyebrow="About Landfall">Landfall is a fictional travel company created to demonstrate a premium travel website. This is the kind of approach it would take.</PageHeader>
      <section className="py-14 md:py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Photo name="iceland" alt="A bather in a milky-blue geothermal lagoon" pos="50% 60%" sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-[0.625rem]" />
          <div className="max-w-[60ch]">
            <h2 className="text-3xl md:text-4xl">Our travel philosophy</h2>
            <p className="mt-4 text-lg leading-relaxed">The best trips are rarely the most packed. We believe a good itinerary has a rhythm: a highlight to look forward to, some unplanned time and enough rest to enjoy both.</p>
            <p className="mt-4 text-lg leading-relaxed">That is why every trip we design is personal. We ask before we suggest, favour small groups and local guides, and always leave space for the detour you did not know you wanted.</p>
            <Link to="/plan" className="link-arrow mt-6">Plan your trip <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-14 md:py-20">
        <div className="wrap">
          <h2 className="text-3xl md:text-4xl">How planning works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {steps.map(([t, d], i) => <li key={t} className="border-t-2 border-primary pt-4"><span className="font-display text-3xl text-accent">{i + 1}</span><h3 className="mt-1 text-2xl">{t}</h3><p className="mt-2 text-muted">{d}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div><h2 className="text-3xl md:text-4xl">What you can expect</h2><ul className="mt-6 grid gap-5">{benefits.map(([t, d]) => <li key={t}><h3 className="font-sans text-lg font-bold tracking-normal">{t}</h3><p className="text-muted">{d}</p></li>)}</ul></div>
          <div>
            <h2 className="text-3xl md:text-4xl">Meet the team</h2>
            <p className="mt-2 text-sm text-muted">Sample team profiles for this demonstration. Portraits are stock photography.</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {team.map((m, i) => <li key={i}><img src={portrait(m.img)} alt={`Portrait of a ${m.role.toLowerCase()}`} loading="lazy" className="aspect-square w-full rounded-[0.625rem] object-cover" /><p className="mt-3 text-lg font-bold">{m.name}</p><p className="text-sm text-muted">{m.role}</p></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
