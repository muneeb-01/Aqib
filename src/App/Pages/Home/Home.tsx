import {
  Landing,
  Marquee,
  Offer,
  ScrollScaleCardWrapper,
  Testimonial,
  Cta,
} from "./components"
import { Footer } from "../../common/components/Footer"

export function Home() {
  return (
    <section>
      <Landing />
      <Offer />
      <ScrollScaleCardWrapper />
      <Testimonial />
      <Marquee />
      <Cta />
      <Footer />
    </section>
  )
}
