import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei"
import { Suspense, useEffect, useState, useRef } from "react"
import { Center } from "@react-three/drei"
import { Environment } from "@react-three/drei"

// Loading component shown while model loads
const Loader = () => {
  const { progress, active } = useProgress()

  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-2 bg-transparent rounded-full overflow-hidden">
          <div
            className="h-full bg-(--color-secondary) transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 font-medium">
          {active ? `Loading ${progress.toFixed(0)}%` : "Ready"}
        </p>
      </div>
    </Html>
  )
}

const Model = ({ isMobile }: { isMobile?: boolean }) => {
  const model = useGLTF("/model.glb")
  const groupRef = useRef<any>(null)
  console.log(isMobile)
  return (
    <group ref={groupRef} >
      <Center>
        <primitive object={model.scene} />
      </Center>
    </group>
  )
}

// Preload the model for better performance
useGLTF.preload("/model.glb")

export function ModelViewer() {
  const [isMobile, setIsMobile] = useState(false)
  const [_dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Detect mobile and update dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Responsive camera settings
  const cameraSettings = {
    fov: isMobile ? 75 : 60,
    position: [0, 2, -50],
    near: 0.1,
    far: 1000,
  }

  return (
    <div className="w-full h-96 md:h-screen ">
      <Canvas
        camera={cameraSettings as any}
        dpr={[1, 2]} // Pixel ratio: min 1, max 2 for performance
        performance={{ min: 0.5 }} // Adaptive performance
      >
        <Environment preset="city" background={false} />
        <Suspense fallback={<Loader />}>
          <Model isMobile={isMobile} />
        </Suspense>

        <ambientLight intensity={0.05} />

        <directionalLight position={[5, 15, 15]} intensity={1} castShadow />
        <OrbitControls
          enableZoom={false} // Disable zoom on mobile
          enablePan={!isMobile}
          minDistance={50}
          maxDistance={200}
          // Smoother controls on mobile
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          // Touch-friendly settings
          touches={{
            ONE: isMobile ? 2 : 0, // Rotate with one finger on mobile
            TWO: isMobile ? 0 : 2,
          }}
        />
      </Canvas>
    </div>
  )
}
