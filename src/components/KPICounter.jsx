import { useEffect, useRef, useState } from 'react';

const KPICounter = ({ from = 0, to = 100, duration = 1200, suffix = '', className = '' }) => {
  const [val, setVal] = useState(from);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    startRef.current = start;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [from, to, duration]);

  return <span className={className}>{val}{suffix}</span>;
};

export default KPICounter;

