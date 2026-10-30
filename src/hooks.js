import { useEffect } from 'react';

export const usePageTitle = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} | Landfall` : 'Landfall | Thoughtful trips to places that stay with you';
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
};

export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Whole-word prefix search: "cape" matches "Cape Town" but not "landscapes".
export const matchesTerm = (text, term) => {
  const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return term.toLowerCase().split(/\s+/).filter(Boolean).every((tok) => words.some((w) => w.startsWith(tok)));
};
