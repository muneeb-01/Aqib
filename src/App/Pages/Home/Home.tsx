import {
  Landing,
  Marquee,
  Offer,
  ScrollScaleCardWrapper,
  Testimonial,
  Cta,
  BrandServices,
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
      <BrandServices />
      <Cta />
      <Footer />
    </section>
  )
}
