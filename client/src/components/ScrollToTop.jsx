import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  const shouldScroll = useSelector((state) => state.scroll.shouldScroll);

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname, shouldScroll]);

  return null;
};

export default ScrollToTop;
