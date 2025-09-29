// src/components/Section.jsx
import { motion } from "framer-motion";


const container = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

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
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
  }
};

export default function Section({ title, subtitle, align = "center", isActive = false, images = [] }) {
  const alignment =
    align === "right"
      ? "items-end text-right ml-auto"
      : align === "left"
      ? "items-start text-left mr-auto"
      : "items-center text-center mx-auto";

  return (
    <div className="relative h-screen w-full flex items-center px-6 md:px-20">
      {/* <Fog active={isActive} /> */}

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

      <motion.section
        className={`relative w-full max-w-2xl ${alignment}
          pointer-events-${isActive ? "auto" : "none"}`}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={container}
        aria-hidden={isActive ? "false" : "true"}
        role="region"
      >
        {title && (
          <motion.h2
            variants={mistReveal}
            className="text-6xl md:text-9xl font-extrabold mb-4 drop-shadow-lg"
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p
            variants={mistReveal}
            className="text-lg md:text-2xl/relaxed font-bold text-gray-200/90"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.section>
    </div>
  );
}
