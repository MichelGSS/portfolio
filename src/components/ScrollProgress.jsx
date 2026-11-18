import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        boxShadow: '0 0 14px rgba(var(--accent-rgb), 0.65)',
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-[var(--accent-hex)] pointer-events-none"
    />
  );
};

export default ScrollProgress;
