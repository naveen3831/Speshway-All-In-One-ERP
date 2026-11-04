import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures that every page transition (or direct navigation)
 * scrolls immediately to the top of the viewport (0, 0).
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Instantly scroll window and root containers to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;

