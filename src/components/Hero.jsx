// src/components/Hero.jsx
import { motion } from "framer-motion";
import Fog from "./Fog";

const heroVariants = {
  hidden: { opacity: 0, scale: 0.99, filter: "blur(10px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 24, letterSpacing: "0.02em" },
  visible: {
    opacity: 1, y: 0, letterSpacing: "0em",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// The mist reveal effect for the paragraph
const mistReveal = {
  hidden: {
    opacity: 0,
    filter: "blur(14px)",
    clipPath: "circle(8% at 50% 50%)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    clipPath: "circle(140% at 50% 50%)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
  }
};

export default function Hero({ title, subtitle, cta, variant, setVariant, isActive = false }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Fog active={isActive} />

      <motion.header
        className={`
          relative w-full mx-auto px-6 text-center
          pointer-events-${isActive ? "auto" : "none"}
        `}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={heroVariants}
        aria-hidden={isActive ? "false" : "true"}
        role="banner"
      >
        <motion.h1
          variants={titleVariants}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight
                     bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent
                     drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] "
        >
          {title}
        </motion.h1>

        {/* One dramatic paragraph revealed from the mist */}
        <motion.p
          variants={mistReveal}
          className="text-lg md:text-2xl/relaxed text-gray-100/90"
        >
          {subtitle}
        </motion.p>

        {cta && (
          <motion.div variants={ctaVariants} className="pt-8">
            <button
              className="px-6 py-3 rounded-2xl bg-white/15 backdrop-blur
                         border border-white/30 hover:bg-white/25 transition shadow-lg"
              onClick={() => setVariant(variant === "red" ? "blue" : "red")}
            >
              {cta}
            </button>
          </motion.div>
        )}
      </motion.header>
    </div>
  );
}
