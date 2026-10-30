import { PageHeader } from '../components/ui.jsx';
import { usePageTitle } from '../hooks.js';

export default function Credits() {
  usePageTitle('Credits');
  const li = 'py-5';
  const h = 'block font-display text-xl';
  return (
    <>
      <PageHeader title="Credits" eyebrow="Landfall">Third-party material used on this website.</PageHeader>
      <section className="py-12">
        <ul className="wrap max-w-2xl divide-y divide-line border-y border-line text-lg">
          <li className={li}><strong className={h}>Photography</strong>Sample photography from the Hepta template by <a className="font-semibold text-accent underline" href="https://free-template.co/" target="_blank" rel="noopener noreferrer">Free-Template.co</a>. Images are illustrative and may not show the places named alongside them.</li>
          <li className={li}><strong className={h}>Typefaces</strong>DM Serif Display and Source Sans 3, used under the SIL Open Font License 1.1.</li>
          <li className={li}><strong className={h}>Interface toolkit</strong>Tailwind CSS and daisyUI, both released under the MIT licence.</li>
        </ul>
      </section>
    </>
  );
}
