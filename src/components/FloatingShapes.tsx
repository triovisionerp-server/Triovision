import { motion } from 'motion/react';

export function FloatingShapes() {
  const shapes = [
    { id: 1, size: 'w-20 h-20', delay: 0, x: '10%', y: '20%' },
    { id: 2, size: 'w-16 h-16', delay: 0.5, x: '80%', y: '10%' },
    { id: 3, size: 'w-24 h-24', delay: 1, x: '20%', y: '70%' },
    { id: 4, size: 'w-12 h-12', delay: 1.5, x: '90%', y: '60%' },
    { id: 5, size: 'w-18 h-18', delay: 2, x: '70%', y: '80%' },
    { id: 6, size: 'w-14 h-14', delay: 2.5, x: '5%', y: '50%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} opacity-10`}
          style={{
            left: shape.x,
            top: shape.y,
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-32 h-32 opacity-5"
        style={{
          right: '15%',
          top: '25%',
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute w-28 h-28 opacity-5"
        style={{
          left: '10%',
          bottom: '15%',
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-muted))',
          borderRadius: '50%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}