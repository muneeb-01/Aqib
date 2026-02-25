import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Marquee() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "bottom 30%",
      end: "start 50%",
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
  }, [])

  const words = [
    "inspiration",
    "creativity",
    "elegance",
    "design",
    "vision",
    "harmony",
    "transformation",
    "innovation",
    "ambiance",
  ]

  const directions = [
    "row-left",
    "row-right",
    "row-left",
    "row-right",
    "row-left mobile-only",
  ]

  return (
    <div
      ref={sectionRef}
      data-color="white"
      className="marqueeContainer absolute top-0 section no-select w-full h-screen overflow-hidden"
    >
      {/* Top Tagline */}
      <div className="text-center font-poppins mt-20 sm:mt-24">
        <h1 className="text-base sm:text-lg lg:text-xl 2xl:text-3xl font-medium tracking-tight whitespace-nowrap">
          Transforming Spaces with Innovative Design <br /> and Creative
          Solutions
        </h1>
      </div>

      {/* Animated Marquee */}
      <div className="marquee text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl scale-100 absolute top-1/2 font-semibold font-NeueMachina left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
        {directions.map((str, idx) => {
          const direction = str.split(" ")[0]
          const isMobileOnly = str.split(" ")[1] === "mobile-only"
          return (
            <div
              key={idx}
              className={`row ${direction} ${isMobileOnly ? "lg:hidden" : ""} ${
                direction === "row-left"
                  ? "-translate-x-full"
                  : "translate-x-[17%] 2xl:translate-x-34"
              } w-full py-2 flex flex-nowrap items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8`}
            >
              {words.map((word, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8"
                >
                  <h1 className="whitespace-nowrap">{word}</h1>
                  {i < words.length - 1 && (
                    <div className="circle w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-(--color-paper) rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Bottom Tag */}
      <div className="absolute text-sm font-medium font-poppins bottom-[10%] left-[8%]">
        <ul>
          <li className="text-sm sm:text-base fs1">
            {" "}
            {new Date().getFullYear() - 2018} Years Of Experience
          </li>
        </ul>
        <p className="text-xs text-yellow-500 pl-5 fs1">
          2018 - {new Date().getFullYear()}{" "}
        </p>
      </div>
    </div>
  )
}
