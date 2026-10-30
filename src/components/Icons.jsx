const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
export const Search = (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.500 4.500" /></svg>;
export const Menu = () => <svg {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const Close = () => <svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Arrow = () => <svg {...base} width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Prev = () => <svg {...base}><path d="M15 5l-7 7 7 7" /></svg>;
export const Next = () => <svg {...base}><path d="M9 5l7 7-7 7" /></svg>;
export const Check = (p) => <svg {...base} {...p}><path d="M5 12.500l4.500 4.500L19 7.500" /></svg>;
export const X = (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Clock = () => <svg {...base} width="16" height="16"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const Pin = () => <svg {...base} width="16" height="16"><path d="M12 21s7-6.200 7-11.500a7 7 0 10-14 0C5 14.800 12 21 12 21z" /><circle cx="12" cy="9.500" r="2.500" /></svg>;
export const Users = () => <svg {...base} width="16" height="16"><circle cx="9" cy="8" r="3.500" /><path d="M2.500 20a6.500 6.500 0 0113 0M16 4.500a3.500 3.500 0 010 7M18 14a6.500 6.500 0 013.500 6" /></svg>;
export const Mark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" fill="var(--color-primary)" />
    <path d="M6 21h20" stroke="#f6f1e7" strokeWidth="2.500" strokeLinecap="round" />
    <path d="M10 21a6 6 0 0 1 12 0" fill="#e07a5c" />
    <path d="M9 25h14" stroke="#f6f1e7" strokeWidth="2" strokeLinecap="round" opacity=".6" />
  </svg>
);
