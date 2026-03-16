"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

interface ScrollScaleContainerProps {
  children?: React.ReactNode
  /** Scale when element is off-screen (default: 0.6) */
  minScale?: number
  /** Scale when element is centered in viewport (default: 1) */
  maxScale?: number
  /** Min opacity when off-screen (default: 0.3) */
  minOpacity?: number
}

// ─── Core hook ───────────────────────────────────────────────────────────────

function useGsapScrollScale(
  ref: React.RefObject<HTMLElement>,
  {
    minScale = 0.6,
    maxScale = 1,
    minOpacity = 0.3,
  }: Pick<
    ScrollScaleContainerProps,
    "minScale" | "maxScale" | "minOpacity"
  > = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial state
    gsap.set(el, {
      scale: minScale,
      opacity: minOpacity,
      ease: "power1.out",
    })

    // Grow animation: triggers when element enters viewport from bottom
    const growTrigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom", // element top hits viewport bottom
      end: "center center", // element center hits viewport center
      scrub: 0.8, // smooth lag behind scroll
      onUpdate: (self) => {
        const progress = self.progress // 0 → 1
        const scale = gsap.utils.interpolate(minScale, maxScale, progress)
        const opacity = gsap.utils.interpolate(minOpacity, 1, progress)
        gsap.set(el, { scale, opacity })
      },
    })

    return () => {
      growTrigger.kill()
    }
  }, [ref, minScale, maxScale, minOpacity])
}

export function ScrollScaleCard({
  children,
  minScale = 0.1,
  maxScale = 1,
  minOpacity = 0.9,
}: ScrollScaleContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGsapScrollScale(ref as React.RefObject<HTMLElement>, {
    minScale,
    maxScale,
    minOpacity,
  })

  return (
    <div
      ref={ref}
      className="w-full h-[120vh] "
    >
      <div

        style={{
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
        className="flex sticky top-10 justify-center items-center mx-auto"
      >
        {children}
      </div>
    </div>
  )
}

export function ScrollScaleCardWrapper() {
  return (
    <ScrollScaleCard>
      <div className="w-[90%] h-[90vh] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-tertiary-fg)] rounded-(--container-roundness) text-(--color-paper-fg) flex justify-center items-center">
        <video
          src="/videos/0202.mp4"
          id="video"
          className=" aspect-video w-[70%] object-center "
          autoPlay
          loop
          muted
        ></video>
      </div>
    </ScrollScaleCard>
  )
}
