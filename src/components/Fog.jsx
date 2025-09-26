// src/components/Fog.jsx
import { motion } from "framer-motion";

export default function Fog({ active = false }) {
  // Three soft fog layers drifting at different speeds (no scroll coupling)
  const base = "pointer-events-none absolute inset-0 overflow-hidden";
  return (
    <div className={base} aria-hidden="true">
      {/* far fog */}
      <motion.div
        className={`${base} blur-3xl opacity-30`}
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(255,192,203,0.35) 0%, rgba(255,192,203,0.0) 60%)",
          mixBlendMode: "screen",
        }}
        animate={active ? { x: ["-8%", "6%", "-8%"] } : { x: 0 }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* mid fog */}
      <motion.div
        className={`${base} blur-2xl opacity-35`}
        style={{
          background:
            "radial-gradient(45% 40% at 65% 40%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.0) 60%), radial-gradient(35% 35% at 30% 65%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 60%)",
          mixBlendMode: "screen",
        }}
        animate={active ? { x: ["6%", "-10%", "6%"] } : { x: 0 }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* near wisps */}
      <motion.div
        className={`${base} blur-xl opacity-40`}
        style={{
          background:
            "radial-gradient(30% 25% at 40% 55%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%), radial-gradient(25% 20% at 70% 60%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)",
          mixBlendMode: "screen",
        }}
        animate={active ? { x: ["-4%", "8%", "-4%"] } : { x: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
