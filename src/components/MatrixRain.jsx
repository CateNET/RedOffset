import { useEffect, useRef } from 'react';

// Lightweight matrix-style rain canvas. Parent should be position:relative.
const MatrixRain = ({ intensity = 0.6, hue = 0, className = '' }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ cols: 0, ypos: [], width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let running = true;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = Math.max(clientWidth, 320);
      canvas.height = Math.max(clientHeight, 240);
      const fontSize = 14;
      const cols = Math.floor(canvas.width / fontSize);
      stateRef.current = {
        cols,
        ypos: Array(cols).fill(0),
        width: canvas.width,
        height: canvas.height,
        fontSize
      };
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const draw = () => {
      if (!running) return;
      const { cols, ypos, width, height, fontSize } = stateRef.current;
      // Fade the canvas slightly to create trail
      ctx.fillStyle = 'rgba(15, 15, 15, 0.08)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        // Control density with intensity: skip some columns
        if (Math.random() > intensity + 0.15) continue;
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        const x = i * fontSize;
        const y = ypos[i] * fontSize;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${0.6 + Math.random() * 0.4})`;
        ctx.fillText(text, x, y);

        // Random reset for varying stream lengths
        if (y > height && Math.random() > 0.985 - intensity * 0.3) {
          ypos[i] = 0;
        }
        ypos[i] += 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [intensity, hue]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default MatrixRain;

