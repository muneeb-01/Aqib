import { useLayoutEffect, useRef } from "react"
import { DamnGood } from "./DamnGood"
import { Marquee } from "./Marquee"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Landing() {
  const homeRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      })

      tl.to(
        ".clipContainer",
        {
          "--clip": "0%",
          ease: "cubic-bezier(0.19, 1, 0.22, 1)",
        },
        "a",
      )
        .to(
          ".row-left",
          {
            xPercent: 10,
            stagger: 0.1,
          },
          "a",
        )
        .to(
          ".row-right",
          {
            xPercent: -28,
            stagger: 0.1,
          },
          "a",
        )
        .from(
          ".marquee",
          {
            scale: 2,
          },
          "a",
        )
    }, homeRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  })

  return (
    <div
      ref={homeRef}
      className="relative w-full home h-[250vh] transition-colors duration-500"
    >
      <div className="w-full sticky top-0 left-0">
        <DamnGood />
        <Marquee />
      </div>
    </div>
  )
}
