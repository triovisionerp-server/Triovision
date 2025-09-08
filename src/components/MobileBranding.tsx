import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { MobileEngineer } from './MobileEngineer';

export function MobileBranding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="lg:hidden text-center mt-8"
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold">ERP Dashboard</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Enterprise Resource Planning Solution
      </p>
      <MobileEngineer />
    </motion.div>
  );
}