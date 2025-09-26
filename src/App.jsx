// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ShoeCanvas from "./components/ShoeCanvas";
import Hero from "./components/Hero";
import Section from "./components/Section";

export default function App() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef([]);
  const [variant, setVariant] = useState("red"); // default variant


  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionIndex(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const sections = [
    { id: "hero", type: "hero", title: "The New Motion", subtitle: "Sculpted for speed and comfort.", cta: "Shop Now" },
    { id: "features", title: "Engineered Performance", subtitle: "Featherlight, breathable, responsive.", align: "right" },
    { id: "materials", title: "", subtitle: "", align: "left" },
    { id: "cta", title: "", subtitle: "", align: "center" },
    { id: "features1", title: "", subtitle: "", align: "right" },
    { id: "materials1", title: "Premium Materials", subtitle: "Sustainably sourced, long-lasting.", align: "left" },
    { id: "cta1", title: "Limited Release", subtitle: "Secure yours today.", align: "center" },
    { id: "features2", title: "", subtitle: "", align: "right" },
    { id: "materials2", title: "", subtitle: "", align: "left" },
    { id: "cta2", title: "Limited Release", subtitle: "Secure yours today.", align: "center" },
    { id: "features3", title: "Engineered Performance", subtitle: "Featherlight, breathable, responsive.", align: "right" },
    { id: "materials3", title: "", subtitle: "", align: "left" },
    { id: "cta3", title: "Limited Release", subtitle: "Secure yours today.", align: "center" },
    { id: "features4", title: "", subtitle: "", align: "right" },
    { id: "materials4", title: "", subtitle: "", align: "left" },
    { id: "cta4", title: "Limited Release", subtitle: "Secure yours today.", align: "center" },
    { id: "features5", title: "Engineered Performance", subtitle: "Featherlight, breathable, responsive.", align: "right" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden transition-colors duration-500 bg-pink-400">
      <div className='fixed h-screen w-full'>
      <ShoeCanvas sectionIndex={sectionIndex} isMobile={isMobile} variant={variant}/>
      </div>

      <main className="relative z-10">
        {sections.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            data-index={i}
          >
            {s.type === "hero" ? (
              <Hero 
                title={s.title} 
                subtitle={s.subtitle} 
                cta={s.cta}
                variant={variant}
                setVariant={setVariant}
                 />
            ) : (
              <Section
                title={s.title}
                subtitle={s.subtitle}
                align={s.align}
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
