import { Button } from "./Button"

export function Footer() {
  return (
    <footer className="pt-[11em] px-4">
      <div className="border rounded-t-[var(--container-roundness)] border-b-0 px-8 pt-[5em]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3em]  mx-auto">
          <div className="px-6 py-4 text-center rounded flex items-start">
            <h2 className="craftr3 font-extrabold text-6xl tracking-tight text-left py-3">
              Our Services and <br /> directions
            </h2>
          </div>
          <div className="px-6 py-4 text-center rounded flex items-end">
            <p className="craftr3 font-light text-[var(--color-secondary)] text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque magni at pariatur,
              <br /> eum vero repudiandae aliquid eligendi, a architecto dolore
              rem reprehenderit ipsam <br /> tempore blanditiis incidunt amet
              excepturi. Harum, quibusdam!
            </p>
          </div>
          <div className="col-span-full my-4 h-px bg-[var(--color-secondary)]"></div>
        </div>
        <div>
          <div className=" py-[14em]">
            <h2 className="craftr3 text-center font-extrabold text-6xl tracking-tight py-3">
              Tell me about your next project
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-[clamp(0.3rem,1vw,0.75rem)] mt-[clamp(0.5rem,1vw,1rem)] text-center">
              <Button name="About Us" />
              <Button name="Contact Us" />
            </div>
          </div>

          <div className="col-span-full h-px bg-[var(--color-secondary)]"></div>
        </div>

        <div className="py-6 flex justify-between text-[0.7em] sm:text-[1em] items-center">
          <div>
            <p>
              © 2025{" "}
              <a href="https://craftr-studio.vercel.app/">Craftr Studio</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p>Facebook</p>
            <p>LinkedIn</p>
            <p>Instagram</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
