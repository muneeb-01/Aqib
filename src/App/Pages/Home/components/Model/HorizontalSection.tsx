import { useEffect, useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
  Environment,
} from "@react-three/drei"
import { Suspense } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)
useGLTF.preload("/model.glb")

export function HorizontalSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef(0)
  const clippingRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Mobile breakpoint
    }
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const totalWidth = track.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth - 100

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
            progressRef.current = self.progress
          },
        },
      })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 2,
        },
      })

      tl.to(
        ".clipping",
        {
          "--clip-1": "100%",
          ease: "cubic-bezier(0.19, 1, 0.22, 1)",
        },
        "a",
      )
      tl.to(
        ".model-row",
        {
          xPercent: -250,
          duration: 5,
        },
        +0.02,
      )
      tl.to(
        ".clipping",
        {
          "background-color": "var(--color-paper-fg)",
          color: "var(--color-paper)",
        },
        +0.8,
      )
      tl.from(
        ".tooltip .title",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.2
        },
        "b"
      )

      tl.to(
        ".divider",
        {
          scaleX: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.19, 1, 0.22, 1)",
          stagger: 0.2
        },
        "-=1.8"
      )

      tl.from(
        ".tooltip .description",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.2
        },
        "-=2"
      )
    }, section)
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => {
      ctx.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-full items-center gap-10 px-[40vw]">
        <div className="w-[150vw] h-[60vh] flex-shrink-0" />
      </div>

      {/* 3D Canvas overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={clippingRef}
          className="absolute clipping inset-0 w-full h-full text-(--color-paper-fg) bg-(--color-paper) pointer-events-none"
        >
          <div className="tooltips absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[75%] md:h-[75%] h-[90%] w-[90%] flex md:gap-[5rem] flex-col md:flex-row lg:gap-[15rem]">
            <div className="tooltip  flex-1 bg400 flex flex-col gap-[0.5rem]">

              <div className="title">
                <h2 className="text-2xl font-montmedium">Built to last</h2>
              </div>
              <div className="divider max-w-[420px] bg-(--color-paper) scale-x-0 relative w-full h-[1px] mt-[0.5rem]  origin-right"></div>
              <div className="description max-w-[400px]">
                <p>
                  Designed to match your pace, GRND runs all week on a single
                  charge. No interruptions, no slowing down.
                </p>
              </div>
            </div>
            <div className="tooltip flex-1 flex-col  gap-[0.5rem] justify-end items-end flex">
              <div className="title">
                <h2 className="text-2xl font-montmedium text-right ">Built to last</h2>
              </div>
              <div className="divider max-w-[420px] bg-(--color-paper) scale-x-0 relative w-full h-[1px] mt-[0.5rem]  origin-left"></div>
              <div className="description max-w-[400px]">
                <p>
                  Designed to match your pace, GRND runs all week on a single
                  charge. No interruptions, no slowing down.
                </p>
              </div>
            </div>
          </div>





          <div
            className={`row absolute top-1/2 left-full -translate-y-1/2 w-full py-2 flex flex-nowrap items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8`}
          >
            <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <h1 className="whitespace-nowrap model-row font-montbold text-8xl tracking-tight lg:text-[19em] ">
                ITS ALL START FROM
              </h1>
            </div>
          </div>
        </div>
        <Canvas camera={{ fov: 60, position: [0, 2, -50] }} dpr={[1, 2]}>
          <Environment preset="city" />
          <ambientLight intensity={5} />
          <directionalLight position={[0, 15, 15]} intensity={10} />

          <Suspense fallback={<Loader />}>
            <AnimatedModel isMobile={isMobile} progressRef={progressRef} />
          </Suspense>
          {!isMobile && <OrbitControls enableZoom={false} />}
        </Canvas>
      </div>
    </section>
  )
}

/* ---------------- MODEL ---------------- */

function AnimatedModel({ isMobile, progressRef }: { isMobile?: boolean, progressRef: any }) {
  const model = useGLTF("/model.glb")
  const groupRef = useRef<any>(null)
  const axis = useMemo(() => {
    const topPoint = new THREE.Vector3(0, 7, 0)
    const bottomPoint = new THREE.Vector3(0, 3, 0)

    return new THREE.Vector3().subVectors(bottomPoint, topPoint).normalize()
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    if (progressRef.current === undefined) return
    if (progressRef.current > 0.5) return
    const angle = progressRef.current * Math.PI * 2
    groupRef.current.position.set(0, 0, 0)
    groupRef.current.rotation.set(0, 0, 0)
    groupRef.current.rotateOnAxis(axis, angle)
  })
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={isMobile ? 12 : 24}>
      <primitive object={model.scene} />
    </group>
  )
}

/* ---------------- LOADER ---------------- */

function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="w-16 lg:w-32 h-2  rounded-full overflow-hidden">
        <div
          className="h-full bg-(--color-paper) text-(--color-paper) transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Html>
  )
}
