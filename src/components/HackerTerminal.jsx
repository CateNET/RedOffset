import { useEffect, useRef, useState } from 'react';

// Props
// - lines: array of strings to type
// - playKey: number to restart typing when changed
// - onComplete: callback when all lines have been printed
// - title: string shown in the window header
// - compact: render with smaller paddings/fonts
const HackerTerminal = ({ lines = [], playKey = 0, onComplete, title = 'RedOffset Terminal', compact = false }) => {
  const [output, setOutput] = useState('');
  const [idx, setIdx] = useState(0);
  const [line, setLine] = useState('');
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // restart typing when reset key changes
    setOutput('');
    setIdx(0);
    setLine('');
    setTyping(false);
  }, [playKey]);

  useEffect(() => {
    if (typing) return;
    if (idx >= lines.length) return;
    setTyping(true);
    const text = lines[idx];
    let pos = 0;

    const type = () => {
      pos += 1;
      const nextLine = text.slice(0, pos);
      setLine(nextLine);
      if (pos < text.length) {
        timerRef.current = setTimeout(type, 16 + Math.random() * 30);
      } else {
        setOutput((prev) => (prev ? `${prev}\n${text}` : text));
        setLine('');
        setIdx((v) => v + 1);
        setTyping(false);
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    timerRef.current = setTimeout(type, 180);
    return () => clearTimeout(timerRef.current);
  }, [idx, typing, lines]);

  useEffect(() => {
    if (idx >= lines.length && lines.length > 0 && !typing) {
      onComplete && onComplete();
    }
  }, [idx, lines, typing, onComplete]);

  const printed = output ? output.split('\n') : [];

  return (
    <div
      className={`relative w-full overflow-hidden rounded border border-zinc-900 bg-black/50 ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          {title}
        </span>
      </div>
      <div
        ref={containerRef}
        className={`custom-scrollbar max-h-[36vh] min-h-[160px] space-y-1 overflow-auto ${
          compact ? 'text-xs' : 'text-sm'
        } font-mono leading-relaxed text-zinc-300`}
      >
        {printed.map((l, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {l}
          </p>
        ))}
        {line && (
          <p className="whitespace-pre-wrap">
            {line}
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-ember align-middle" />
          </p>
        )}
        {!line && idx >= lines.length && lines.length > 0 && (
          <p className="text-emerald-400">[✓] Done</p>
        )}
      </div>
    </div>
  );
};

export default HackerTerminal;
