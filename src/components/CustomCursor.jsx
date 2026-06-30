import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hovering =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
      hoverRef.current = hovering;
    };

    const update = () => {
      const { x, y } = posRef.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        dotRef.current.style.opacity = hoverRef.current ? '0' : '1';
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
      }
      rafRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ willChange: 'transform', transition: 'transform 0.15s ease-out' }}
      />
    </>
  );
};

export default CustomCursor;
