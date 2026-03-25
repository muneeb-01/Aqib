import {
  Landing,
  Offer,
  ScrollScaleCardWrapper,
  Testimonial,
  Cta,
  BrandServices,
  HorizontalSection
} from "./components"
import { Footer } from "../../common/components/Footer"

export function Home() {
  return (
    <section>
      <Landing />
      <Offer />
      <ScrollScaleCardWrapper />
      <HorizontalSection />
      <Testimonial />
      <BrandServices />
      <Cta />
      <Footer />
    </section>
  )
}
