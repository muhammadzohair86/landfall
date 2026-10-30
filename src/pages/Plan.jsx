import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui.jsx';
import { Check } from '../components/Icons.jsx';
import { destinations } from '../data/destinations.js';
import { tours, tourBySlug } from '../data/tours.js';
import { destinationBySlug } from '../data/destinations.js';
import { todayISO, usePageTitle } from '../hooks.js';

const budgets = ['Under $1,500 per person', '$1,500 to $2,500 per person', '$2,500 to $4,000 per person', 'Over $4,000 per person', 'Not sure yet'];
const blank = { name: '', email: '', phone: '', interest: '', start: '', end: '', people: '2', budget: '', notes: '' };

const interestLabel = (v) => {
  if (v.startsWith('tour:')) return tourBySlug(v.slice(5))?.title;
  if (v.startsWith('dest:')) return destinationBySlug(v.slice(5))?.name;
  return v === 'open' ? 'Not sure yet' : '';
};
const fmtDate = (iso) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '');

function validate(v, today) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your full name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Please enter an email address like name@example.com.';
  if (v.phone.trim() && !/^\+?[\d\s()-]{7,}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number, or leave this blank.';
  if (!v.interest) e.interest = 'Please choose a tour or destination, or "Not sure yet".';
  if (!v.start) e.start = 'Please choose a departure date.';
  else if (v.start < today) e.start = 'Your departure date cannot be in the past.';
  if (!v.end) e.end = 'Please choose a return date.';
  else if (v.start && v.end < v.start) e.end = 'Your return date must be on or after your departure date.';
  const n = Number(v.people);
  if (!Number.isInteger(n) || n < 1 || n > 20) e.people = 'Please enter a whole number of travellers from 1 to 20.';
  if (!v.budget) e.budget = 'Please choose a budget range.';
  if (v.notes.length > 1000) e.notes = 'Please keep additional requirements under 1,000 characters.';
  return e;
}

