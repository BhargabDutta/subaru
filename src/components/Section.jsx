// src/components/Section.jsx
import { motion } from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

const container = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
};

// Map friendly positions to Tailwind absolute utilities
const posToClass = {
  "top-left": "top-6 left-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
  "top-right": "top-6 right-6",
  "center-left": "top-1/2 -translate-y-1/2 left-6",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-right": "top-1/2 -translate-y-1/2 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-6",
};

// Small content card
function ContentBlock({ block, isActive, innerRef }) {
  const {
    id,
    pos,
    style,
    title,
    subtitle,
    titleClassName = "",
    subtitleClassName = "",
    className = "",
    variants,
    initial,
    animate,
    transition,
  } = block;

  const baseClasses = "absolute pointer-events-auto max-w-md p-4 md:p-4";
  const positionClasses = style ? "" : posToClass[pos || "top-left"] || "";

  return (
    <motion.div
      key={id}
      ref={innerRef} // << keep this
      className={`${baseClasses} ${positionClasses} ${className}`}
      style={style || {}}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={variants || mistReveal}
      transition={transition || undefined}
      role="region"
      aria-label={title || subtitle || "content"}
    >
      {title && (
        <h3 className={`text-2xl md:text-3xl font-extrabold mb-1 drop-shadow ${titleClassName}`}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p  className={`text-sm md:text-base text-gray-100/90 ${subtitleClassName}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}

export default function Section({
  title,
  subtitle,
  align = "center",
  isActive = false,
  images = [],
  contents = [],
  isMobile = false,
  titleClassName,
  subtitleClassName,
}) {
    // ✅ useMemo so dependencies are stable
  const resolvedContents = useMemo(() => {
    return (contents || []).map((b) => {
      if (isMobile && b?.mobile) return { ...b, ...b.mobile, mobile: b.mobile };
      return b;
    });
  }, [contents, isMobile]);
  
  const containerRef = useRef(null);

  // --- NEW: keep refs & size/boxes state
  const blockRefs = useRef({}); // id -> element
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState({}); // id -> {x,y,w,h}
  const boxesRef = useRef(boxes);

  // --- reveal blocks after their lines draw
const [revealedBlocks, setRevealedBlocks] = useState(new Set());

// reset when section deactivates
useEffect(() => {
  if (!isActive) setRevealedBlocks(new Set());
}, [isActive]);

const markBlockRevealed = useCallback((id) => {
  setRevealedBlocks((prev) => {
    if (prev.has(id)) return prev;
    const next = new Set(prev);
    next.add(id);
    return next;
  });
}, []);


  // stable callback ref to avoid churn
  const setBlockRef = useCallback(
    (id) => (el) => {
      if (el) blockRefs.current[id] = el;
    },
    []
  );

  // Guarded ResizeObserver
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((s) => (s.w !== width || s.h !== height ? { w: width, h: height } : s));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure each block relative to container — ONLY update if changed
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const crect = root.getBoundingClientRect();
    const next = {};
    resolvedContents.forEach(({ id }) => {
      const node = blockRefs.current[id];
      if (!node) return;
      const r = node.getBoundingClientRect();
      next[id] = {
        x: r.left - crect.left,
        y: r.top - crect.top,
        w: r.width,
        h: r.height,
      };
    });

    // shallow compare with tolerance to avoid loops
    const prev = boxesRef.current;
    const same =
      Object.keys(next).length === Object.keys(prev).length &&
      Object.keys(next).every((k) => {
        const A = next[k],
          B = prev[k];
        if (!B) return false;
        return (
          Math.abs(A.x - B.x) <= 0.5 &&
          Math.abs(A.y - B.y) <= 0.5 &&
          Math.abs(A.w - B.w) <= 0.5 &&
          Math.abs(A.h - B.h) <= 0.5
        );
      });

    if (!same) {
      boxesRef.current = next;
      setBoxes(next); // <- only when changed
    }
  }, [resolvedContents, isActive, size]);

  const alignment =
    align === "right"
      ? "items-end text-right ml-auto"
      : align === "left"
      ? "items-start text-left mr-auto"
      : "items-center text-center mx-auto";

      // ---- Title/Subitle class resolution (per-section styles) ----
const defaultTitleClass =
"text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg";
const defaultSubtitleClass =
"text-lg md:text-2xl/relaxed font-bold text-gray-200/90";

const finalTitleClass = titleClassName || defaultTitleClass;
const finalSubtitleClass = subtitleClassName || defaultSubtitleClass;

// Helper: compute the label attach point
// - attach.side + attach.at  -> edge anchor
// - attach.within.{x,y}      -> inside point
// - fallback: nearest side (previous behavior)
const getAttachPoint = (id, tx, ty, attach) => {
  const b = boxes[id];
  if (!b) return null;

  // explicit "within" point inside the label
  if (attach?.within) {
    const ax = b.x + (Math.max(0, Math.min(100, attach.within.x)) / 100) * b.w;
    const ay = b.y + (Math.max(0, Math.min(100, attach.within.y)) / 100) * b.h;
    return { x: ax, y: ay };
  }

  // explicit edge + percentage along that edge
  if (attach?.side) {
    const at = Math.max(0, Math.min(100, attach.at ?? 50)) / 100;
    switch (attach.side) {
      case "left":
        return { x: b.x, y: b.y + at * b.h };
      case "right":
        return { x: b.x + b.w, y: b.y + at * b.h };
      case "top":
        return { x: b.x + at * b.w, y: b.y };
      case "bottom":
        return { x: b.x + at * b.w, y: b.y + b.h };
      default:
        break;
    }
  }

  // Fallback: nearest vertical side (your old behavior)
  const leftDist = Math.abs(tx - b.x);
  const rightDist = Math.abs(tx - (b.x + b.w));
  const x = leftDist < rightDist ? b.x : b.x + b.w;
  const y = Math.min(Math.max(ty, b.y), b.y + b.h);
  return { x, y };
};


  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-x-hidden flex items-center px-6 md:px-20"
    >
      {/* Image layers */}
      <div className="pointer-events-none absolute inset-0">
        {images.map((img, i) => {
          const ImgTag =
            img.variants || img.initial || img.animate || img.transition
              ? motion.img
              : "img";
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

      {/* Callout lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {resolvedContents.flatMap((b) => {
        const targets = b.targets || (b.target ? [ { ...b.target, attach: b.attach } ] : []);
        if (targets.length === 0 || size.w === 0 || size.h === 0) return [];

        return targets.map((t, i) => {
          const tx = (t.x / 100) * size.w;
          const ty = (t.y / 100) * size.h;
          const attach = getAttachPoint(b.id, tx, ty, t.attach);
          if (!attach) return null;

    const len = Math.hypot(attach.x - tx, attach.y - ty);   // line length in px
    const delay = 0.2 + i * 0.15;                            // small stagger for multiple lines

          return (
            <g key={`line-${b.id}-${i}`}>
              {/* draw-on animation via dashoffset */}
              <motion.line
                x1={tx}
                y1={ty}
                x2={attach.x}
                y2={attach.y}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 1 }}
                animate={isActive ? { strokeDashoffset: 0 } : { strokeDashoffset: len }}
                transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // when the LAST line of this block finishes, reveal its content
                  if (i === targets.length - 1 && isActive) {
                    markBlockRevealed(b.id);
                  }
                }}
              />
              {/* target dot fade-in */}
              <motion.circle
                cx={tx}
                cy={ty}
                r="5"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: delay + 0.2 }}
              />
            </g>
          );
        });
      })}

      </svg>

      {/* Positioned content blocks */}
      <div className="pointer-events-none absolute inset-0">
        {resolvedContents.map((block) => (
          <div key={block.id} className="pointer-events-none">
            {(() => {
              const hasTargets = (block.targets && block.targets.length) || block.target;
              const shouldShow = isActive && (!hasTargets || revealedBlocks.has(block.id));
              return (
                <ContentBlock
                  block={block}
                  isActive={shouldShow}
                  innerRef={setBlockRef(block.id)}
                />
              );
            })()}
          </div>
        ))}
      </div>

      {/* Section title/subtitle */}
      <motion.section
        className={`relative w-full max-w-2xl ${alignment} pointer-events-${
          isActive ? "auto" : "none"
        }`}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={container}
        aria-hidden={isActive ? "false" : "true"}
        role="region"
      >
        {title && (
          <motion.h2
            variants={mistReveal}
            className={finalTitleClass}
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p
            variants={mistReveal}
            className={finalSubtitleClass}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.section>
    </div>
  );
}
