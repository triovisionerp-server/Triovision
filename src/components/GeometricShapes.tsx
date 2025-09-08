import { motion } from 'motion/react';

export function GeometricShapes() {
  return (
    <>
      {/* Large geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: 'conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-primary))',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-5"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'linear-gradient(45deg, var(--color-secondary), var(--color-muted))',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />
    </>
  );
}