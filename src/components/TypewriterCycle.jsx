import { useEffect, useRef, useState } from 'react';

const TypewriterCycle = ({ phrases, typingSpeed = 80, pause = 1500 }) => {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = phrases[index % phrases.length];

    const handleTyping = () => {
      if (!deleting) {
        if (display.length < currentPhrase.length) {
          setDisplay(currentPhrase.slice(0, display.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          timeoutRef.current = setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (display.length > 0) {
          setDisplay(currentPhrase.slice(0, display.length - 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed / 1.6);
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [display, deleting, index, pause, phrases, typingSpeed]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <span className="font-mono text-base text-zinc-300">
      {display}
      <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-ember" aria-hidden="true" />
    </span>
  );
};

export default TypewriterCycle;
