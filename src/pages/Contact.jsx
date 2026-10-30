import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui.jsx';
import { Check } from '../components/Icons.jsx';
import { site } from '../data/site.js';
import { usePageTitle } from '../hooks.js';

const empty = { name: '', email: '', message: '' };

export default function Contact() {
  usePageTitle('Contact', 'Contact Landfall. This form is a demonstration and sends nothing.');
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!v.name.trim()) found.name = 'Please enter your name.';
    if (!v.email.trim()) found.email = 'Please enter your email address.';
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) found.email = 'Please enter an email address like name@example.com.';
    if (v.message.trim().length < 10) found.message = 'Please write at least 10 characters.';
    setErrors(found);
    if (Object.keys(found).length) { document.querySelector('main form [aria-invalid="true"]')?.focus(); return; }
    setSent(true); // demonstration only: nothing is sent or stored
  };
  const a11y = (k) => ({ id: k, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const border = (k) => (errors[k] ? 'border-error' : 'border-line');
  const field = (k, label, control) => (<div className="field mb-5"><label htmlFor={k}>{label}</label>{control}{errors[k] && <p className="error-text" id={`${k}-err`}>{errors[k]}</p>}</div>);

  return (
    <>
      <PageHeader title="Contact us" eyebrow="Contact">Questions before you plan? Send us a note. For a full trip enquiry, use the trip planner.</PageHeader>
      <section className="py-12 md:py-16">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="max-w-md">
            <h2 className="text-3xl">Get in touch</h2>
            <dl className="mt-5 grid gap-4">
              <div><dt className="text-sm font-bold text-muted">Email</dt><dd><a className="font-semibold text-accent hover:underline" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt className="text-sm font-bold text-muted">Phone</dt><dd>{site.phone}</dd></div>
              <div><dt className="text-sm font-bold text-muted">Hours</dt><dd>{site.hours}</dd></div>
            </dl>
            <p className="mt-5 rounded-lg bg-sage p-3 text-sm">These details are placeholders and the form is a demonstration that does not send anything. Landfall is a fictional company and has no office address.</p>
            <Link to="/plan" className="btn btn-primary mt-6">Plan your trip instead</Link>
          </div>
          {sent ? (
            <div className="surface p-8" role="status">
              <span className="mb-3 grid size-11 place-items-center rounded-full bg-accent text-accent-content"><Check /></span>
              <h2 className="text-3xl">Thank you, {v.name.trim().split(' ')[0]}.</h2>
              <p className="mt-3 max-w-md text-muted">On a live website your message would now be on its way. This demonstration does not send or store anything.</p>
              <button type="button" className="btn mt-6 border-primary bg-transparent" onClick={() => { setV(empty); setErrors({}); setSent(false); }}>Write another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="surface p-6 md:p-8">
              <div className="grid gap-x-5 sm:grid-cols-2">
                {field('name', 'Name', <input type="text" autoComplete="name" className={`input h-12 w-full bg-base-100 ${border('name')}`} {...a11y('name')} />)}
                {field('email', 'Email', <input type="email" autoComplete="email" className={`input h-12 w-full bg-base-100 ${border('email')}`} {...a11y('email')} />)}
              </div>
              {field('message', 'Message', <textarea rows="6" className={`textarea w-full bg-base-100 ${border('message')}`} {...a11y('message')} />)}
              <button type="submit" className="btn btn-primary btn-lg">Send message</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
