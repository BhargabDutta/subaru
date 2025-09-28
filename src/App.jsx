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
    { 
      id: "hero",
      type: "hero",
      title: "",
      subtitle:
        "",
      cta: "",
      images: [
        {
          src: "/monster1.png",
          alt: "grain",
          className:
            "pointer-events-none absolute inset-0 w-full h-full object-cover",
        },
        // {
        //   src: "/images/hero/badge.png",
        //   alt: "badge",
        //   className:
        //     "absolute right-6 top-6 w-24 md:w-32 drop-shadow-xl rotate-6",
        // },
      ],
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
  
    { id: "features3", title: "Guardians Awaken", subtitle: "Stone gargoyles stir when shadows fall.", align: "right",
      images: [
        {
          src: "/backhand.png",
          alt: "grain",
          className:
            "pointer-events-none absolute inset-0 w-fit h-fit hidden md:block object-cover -z-10",
        },
        {
          src: "/backhand_mobile.png",
          alt: "grain",
          className:
            "pointer-events-none absolute w-fit h-[50vh] md:hidden block object-cover -z-10 bottom-50 -left-24",
        },
        {
          src: "/fronthands.png",
          alt: "grain",
          className:
            "pointer-events-none absolute right-0 w-fit h-fit object-cover hidden md:block",
        },

        {
          src: "/fronthands_mobile.png",
          alt: "grain",
          className:
            "pointer-events-none absolute right-0 w-full h-[50vh] bottom-0 object-cover md:hidden block",
        },
      
      ]
     },
  
  ];
  
  

  return (
    
    <div className="relative h-screen text-white overflow-x-hidden transition-colors duration-500 ">

      {/* Background image layer — control its z here */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[url('/monster3.jpg')] bg-no-repeat bg-cover bg-center"
    />
      <div className="fixed inset-0 h-screen w-full z-0">

        <ShoeCanvas sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
      </div>


      <main className="relative h-screen overflow-y-scroll snap-y snap-mandatory z-15">
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
                  isActive={isActive} 
                  images={s.images}     // 👈 control appearance
                />
              ) : (
                <Section
                  title={s.title}
                  subtitle={s.subtitle}
                  align={s.align}
                  isActive={isActive}      // 👈 control appearance
                  images={s.images}
                />
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
