import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import img1 from "../../../../assets/images/display.avif"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

export function Marquee() {
  // For Marquee
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".item h2").forEach((el: any) => {
        new SplitType(el, { types: "chars" })
      })

      const animateChars = (chars: Element[], reverse: boolean = false) => {
        gsap.fromTo(
          chars,
          {
            fontWeight: 100, // Start with thin font weight
          },
          {
            fontWeight: 800, // End with bold font weight
            duration: 1,
            ease: "none",
            stagger: {
              each: 0.35,
              from: reverse ? "start" : "end",
              ease: "linear",
            },
            scrollTrigger: {
              trigger: chars[0],
              start: "top 95%", // Start animating when the element enters the viewport from the bottom
              end: "bottom 5%", // End when the element is almost out of view
              scrub: true,
            },
          },
        )
      }

      const marqueeContainers = gsap.utils.toArray(
        ".marquee-container",
      ) as HTMLElement[]

      marqueeContainers.forEach((container, index) => {
        let startX = "0%"
        let endX = "-15%" // Default scroll direction (left)

        // Alternate scroll direction for odd/even index
        if (index % 2 === 0) {
          // Even indices (0, 2, ...) scroll right
          endX = "10%"
        } else {
          // Odd indices (1, 3, ...) scroll left
          endX = "-15%"
        }

        // Marquee horizontal scroll animation
        const marquee = container.querySelector(".marquee")
        gsap.fromTo(
          marquee,
          {
            x: startX,
          },
          {
            x: endX,
            ease: "cubic-bezier(0.165, 0.84, 0.44, 1)",
            scrollTrigger: {
              trigger: container,
              start: "top bottom", // Start when the container hits the bottom of the viewport
              end: "bottom top", // End when the container exits the top of the viewport
              scrub: 1.5,
              
            },
          },
        )

        // Character font weight animation
        const words = marquee?.querySelectorAll(".item.with-text h2")
        words?.forEach((word) => {
          // Use Array.from to convert NodeList to array for proper typing
          const chars = Array.from(word.querySelectorAll(".char")) as Element[]

          if (chars.length) {
            const reverse = index % 2 === 0 // Reverse stagger for even indices
            animateChars(chars, reverse)
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="overflow-x-hidden min-h-screen">
      {/* Marquee Section */}
      <section className="marquees flex flex-col justify-center py-20 bg-(--color-paper-fg) text-(--color-paper) shadow-2xl">
        {/* Marquee Container 1 (Even index: scroll right, stagger start) */}
        <div
          className="marquee-container relative w-[300%] sm:w-[220%] md:w-[170%] lg:w-[150%] h-[170px] md:h-[150px] lg:h-[250px] flex mb-4 overflow-hidden "
          id="marquee-1"
        >
          <div className="marquee w-full h-full absolute top-1/2 -translate-y-1/2 flex gap-4 md:-left-[15%] -left-[25%]">
            <MarqueeItem imgUrl={img1} text="DESIGN" />
            <MarqueeItem imgUrl={img1} text="UNIQUE" isText />
            <MarqueeItem imgUrl={img1} text="AESTHETICS" />
            <MarqueeItem imgUrl={img1} text="EXPERT" />
            <MarqueeItem imgUrl={img1} text="CREATIVE" />
          </div>
        </div>

        {/* Marquee Container 2 (Odd index: scroll left, stagger end) */}
        <div
          className="marquee-container relative w-[300%] sm:w-[220%] md:w-[170%] lg:w-[150%] h-[170px] md:h-[150px] lg:h-[250px] flex mb-4 overflow-hidden"
          id="marquee-2"
        >
          {/* Note: max-[900px]:-left-[35%] is applied via GSAP startX/endX logic to ensure smooth animation start/end points */}
          <div className="marquee w-full h-full absolute top-1/2 right-1/3  sm:left-0 -10 -translate-y-1/2 flex gap-4 md:left[-15%]">
            <MarqueeItem imgUrl={img1} text="BUILD" />
            <MarqueeItem imgUrl={img1} text="FLUID" />
            <MarqueeItem imgUrl={img1} text="MODERN" isText />
            <MarqueeItem imgUrl={img1} text="INTERACTIVE" />
            <MarqueeItem imgUrl={img1} text="CODE" />
          </div>
        </div>

        {/* Marquee Container 3 (Even index: scroll right, stagger start) */}
        <div
          className="marquee-container relative w-[300%] sm:w-[220%] md:w-[170%] lg:w-[150%] h-[170px] md:h-[150px] lg:h-[250px] flex mb-4 overflow-hidden"
          id="marquee-3"
        >
          <div className="marquee w-full h-full absolute top-1/2 -translate-y-1/2 flex gap-4 md:-left-[15%] -left-[22%]">
            <MarqueeItem imgUrl={img1} text="GSAP" />
            <MarqueeItem imgUrl={img1} text="DESIGN" isText />
            <MarqueeItem imgUrl={img1} text="DYNAMIC" />
            <MarqueeItem imgUrl={img1} text="REACT" />
            <MarqueeItem imgUrl={img1} text="DESIGN" />
          </div>
        </div>
      </section>
    </div>
  )
}

// Define a separate functional component for Marquee Item for clean JSX and reusability
interface MarqueeItemProps {
  imgUrl: string
  text: string
  isText?: boolean
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({
  imgUrl,
  text,
  isText = false,
}) => {
  if (isText) {
    // Item with text, applying the specific text styling
    return (
      <div className="item with-text transition-all duration-500 flex justify-center items-center flex-[0.7] lg:flex-[1.2]  uppercase text-[28px] md:text-[50px] lg:text-[70px] xl:text-[100px] 2xl:text-[120px] font-[100]  leading-none tracking-tight">
        <h2 className="select-none flex-nowrap">{text}</h2>
      </div>
    )
  }

  // Item with image
  return (
    <div className="item flex-1">
      <img
        src={imgUrl}
        alt="Creative Mockup"
        // Placeholder image styling
        className="h-full object-cover grayscale  hover:grayscale-0 w-full transition-all duration-500 ease-in-out"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = "https://placehold.co/400x300/800080/ffffff?text=Image" // Secondary fallback
        }}
      />
    </div>
  )
}