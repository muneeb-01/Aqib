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
            progressRef.current = self.progress
          },
        },
      })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance / 3}`,
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
        <div className="w-[80vw] h-[60vh] flex-shrink-0" />
        <div className="w-[80vw] h-[60vh] flex-shrink-0" />
        <div className="w-[80vw] h-[60vh] flex-shrink-0" />
        <div className="w-[80vw] h-[60vh] flex-shrink-0" />
      </div>

      {/* 3D Canvas overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={clippingRef}
          className="absolute clipping inset-0 w-full h-full bg-(--color-paper) pointer-events-none"
        ></div>
        <Canvas camera={{ fov: 60, position: [0, 2, -50] }} dpr={[1, 2]}>
          <Environment preset="city" />
          <ambientLight intensity={5} />
          <directionalLight position={[0, 15, 15]} intensity={10} />

          <Suspense fallback={<Loader />}>
            <AnimatedModel progressRef={progressRef} />
          </Suspense>
          {!isMobile && <OrbitControls enableZoom={false} />}
        </Canvas>
      </div>
    </section>
  )
}

/* ---------------- MODEL ---------------- */

function AnimatedModel({ progressRef }: { progressRef: any }) {
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
    const angle = progressRef.current * Math.PI * 2
    groupRef.current.position.set(0, 0, 0)
    groupRef.current.rotation.set(0, 0, 0)
    groupRef.current.rotateOnAxis(axis, angle)
  })
  return (
    <group ref={groupRef} scale={24}>
      <primitive object={model.scene} />
    </group>
  )
}

/* ---------------- LOADER ---------------- */

function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="w-32 h-2  rounded-full overflow-hidden">
        <div
          className="h-full bg-(--color-paper) text-(--color-paper) transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Html>
  )
}