export default function Plan() {
  usePageTitle('Plan your trip', 'Send a demonstration trip enquiry to Landfall. Nothing is sent or stored.');
  const [params] = useSearchParams();
  const today = todayISO();
  const pre = params.get('tour') && tourBySlug(params.get('tour')) ? `tour:${params.get('tour')}` : params.get('destination') && destinationBySlug(params.get('destination')) ? `dest:${params.get('destination')}` : '';
  const [v, setV] = useState({ ...blank, interest: pre });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form');
  const summaryRef = useRef(null);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const count = Object.keys(errors).length;

  useEffect(() => {
    if (step !== 'sending') return undefined;
    const t = setTimeout(() => setStep('done'), 1100);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (count) summaryRef.current?.focus();
  }, [count]);

  const review = (e) => {
    e.preventDefault();
    const found = validate(v, today);
    setErrors(found);
    if (Object.keys(found).length === 0) { setStep('review'); window.scrollTo({ top: 0, behavior: 'instant' }); }
  };
  const reset = () => { setV(blank); setErrors({}); setStep('form'); };

  const a11y = (k) => ({ id: k, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const border = (k) => (errors[k] ? 'border-error' : 'border-line');
  const field = (k, label, control, hint) => (
    <div className="field">
      <label htmlFor={k}>{label}</label>
      {control}
      {hint && !errors[k] && <p className="mt-1 text-sm text-muted">{hint}</p>}
      {errors[k] && <p className="error-text" id={`${k}-err`}>{errors[k]}</p>}
    </div>
  );
  const input = 'input h-12 w-full bg-base-100';
  const summary = [
    ['Name', v.name], ['Email', v.email], ['Phone', v.phone || 'Not provided'], ['Interested in', interestLabel(v.interest)],
    ['Departure', fmtDate(v.start)], ['Return', fmtDate(v.end)], ['Travellers', v.people], ['Budget', v.budget], ['Requirements', v.notes || 'None'],
  ];

  return (
    <>
      <PageHeader title="Plan your trip" eyebrow="Trip enquiry">Tell us a little about the trip you have in mind. A planner would reply with ideas within two working days. This is a demonstration, so nothing is actually sent.</PageHeader>
      <section className="py-10 md:py-14">
        <div className="wrap max-w-3xl">
          <ol className="mb-8 flex gap-2 text-sm font-semibold" aria-label="Progress">
            {[['form', 'Your details'], ['review', 'Review'], ['done', 'Done']].map(([k, l], i) => {
              const order = { form: 0, review: 1, sending: 1, done: 2 }[step];
              return <li key={k} aria-current={order === i ? 'step' : undefined} className={`flex-1 border-t-4 pt-2 ${order >= i ? 'border-primary text-primary' : 'border-line text-muted'}`}>{i + 1}. {l}</li>;
            })}
          </ol>

          {step === 'form' && (
            <form onSubmit={review} noValidate className="surface grid gap-x-5 p-6 sm:grid-cols-2 md:p-8">
              {count > 0 && (
                <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-5 rounded-lg bg-error/10 p-4 text-sm font-semibold text-error sm:col-span-2">Please fix the {count} highlighted {count === 1 ? 'field' : 'fields'} below.</div>
              )}
              {field('name', 'Full name', <input type="text" autoComplete="name" className={`${input} ${border('name')}`} {...a11y('name')} />)}
              {field('email', 'Email', <input type="email" autoComplete="email" className={`${input} ${border('email')}`} {...a11y('email')} />)}
              {field('phone', 'Phone (optional)', <input type="tel" autoComplete="tel" className={`${input} ${border('phone')}`} {...a11y('phone')} />)}
              {field('interest', 'Interested in', (
                <select className={`select h-12 w-full bg-base-100 ${border('interest')}`} {...a11y('interest')}>
                  <option value="">Choose a tour or destination</option>
                  <optgroup label="Sample tours">{tours.map((t) => <option key={t.slug} value={`tour:${t.slug}`}>{t.title}</option>)}</optgroup>
                  <optgroup label="Destinations">{destinations.map((d) => <option key={d.slug} value={`dest:${d.slug}`}>{d.name}</option>)}</optgroup>
                  <option value="open">Not sure yet</option>
                </select>
              ))}
              {field('start', 'Departure date', <input type="date" min={today} className={`${input} ${border('start')}`} {...a11y('start')} />)}
              {field('end', 'Return date', <input type="date" min={v.start || today} className={`${input} ${border('end')}`} {...a11y('end')} />, 'On or after your departure date.')}
              {field('people', 'Number of travellers', <input type="number" min="1" max="20" inputMode="numeric" className={`${input} ${border('people')}`} {...a11y('people')} />)}
              {field('budget', 'Budget range', (
                <select className={`select h-12 w-full bg-base-100 ${border('budget')}`} {...a11y('budget')}><option value="">Choose a range</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
              ))}
              <div className="sm:col-span-2">{field('notes', 'Additional requirements (optional)', <textarea rows="5" className={`textarea w-full bg-base-100 ${border('notes')}`} {...a11y('notes')} />, 'Mobility needs, dietary requirements, celebrations, anything that helps.')}</div>
              <div className="sm:col-span-2"><button type="submit" className="btn btn-primary btn-lg">Review your enquiry</button></div>
            </form>
          )}

          {(step === 'review' || step === 'sending') && (
            <div className="surface p-6 md:p-8">
              <h2 className="text-3xl">Check your details</h2>
              <p className="mt-2 text-muted">Demonstration only: when you continue, nothing is emailed or stored.</p>
              <dl className="mt-6 divide-y divide-line">
                {summary.map(([k, val]) => <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]"><dt className="font-bold text-muted">{k}</dt><dd className="break-words">{val}</dd></div>)}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn border-primary bg-transparent" onClick={() => setStep('form')} disabled={step === 'sending'}>Edit details</button>
                <button type="button" className="btn btn-accent" onClick={() => setStep('sending')} disabled={step === 'sending'}>
                  {step === 'sending' ? <><span className="loading loading-spinner loading-sm" aria-hidden="true" /> Sending demo enquiry</> : 'Send enquiry (demo)'}
                </button>
              </div>
              <p className="sr-only" role="status">{step === 'sending' ? 'Sending demonstration enquiry' : ''}</p>
            </div>
          )}

          {step === 'done' && (
            <div className="surface p-8 md:p-10" role="status">
              <span className="mb-4 grid size-12 place-items-center rounded-full bg-accent text-accent-content"><Check /></span>
              <h2 className="text-4xl">Thank you, {v.name.trim().split(' ')[0]}.</h2>
              <p className="mt-3 max-w-xl text-lg">This was a demonstration, so no enquiry has been sent, saved or emailed, and no booking or payment was made. On a live website a planner would now reply to {v.email}.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link to="/tours" className="btn btn-primary">Browse more tours</Link><button type="button" className="btn border-primary bg-transparent" onClick={reset}>Start another enquiry</button></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
