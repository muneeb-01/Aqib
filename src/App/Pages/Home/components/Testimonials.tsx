import { FaQuoteRight, FaRegUser } from "react-icons/fa"

const testimonials = [
  {
    name: "Karl Banson",
    text: "Their SolidWorks modeling saved us weeks in the prototyping phase. The assemblies were perfectly optimized and ready for simulation.",
    align: "end",
  },
  {
    name: "Sarah Lee",
    text: "The AutoCAD drafting was flawless, passing every municipal check without a single revision. Professional, precise, and highly recommended.",
    align: "start",
  },
  {
    name: "Mark Rivera",
    text: "The best CAD partner we've ever collaborated with for complex mechanical parts. They truly understand manufacturing constraints.",
    align: "end",
  },
]

export function Testimonial() {
  return (
    <section className="py-[10vh] px-4 sm:px-8 md:pr-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-[12vw] mx-auto w-full max-w-7xl">

        {/* LEFT — Sticky heading */}
        <div className="lg:sticky lg:top-[10%] self-start px-2 sm:px-4 py-4">
          <h2 className="font-montbold font-extrabold text-3xl sm:text-3xl xl:text-5xl tracking-tight leading-tight">
            What Our <br className="hidden sm:block" /> Customers Say
          </h2>
          <p className="mt-4 font-light text-sm sm:text-base lg:text-[0.9rem] text-[var(--color-secondary)] leading-relaxed">
            We take pride in delivering technical excellence. Here is what our 
            partners in engineering and manufacturing have to say about our CAD 
            and design services.
          </p>
        </div>

        {/* RIGHT — Testimonial cards */}
        <div className="flex flex-col gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className={`flex justify-${t.align}`}>
              <div className="w-full sm:w-[85%] flex flex-col sm:flex-row items-center gap-4 py-4 px-5 rounded-2xl border">
                <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border">
                  <FaRegUser className="text-3xl sm:text-4xl" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-montbold text-lg sm:text-xl font-semibold">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base lg:text-[0.9rem] font-montregular leading-relaxed">
                    {t.text.slice(0, 130)}...
                  </p>
                </div>
                <div className="h-full">
                <div className="hidden sm:flex items-start pt-1 text-xl shrink-0">
                  <FaQuoteRight />
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}