import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const CharacterCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const charX = useMotionValue(0);
  const charY = useMotionValue(0);

  const smoothX = useSpring(charX, { stiffness: 160, damping: 22 });
  const smoothY = useSpring(charY, { stiffness: 160, damping: 22 });

  const velocity = useMotionValue(0);
  const scaleY = useTransform(velocity, [0, 40], [1, 0.85]);
  const bounceY = useTransform(velocity, [0, 40], [0, -6]);

  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      const dx = mouseX.get() - charX.get();
      const dy = mouseY.get() - charY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);

      velocity.set(dist);

      const speed = 0.18;

      charX.set(charX.get() + dx * speed);
      charY.set(charY.get() + dy * speed);

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const rotation = useTransform(
    [mouseX, mouseY],
    ([mx, my]) =>
      (Math.atan2(my - charY.get(), mx - charX.get()) * 180) / Math.PI - 90
  );

  return (
    <>
      {/* Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </motion.div>

      {/* Character */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: rotation,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          style={{ scaleY, y: bounceY }}
          className="relative"
        >
          <svg viewBox="0 0 100 100" width="64" height="64">
            {/* Body */}
            <rect x="35" y="40" width="30" height="40" rx="6" fill="#ff006e" />

            {/* Head */}
            <circle cx="50" cy="30" r="18" fill="#ff006e" />

            {/* Mask */}
            <circle cx="50" cy="30" r="10" fill="#000" />
            <circle cx="50" cy="30" r="6" fill="#fff" />

            {/* Arms */}
            <rect x="18" y="45" width="18" height="8" rx="4" fill="#ff006e" />
            <rect x="64" y="45" width="18" height="8" rx="4" fill="#ff006e" />

            {/* Legs */}
            <rect x="38" y="80" width="8" height="16" rx="4" fill="#ff006e" />
            <rect x="54" y="80" width="8" height="16" rx="4" fill="#ff006e" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CharacterCursor;
