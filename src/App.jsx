// src/App.jsx
import { useEffect, useRef, useState } from "react";
import ModelCanvas from "./components/ModelCanvas";
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
      title: "subaru",
      subtitle:
        "",
      cta: "",
      images: [],
    },    
  
    {
      id: "features",
      title: "",
      subtitle: "",
      align: "right",
      contents: [
        {
          id: "tl",
          pos: "top-left",
          title: "built to intimidate, not just impress.",
          subtitle: "0–100 in 3.2s",
          className: "max-w-xl",
          
        },
        {
          id: "bc",
          pos: "center",
          title: "stretch the limits",
          subtitle: "",
          className: "w-full text-transparent tracking-[0.3em] [-webkit-text-stroke:0.7px_white] [-webkit-text-fill-color:transparent]",
        },
        // Fine-grained position example:
        {
          id: "spec-badge",
          pos: "bottom-right",
          title: "turbocharged. temper unleashed.",
          subtitle: "",
          className: "max-w-fit text-right md:mb-[0px] mb-[20px]",
        },
      ],
    },    

    {
      id: "materials",
      title: "born from boost, raised by grip",
      subtitle: "",
      align: "right",
      titleClassName: "text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg md:block hidden",
      subtitleClassName: "text-lg md:text-2xl/relaxed font-bold text-gray-200/90 md:block hidden",
      contents:[
        {
          id: "tl",
          pos: "top-left",
          title: "born from boost",
          subtitle: "",
          titleClassName: "text-5xl md:text-6xl md:hidden block",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
          
        },
        {
          id: "spec-badge",
          pos: "bottom-right",
          title: "raised by grip",
          subtitle: "",
          titleClassName: "text-5xl md:text-6xl md:hidden block text-right mb-[20px]",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
        },
      ]
    },

    {
      id: "cta",
      title: "forged in boost, crowned in lap times",
      subtitle: "",
      align: "right",
      titleClassName: "text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg md:block hidden",
      subtitleClassName: "text-lg md:text-2xl/relaxed font-bold text-gray-200/90 md:block hidden",
      contents:[
        {
          id: "tl",
          pos: "top-left",
          title: "forged in boost",
          subtitle: "",
          titleClassName: "text-5xl md:text-6xl md:hidden block",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
          
        },
        {
          id: "br",
          pos: "bottom-right",
          title: "crowned in lap times",
          subtitle: "",
          titleClassName: "text-4xl md:text-6xl md:hidden block text-right mb-[20px]",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
        },
      ]
    },
  
    {
      id: "features1",
      title: "every dent is weight reduction, every scar is speed",
      subtitle: "",
      align: "right",
      titleClassName: "text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg md:block hidden",
      subtitleClassName: "text-lg md:text-2xl/relaxed font-bold text-gray-200/90 md:block hidden",
      contents:[
        {
          id: "tl",
          pos: "top-left",
          title: "every dent is weight reduction",
          subtitle: "",
          titleClassName: "text-4xl md:text-6xl md:hidden block",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
          
        },
        {
          id: "br",
          pos: "bottom-right",
          title: "every scar is speed",
          subtitle: "",
          titleClassName: "text-5xl md:text-6xl md:hidden block text-right mb-[20px]",
          subtitleClassName: "mt-2 md:mt-3 text-gray-300/90 italic",
        },
      ]
    },
    {
      id: "materials1",
      title: "",
      subtitle: "",
      align: "left",
      contents:[
        {
          id: "tr",
          pos: "top-right",
          title: "aero",
          subtitle: "downforce on demand",
          className: "max-w-xs",
          target: { x: 100, y: 30 },
          attach: { within: { x: 40, y: 80 } }, 
          mobile: {
            pos: "top-right",
            className: "w-fit border",
            titleClassName:"text-sm",
            subtitleClassName:"text-xs",
            target: { x: 60, y: 24 },
            attach: { x: 50, y: 90 },
          },
        },
        {
          id: "tl",
          pos: "bottom-left",
          title: "side skirt",
          subtitle: "downforce on demand",
          className: "max-w-xs",
          target: { x: 50, y: 75 },
          attach: { within: { x: 70, y: 50 } }, 
          mobile: {
            pos: "bottom-right",
            className: "w-fit border mb-[40px]",
            titleClassName:"text-sm",
            subtitleClassName:"text-xs",
            target: { x: 82, y: 64 },
            attach: { x: 50, y: 90 },
          },
          
        },
        {
          id: "bc",
          pos: "top-left",
          title: "bucket seat",
          subtitle: "downforce on demand",
          className: "max-w-xs",
          target: { x: 65, y: 30 },
          attach: { within: { x: 40, y: 80 } }, 
          mobile: {
            pos: "center-left",
            className: "w-40 border mt-[15vh]",
            titleClassName:"text-sm",
            subtitleClassName:"text-xs",
            target: { x: 42, y: 44 },
            attach: {  x: 50, y: 90 },
          },
        },
      ]
    },
    {
      id: "cta1",
      title: "",
      subtitle: "",
      align: "center",
      contents: [
        {
          id: "tl",
          pos: "top-left",
          title: "launch control",
          subtitle: "0–100 in 3.2s",
          className: "max-w-full",
          target: { x: 30, y: 35 },
          attach: { within: { x: 50, y: 90 } }, 
          // ↑ attach INSIDE the label box:
          //    10% from its left, 80% from its top
          mobile: {
            pos: "bottom-left",
            className: "w-40 border mb-[40px]",
            titleClassName:"text-sm ",
            subtitleClassName:"text-xs",
            target: { x: 32, y: 64 },
            attach: {  x: 50, y: 90 },
          },
        },
        {
          id: "bc",
          pos: "bottom-center",
          title: "track mode",
          subtitle: "torque bias, stiffened dampers",
          className: "max-w-sm",
          targets: [
            { x: 20, y: 65, attach: { within: { x: -10, y: 10 } } },
            { x: 90, y: 65, attach: { within: { x: 80, y: 10 } } },
          ],
          mobile: {
            pos: "top-right",
            className: "w-[70vw] border",
            titleClassName:"text-sm",
            subtitleClassName:"text-xs",
            targets: [
              { x: 80, y: 75, attach: { x: 0, y: 0 } },
              { x: 85, y: 25, attach: { x: 0, y: 0 }  },
            ],
            attach: {  x: 50, y: 90 },
          },
       
        },
        // Fine-grained position example:
        // {
        //   id: "spec-badge",
        //   style: { top: "28%", left: "64%" },
        //   title: "710 HP",
        //   subtitle: "hybrid twin-turbo",
        //   className: "max-w-[12rem] text-right",
        // },
      ],
    },
  
    {
      id: "features2",
      title: "legends don’t retire",
      subtitle: "",
      titleClassName:"text-5xl",
      align: "right",
    },

    {
      id: "materials2",
      title: "no mercy only apex",
      subtitle: "",
      align: "left"
    },

    {
      id: "cta2",
      title: "",
      subtitle: "",
      align: "center"
    },
  
    { id: "features3", title: "", subtitle: "", align: "right",
      images: [
        {
          src: "",
          alt: "grain",
          className:
            "pointer-events-none absolute inset-0 w-fit h-fit hidden md:block object-cover -z-10",
        },
      
      ]
     },
  
  ];
  
  

  return (
    
    <div className="relative h-screen text-white overflow-x-hidden transition-colors duration-500 bg-black">

      {/* Background image layer — control its z here */}
    {/* <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[url('/monster3.jpg')] bg-no-repeat bg-cover bg-center"
    /> */}
      <div className="fixed inset-0 h-screen w-full z-0">

        <ModelCanvas sectionIndex={sectionIndex} isMobile={isMobile} variant={variant} />
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
                  contents={s.contents}
                  isMobile={isMobile}
                  titleClassName={s.titleClassName}
                  subtitleClassName={s.subtitleClassName}
                />
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
