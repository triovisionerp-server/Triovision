import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Wrench, Cog, HardHat, MessageCircle } from 'lucide-react';

export function MechanicalEngineer3D() {
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    "Welcome to our ERP system!",
    "Your data is secure with us",
    "Need help? I'm here to assist",
    "Streamline your workflow today"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="relative hidden lg:block">
      {/* Main engineer figure */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotateY: -15 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative"
        style={{ perspective: '1000px' }}
      >
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(var(--color-primary), 0.1) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 3D Card Container */}
        <motion.div
          className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
          animate={{
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, 2, 0, -2, 0],
            y: [0, -10, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            rotateX: 5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Engineer Image */}
          <div className="relative w-full h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1690356107685-3725367f6f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwZW5naW5lZXIlMjBwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU2ODkwNTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Mechanical Engineer"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Engineer info overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-0 left-0 right-0 p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-1">John Smith</h3>
              <p className="text-sm opacity-90 mb-2">Senior Mechanical Engineer</p>
              <div className="flex items-center gap-2 text-xs opacity-75">
                <HardHat className="w-3 h-3" />
                <span>15+ Years Experience</span>
              </div>
            </motion.div>
          </div>

          {/* 3D Border Effect */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Floating Tools Animation */}
        <motion.div
          className="absolute -top-8 -right-8 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Wrench className="w-6 h-6 text-primary" />
        </motion.div>

        <motion.div
          className="absolute -bottom-6 -left-6 w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center backdrop-blur-sm"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Cog className="w-5 h-5 text-accent-foreground" />
        </motion.div>

        {/* Engineering Blueprint Background */}
        <motion.div
          className="absolute -z-10 inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Additional 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes around engineer */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Engineering Skills Tags */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute -right-16 top-1/4 space-y-3"
      >
        {['CAD Design', 'Project Management', 'Quality Control'].map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.1, x: -5 }}
            className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 text-xs shadow-lg"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>

      {/* Speech Bubble with Tips */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-lg border border-border/50 max-w-48">
              <p className="text-sm text-center">{tips[currentTip]}</p>
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
              </div>
              <motion.div
                className="absolute -right-1 -top-1 w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <MessageCircle className="w-2 h-2 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Shadow Effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-64 h-8 bg-black/10 rounded-full blur-lg"
        animate={{
          scaleX: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}