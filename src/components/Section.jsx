// src/components/Section.jsx
export default function Section({ title, subtitle, align = "center" }) {
    const alignment =
      align === "right"
        ? "ml-auto text-right"
        : align === "left"
        ? "mr-auto text-left"
        : "mx-auto text-center";
  
    return (
      <section className="h-screen flex items-center px-6 md:px-20">
        <div className={`max-w-2xl ${alignment}`}>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">{title}</h2>
          <p className="text-lg md:text-2xl text-gray-400">{subtitle}</p>
        </div>
      </section>
    );
  }
  