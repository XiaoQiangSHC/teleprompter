import { useState, useEffect } from 'react';

export const useWindowFocus = () => {
  const [isWindowActive, setIsWindowActive] = useState(document.hasFocus());

  useEffect(() => {
    const handleFocus = () => setIsWindowActive(true);
    const handleBlur = () => setIsWindowActive(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isWindowActive;
}; 