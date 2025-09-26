// src/components/Hero.jsx
export default function Hero({ title, subtitle, cta, variant, setVariant }) {
    const variants = ["red", "blue", "sky blue", "yellow"]; // 4 options
    return (
      <section className="h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-6">{subtitle}</p>
          {cta && (
            <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
              {cta}
            </button>
          )}

        
        </div>
      </section>
    );
  }
  