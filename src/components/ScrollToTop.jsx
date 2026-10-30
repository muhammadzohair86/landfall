import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top when the page changes. The effect has a block body, so it returns
// nothing (React treats any returned value as a cleanup function).
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
