// src/components/Hero.jsx
import { motion } from "framer-motion";


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

export default function Hero({ title, subtitle, cta, variant, setVariant, isActive = false, images = [] }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <img src={monster1} alt="" className="w-full h-full absolute -z-10" /> */}

      {/* Custom image layers (each with independent styling) */}
      <div className="pointer-events-none absolute inset-0">
        {images.map((img, i) => {
          const ImgTag = img.variants || img.initial || img.animate || img.transition ? motion.img : "img";
          return (
            <ImgTag
              key={i}
              src={img.src}
              alt={img.alt || ""}
              className={img.className || ""}
              style={img.style || {}}
              loading="lazy"
              draggable={false}
              {...("initial" in img ? { initial: img.initial } : {})}
              {...("animate" in img ? { animate: isActive ? img.animate : "hidden" } : {})}
              {...("variants" in img ? { variants: img.variants } : {})}
              {...("transition" in img ? { transition: img.transition } : {})}
            />
          );
        })}
      </div>


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
          className="pt-4 text-transparent font-extrabold mb-6 text-5xl md:text-9xl
             [-webkit-text-stroke:1px_white] [-webkit-text-fill-color:transparent]"
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
