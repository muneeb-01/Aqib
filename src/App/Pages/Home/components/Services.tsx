import { useEffect, useRef, useState } from "react"

/* ─── Types ─────────────────────────────────────────────── */
interface ServiceItem {
  title: string
  description: string
  tags?: string[]
}

/* ─── Data ───────────────────────────────────────────────── */
const services: ServiceItem[] = [
  {
    title: "Visual Identity Systems",
    description:
      "Design cohesive identity systems — logos, colour palettes, typography, and iconography — that give your brand a distinctive and ownable visual language.",
    tags: ["Logo Design", "Colour Palettes", "Typography", "Icon Systems"],
  },
  {
    title: "Editorial & Print Design",
    description:
      "Produce beautifully crafted print collateral — magazines, lookbooks, brochures and posters — that command attention and communicate with clarity on every page.",
    tags: ["Magazines", "Lookbooks", "Posters", "Brochures"],
  },
  {
    title: "Packaging Design",
    description:
      "Create packaging that stands out on shelf and in hand. From structural dielines to surface graphics, we design packaging that earns its place in the world.",
    tags: [
      "Structural Design",
      "Surface Graphics",
      "Retail Packaging",
      "Labels",
    ],
  },
  {
    title: "Motion & Digital Graphics",
    description:
      "Bring your visual identity to life with animated assets, social content, and digital graphics engineered for every screen and format.",
    tags: ["Animation", "Social Content", "Digital Ads", "UI Graphics"],
  },
  {
    title: "Art Direction",
    description:
      "Guide photoshoots, video productions, and campaigns with a sharp creative vision — ensuring every visual output stays true to your brand world.",
    tags: [
      "Photography Direction",
      "Campaign Concepts",
      "Styling",
      "Retouching",
    ],
  },
]

/* ─── Responsive hook ────────────────────────────────────── */
const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return width
}

/* ─── ServiceRow ─────────────────────────────────────────── */
interface ServiceRowProps {
  service: ServiceItem
  index: number
  isLast: boolean
  isMobile: boolean
}

