import { useEffect, useRef } from "react"
import { FaTools, FaChartLine, FaShieldAlt, FaClock } from "react-icons/fa"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const data = [
  {
    icon: <FaTools className="text-3xl" />,
    title: "Cost-Effective Solutions",
    desc: "We deliver high-performance engineering upgrades at a fraction of OEM replacement costs, saving clients up to 90%.",
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "Performance Optimization",
    desc: "Enhance your system efficiency and productivity with precision-engineered upgrades tailored to your needs.",
  },
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: "Reliable Quality",
    desc: "Every upgrade is tested to ensure consistent performance, reliability, and long-term durability.",
  },
  {
    icon: <FaClock className="text-3xl" />,
    title: "Quick Turnaround",
    desc: "Our streamlined engineering process minimizes downtime and ensures timely project delivery.",
  },
]

gsap.registerPlugin(ScrollTrigger)

export function Offer() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const section = sectionRef.current

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "start 50%",
      end: "start 45%",
      onEnter: () => {
        document.documentElement.classList.add("dark")
      },
      onEnterBack: () => {
        document.documentElement.classList.remove("dark")
      },
    })
    return () => {
      trigger.kill()
    }
  })
  return (
    <section
      ref={sectionRef}
      className="w-full flex justify-center py-14 items-end tracking-tight"
    >
      <div className="text-4xl gap-[14vh] py-[12vh] flex flex-col justify-evenly items-center w-full">
        <div>
          <p className="text-center px-6 font-bold sm:text-base lg:text-2xl xl:text-3xl">
            Collaborate with brands and agencies{" "}
            <br className="sm:flex hidden" /> to create impactful results.
          </p>
        </div>
        <div className="w-full flex justify-center items-center relative">
          <span className="border block border-t w-[80%]" />
          <button className="bg-[var(--color-paper)] tracking-tighter -rotate-12 absolute text-[var(--color-paper-fg)] text-sm text-nowrap px-3 py-2 font-light rounded-full ">
            Let's Talk
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
  <div className="
    w-full 
    max-w-7xl 
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-4 
    sm:gap-6 
    lg:gap-8 
    px-4 
    sm:px-6 
    lg:px-8 
    py-8 
    sm:py-10 
    lg:py-14
  ">
    {data.map((item, i) => (
      <div
        key={i}
        className="
          flex flex-col items-center text-center 
          gap-2 sm:gap-3 
          p-4 sm:p-6 
          border border-[var(--color-elegant-300)] 
          rounded-xl 
          bg-background 
          shadow-sm 
          hover:shadow-lg 
          transition-all duration-300
        "
      >
        <div className="text-2xl sm:text-3xl lg:text-4xl">
          {item.icon}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-[250px]">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  )
}
