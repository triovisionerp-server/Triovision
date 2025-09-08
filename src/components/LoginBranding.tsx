import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { loginFeatures, loginStats } from './constants/loginData';

export function LoginBranding() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hidden lg:block space-y-8"
    >
      {/* Logo and Title */}
      <div className="space-y-6">
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">ERP Dashboard</h1>
            <p className="text-muted-foreground">Enterprise Resource Planning</p>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-muted-foreground max-w-md"
        >
          Streamline your business operations with our comprehensive ERP solution. 
          Manage resources, track performance, and drive growth.
        </motion.p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        {loginFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            whileHover={{ 
              x: 10,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50"
      >
        {loginStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
              className="text-2xl font-bold text-primary"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}