const ServiceRow: React.FC<ServiceRowProps> = ({
  service,
  index,
  isLast,
  isMobile,
}) => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // On mobile, always show content fully (no hover needed)
  const active = isMobile ? true : hovered

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 130 + 50)
    return () => clearTimeout(timer)
  }, [index])

  const num = String(index + 1).padStart(2, "0")

  return (
    <div
      ref={ref}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        padding: isMobile ? "24px 0" : "36px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(26,24,20,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        cursor: "pointer",
      }}
    >
      {/* Heading row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          marginBottom: "10px",
          overflow: "hidden",
        }}
      >
        {/* Number — slides in from left */}
        <span
          style={{
            fontFamily: "var(--font-neue-machina)",
            fontSize: isMobile ? "11px" : "clamp(11px, 1.1vw, 14px)",
            fontWeight: 300,
            color: "#9a9690",
            letterSpacing: "0.04em",
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0)" : "translateX(-18px)",
            transition: "opacity 0.32s ease, transform 0.32s ease",
            marginRight: active ? "10px" : "0px",
            minWidth: active ? "26px" : "0px",
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap" as const,
          }}
        >
          {num}
        </span>

        {/* Title — nudges right on hover */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: isMobile ? "22px" : "clamp(22px, 3.2vw, 42px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#1a1814",
            margin: 0,
            transform: active ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {service.title}
        </h2>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-neue-machina)",
          fontSize: isMobile ? "13px" : "14px",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "#4a4740",
          maxWidth: "420px",
          margin: 0,
          marginBottom: service.tags?.length ? "14px" : 0,
          opacity: active ? 1 : 0.6,
          transform: active ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {service.description}
      </p>

      {/* Tags — stagger in on hover */}
      {service.tags && service.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px" }}>
          {service.tags.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-neue-machina)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: active ? "#1a1814" : "#4a4740",
                padding: "4px 10px",
                border: `1px solid ${active ? "rgba(26,24,20,0.35)" : "rgba(26,24,20,0.18)"}`,
                borderRadius: "999px",
                opacity: active ? 1 : 0.5,
                transform: active ? "translateY(0)" : "translateY(5px)",
                transition: `opacity 0.28s ease ${i * 0.05}s, transform 0.28s ease ${i * 0.05}s, border-color 0.28s ease, color 0.28s ease`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Arrow icon ─────────────────────────────────────────── */
const ArrowIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ─── Main component ─────────────────────────────────────── */
export function BrandServices() {
  const [btnHovered, setBtnHovered] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const width = useWindowWidth()

  const isMobile = width < 640 // < 640px  → single column
  const isTablet = width >= 640 && width < 900 // 640–900px → narrower two-col

  useEffect(() => {
    const timer = setTimeout(() => setCtaVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile
            ? "40px 20px"
            : isTablet
              ? "48px 32px"
              : "60px 24px",
          fontFamily: "var(--font-neue-machina)",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "2fr 3fr"
                  : "1fr 1fr",
              gap: 0,
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: isMobile
                  ? "0 0 32px 0"
                  : isTablet
                    ? "40px 32px 40px 0"
                    : "48px 48px 48px 0",
                borderRight: isMobile
                  ? "none"
                  : "1px solid rgba(26,24,20,0.15)",
                borderBottom: isMobile
                  ? "1px solid rgba(26,24,20,0.15)"
                  : "none",
              }}
            >
              <div className="sticky top-5">
                {/* Pill label */}
                <span
                  style={{
                    fontFamily: "var(--font-neue-machina)",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    color: "#4a4740",
                    textTransform: "uppercase" as const,
                    padding: "5px 13px",
                    border: "1px solid rgba(26,24,20,0.2)",
                    borderRadius: "999px",
                    whiteSpace: "nowrap" as const,
                    display: "inline-block",
                  }}
                >
                  (What we can do)
                </span>

                <p
                  style={{
                    fontFamily: "var(--font-neue-machina)",
                    fontSize: isMobile ? "13px" : "13.5px",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "#4a4740",
                    marginTop: "24px",
                    maxWidth: isMobile ? "100%" : "280px",
                  }}
                >
                  We partner with graphic designers and creative studios to
                  build brand systems that are both beautiful and bulletproof —
                  designed to scale.
                </p>
              </div>

             
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div
              style={{
                padding: isMobile
                  ? "32px 0 0 0"
                  : isTablet
                    ? "0 0 0 32px"
                    : "0 0 0 48px",
                display: "flex",
                flexDirection: "column" as const,
              }}
            >
              {services.map((service, index) => (
                <ServiceRow
                  key={service.title}
                  service={service}
                  index={index}
                  isLast={index === services.length - 1}
                  isMobile={isMobile}
                />
              ))}

              {/* CTA Button */}
              <div
                style={{
                  paddingTop: isMobile ? "28px" : "44px",
                  paddingBottom: "8px",
                  opacity: ctaVisible ? 1 : 0,
                  transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <button
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: isMobile ? "center" : "flex-start",
                    gap: "10px",
                    fontFamily: "var(--font-neue-machina)",
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: 400,
                    color: btnHovered ? "#f0ede6" : "#1a1814",
                    backgroundColor: btnHovered ? "#1a1814" : "transparent",
                    border: "1.5px solid #1a1814",
                    borderRadius: "999px",
                    padding: isMobile ? "12px 24px" : "13px 26px",
                    width: isMobile ? "100%" : "auto",
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    transition: "background 0.22s ease, color 0.22s ease",
                    outline: "none",
                  }}
                >
                  See our Boring Work
                  <span
                    style={{
                      display: "inline-flex",
                      transform: btnHovered
                        ? "translateX(3px)"
                        : "translateX(0)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
