// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ShoeCanvas from "./components/ShoeCanvas";
import Hero from "./components/Hero";
import Section from "./components/Section";
import './App.css'
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
  
    {
      id: "features",
      title: "Ignite Your Inner Beast",
      subtitle: "More than just a drink—Monster fuels your grind, your hustle, your wild side. When limits call, we roar back.",
      align: "right"
    },    

    {
      id: "materials",
      title: "Find Your Flavor, Fuel Your Fire",
      subtitle: "From Original to Zero Sugar, Monster’s packed with bold flavor and unstoppable energy. Pick your power.",
      align: "left"
    },

    {
      id: "cta",
      title: "What’s Inside the Beast?",
      subtitle: "Taurine, caffeine, B-vitamins, ginseng, L-carnitine — every can of Monster is a loaded formula built to energize you fast, and keep you going longer.",
      align: "center"
    },
  
    {
      id: "features1",
      title: "Next-Gen Energy",
      subtitle: "",
      align: "right"
    },
    {
      id: "materials1",
      title: "Join the Monster Family",
      subtitle: "",
      align: "left"
    },
    {
      id: "cta1",
      title: "Get in the Game",
      subtitle: "",
      align: "center"
    },
  
    {
      id: "features2",
      title: "Meet the Legends",
      subtitle: "",
      align: "right"
    },

    {
      id: "materials2",
      title: "Powering a Greener Future",
      subtitle: "",
      align: "left"
    },

    {
      id: "cta2",
      title: "Wear Your Power",
      subtitle: "Gear up with Monster merch that hits as hard as the drink. Bold, iconic, untamed.",
      align: "center"
    },
  
    { id: "features3", title: "Let’s Connect", subtitle: "Got ideas, questions, or wild stories? Hit us up. The Monster squad is always listening.", align: "right",
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
    
    <div className="relative h-screen text-white overflow-x-hidden transition-colors duration-500 bg-black/50">

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
