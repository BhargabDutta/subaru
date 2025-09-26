// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ShoeCanvas from "./components/ShoeCanvas";
import Hero from "./components/Hero";
import Section from "./components/Section";
import SplashCursor from "./components/SplashCursor";
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
    { 
      id: "hero",
      type: "hero",
      title: "The Enchanted Keep",
      subtitle:
        "On the night the silver moon returned, the old road found our feet again. The forest hushed, and the owls kept watch as starlight threaded the brambles. Beyond the hill, a keep breathed softly, its windows like lanterns in a sea of night. We took one step, then another, and the gates—long asleep—remembered our names.",
      cta: "Begin the Journey"
    },    
  
    { id: "features",  title: "Whispers of Old", subtitle: "Legends speak of towers that touch the stars.", align: "right" },
    { id: "materials", title: "Paths of Starlight", subtitle: "Moss-lit steps remember every footfall.", align: "left" },
    { id: "cta",       title: "A Lantern Lights", subtitle: "Follow the glow; the night is gentle here.", align: "center" },
  
    { id: "features1", title: "The Watchers", subtitle: "Owls with ember eyes measure the turning hours.", align: "right" },
    { id: "materials1",title: "Walls of Wonder", subtitle: "Stone that glows with runes older than time.", align: "left" },
    { id: "cta1",      title: "A Door Appears", subtitle: "Only those who believe may step inside.", align: "center" },
  
    { id: "features2", title: "Library of Winds", subtitle: "Pages flutter with voices of forgotten kings.", align: "right" },
    { id: "materials2",title: "Ink and Moonwater", subtitle: "Words stitched with silver, bound in dusk-blue hide.", align: "left" },
    { id: "cta2",      title: "The Bridge of Echoes", subtitle: "Cross, and the castle reveals its heart.", align: "center" },
  
    { id: "features3", title: "Guardians Awaken", subtitle: "Stone gargoyles stir when shadows fall.", align: "right" },
    { id: "materials3",title: "Garden in the Sky", subtitle: "Vines hum lullabies; the roses answer back.", align: "left" },
    { id: "cta3",      title: "The Great Hall Beckons", subtitle: "Candles float, and music fills the air.", align: "center" },
  
    { id: "features4", title: "The Mirror Stair", subtitle: "Each step shows the life you almost took.", align: "right" },
    { id: "materials4",title: "Threads of Dawn", subtitle: "Tapestries ripple with tomorrow’s weather.", align: "left" },
    { id: "cta4",      title: "Secrets of the Keep", subtitle: "Follow the spiral stair; wonders await.", align: "center" },
  
    { id: "features5", title: "Life Within", subtitle: "Gardens in the sky, fountains that sing, halls that breathe magic.", align: "right" },
  ];
  
  

  return (
    
    <div className="relative h-screen text-white overflow-x-hidden transition-colors duration-500 bg-pink-900">
      <div className="fixed inset-0 h-screen w-full">
      <SplashCursor/>

        <ShoeCanvas sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
      </div>

      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory">
        {sections.map((s, i) => {
          const isActive = sectionIndex === i;
          return (
            <div
              key={s.id}
              ref={(el) => (sectionRefs.current[i] = el)}
              data-index={i}
              className="h-screen snap-start snap-always flex items-center"
              aria-current={isActive ? "true" : "false"}
            >
              {s.type === "hero" ? (
                <Hero
                  title={s.title}
                  subtitle={s.subtitle}
                  cta={s.cta}
                  variant={variant}
                  setVariant={setVariant}
                  isActive={isActive}      // 👈 control appearance
                />
              ) : (
                <Section
                  title={s.title}
                  subtitle={s.subtitle}
                  align={s.align}
                  isActive={isActive}      // 👈 control appearance
                />
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
