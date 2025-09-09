// src/components/Hero.jsx
export default function Hero({ title, subtitle, cta, variant, setVariant }) {
    const variants = ["red", "blue", "green", "yellow"]; // 4 options
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

          {/* Variant buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-4 py-2 rounded-lg font-bold border-2 transition
                ${variant === v ? "border-white bg-white text-black" : "border-gray-500 bg-transparent text-white"}`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        </div>
      </section>
    );
  }
  