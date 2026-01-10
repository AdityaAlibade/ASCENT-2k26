import { motion } from "framer-motion";

interface ShapeProps {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  opacity?: number;
}

export const Circle = ({ className = "", color = "#FFFFFF", size = 48, delay = 0, opacity = 1 }: ShapeProps) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
  >
    <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8" />
  </motion.svg>
);

export const Triangle = ({ className = "", color = "#FFFFFF", size = 48, delay = 0, opacity = 1 }: ShapeProps) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
  >
    <polygon points="50,15 90,85 10,85" fill="none" stroke={color} strokeWidth="8" />
  </motion.svg>
);

export const Square = ({ className = "", color = "#FFFFFF", size = 48, delay = 0, opacity = 1 }: ShapeProps) => (
  <motion.svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
  >
    <rect x="15" y="15" width="70" height="70" fill="none" stroke={color} strokeWidth="8" />
  </motion.svg>
);

export const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
    <motion.div 
      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4"
    >
      <Circle size={120} color="var(--primary)" />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 right-1/4"
    >
      <Triangle size={140} color="var(--primary)" />
    </motion.div>
    <motion.div 
      animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 left-1/3"
    >
      <Square size={100} color="var(--primary)" />
    </motion.div>
  </div>
);
