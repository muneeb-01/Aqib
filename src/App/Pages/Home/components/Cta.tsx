export function Cta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-30 text-center"
    >
      {/* Radial Glow Background */}
      <div className="absolute pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-montbold md:text-4xl font-semibold mb-6">
          Ready to Bring Your Design to Life?
        </h2>

        <p className="text-[var(--text-secondary)] text-lg mb-10">
          From simple 2D drafts to complex 3D assemblies, we provide the 
          technical precision your project requires.
        </p>

        <button className="inline-block px-8 py-4 rounded-full font-medium bg-(--color-primary-fg) text-(--color-primary) text-lg hover:opacity-90 transition">
          Request a Free Technical Consultation
        </button>
      </div>
    </section>
  )
}
