import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ModelViewer } from "./Model"

gsap.registerPlugin(ScrollTrigger)

export function HorizontalSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    const totalWidth = track.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: true,
          pin: true,

          onUpdate: (self) => {
            const progress = self.progress

            // map first half scroll to 0 → 100
            const mapped = Math.min(progress * 3, 1)

            const clipValue = mapped * 100

            gsap.set(".clipping", {
              "--clip-1": `${clipValue}%`,
            })
          },
        },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Horizontal moving track */}
      <div ref={trackRef} className="flex h-full items-center gap-10 px-[40vw]">
        {/* Dummy panels to create horizontal space */}
        <div className="w-[80vw] h-[60vh]  rounded-xl flex-shrink-0" />
        <div className="w-[80vw] h-[60vh]  rounded-xl flex-shrink-0" />
        <div className="w-[80vw] h-[60vh]  rounded-xl flex-shrink-0" />
        <div className="w-[80vw] h-[60vh]  rounded-xl flex-shrink-0" />
      </div>

      {/* Center container that always stays visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <section className="min-h-screen clipping bg-(--color-primary-fg) absolute w-full flex items-center justify-center "></section>
        <ModelViewer />
      </div>
    </section>
  )
}
