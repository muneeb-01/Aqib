export function Cta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 text-center"
    >
      {/* Radial Glow Background */}
      <div className="absolute pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-montbold md:text-4xl font-semibold mb-6">
          Ready to scale your digital presence?
        </h2>

        <p className="text-[var(--text-secondary)] text-lg mb-10">
          Let's craft a digital experience that stands out and converts.
        </p>

        <button className="inline-block px-8 py-4 rounded-full bg-[var(--accent-color)] text-black font-medium text-lg hover:opacity-90 transition">
          Book a Free Discovery Call
        </button>
      </div>
    </section>
  )
}
