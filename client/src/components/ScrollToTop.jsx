import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname, shouldScroll]);

  return null;
};

export default ScrollToTop;
