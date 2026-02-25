import { useEffect } from "react"
import Lenis from "lenis"
import { Home } from "./Pages/Home/Home"

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  })

  return (
    <>
      <section className="relative">
        <Home />
      </section>
    </>
  )
}

export default App
