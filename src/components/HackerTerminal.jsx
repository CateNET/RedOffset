import { useEffect, useRef, useState } from 'react';

// Simple hacker-style terminal with typewriter effect
// Props:
// - lines: string[]
// - playKey: number (restart typing)
// - onComplete: () => void
// - title: string
// - compact: boolean
// - size: 'default' | 'tall'
// - paused: boolean
const HackerTerminal = ({
  lines = [],
  playKey = 0,
  onComplete,
  title = 'RedOffset Terminal',
  compact = false,
  size = 'default',
  paused = false,
}) => {
  const [output, setOutput] = useState('');
  const [idx, setIdx] = useState(0);
  const [line, setLine] = useState('');
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const watchdogRef = useRef(null);

  // restart typing when playKey changes
  useEffect(() => {
    setOutput('');
    setIdx(0);
    setLine('');
    setTyping(false);
  }, [playKey]);

  // typewriter loop
  useEffect(() => {
    const effective = Array.isArray(lines) ? lines : [];
    if (paused || typing) return;
    if (idx >= effective.length) return;

    const text = effective[idx] ?? '';
    if (typeof text !== 'string' || text.length === 0) {
      setIdx((v) => v + 1);
      return;
    }

    setTyping(true);
    let pos = 0;
    const type = () => {
      pos += 1;
      setLine(text.slice(0, pos));
      if (pos < text.length) {
        timerRef.current = setTimeout(type, 18 + Math.random() * 30);
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
    timerRef.current = setTimeout(type, 140);
    return () => clearTimeout(timerRef.current);
  }, [idx, lines, paused, typing]);

  // watchdog: if nothing typed shortly after mount, print instantly
  useEffect(() => {
    const effective = Array.isArray(lines) ? lines : [];
    if (paused) return;
    if (effective.length === 0) return;
    if (output || typing || idx > 0) return;
    watchdogRef.current = setTimeout(() => {
      if (!output && !typing && idx === 0) {
        setOutput(effective.join('\n'));
      }
    }, 600);
    return () => clearTimeout(watchdogRef.current);
  }, [lines, paused, output, typing, idx]);

  // fire onComplete after finishing
  useEffect(() => {
    const effective = Array.isArray(lines) ? lines : [];
    if (!typing && idx >= effective.length && effective.length > 0) {
      onComplete && onComplete();
    }
  }, [typing, idx, lines, onComplete]);

  const typedLines = output ? output.split('\n') : [];
  // Soft-render fallback so users always see something immediately
  const immediateLines = typedLines.length === 0 && !line
    ? (Array.isArray(lines) ? lines.slice(0, 200) : [])
    : typedLines;

  return (
    <div className={`relative w-full overflow-hidden rounded border border-zinc-900 bg-black/50 ${compact ? 'p-4' : 'p-6'}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">{title}</span>
      </div>
      <div
        ref={containerRef}
        className={`custom-scrollbar ${
          size === 'tall'
            ? 'max-h-[56vh] min-h-[300px] md:min-h-[380px] lg:min-h-[460px]'
            : 'max-h-[36vh] min-h-[160px]'
        } space-y-1 overflow-auto ${compact ? 'text-xs' : 'text-sm'} font-mono leading-relaxed text-zinc-300`}
      >
        {immediateLines.map((l, i) => (
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
        {!line && typedLines.length > 0 && (
          <p className="text-emerald-400">[✓] Done</p>
        )}
      </div>
    </div>
  );
};

export default HackerTerminal;
