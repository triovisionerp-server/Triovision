import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HardHat, Wrench } from 'lucide-react';

export function MobileEngineer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="lg:hidden flex justify-center mt-6"
    >
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1694522362256-6c907336af43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMHdpdGglMjBoZWxtZXQlMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzU2ODkwNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Engineer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </motion.div>

        {/* Floating mini tools */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HardHat className="w-3 h-3 text-primary" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -left-2 w-5 h-5 bg-accent/30 rounded-full flex items-center justify-center"
          animate={{
            rotate: [360, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Wrench className="w-2.5 h-2.5 text-accent-foreground" />
        </motion.div>

        {/* Text below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-3"
        >
          <p className="text-xs text-muted-foreground">Expert Engineer Support</p>
        </motion.div>
      </div>
    </motion.div>
  );
}