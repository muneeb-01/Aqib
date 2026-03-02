import { FaQuoteRight, FaRegUser } from "react-icons/fa"

export function Testimonial() {
  return (
    <section className="py-[12vh] md:pr-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 sm:px-8 mx-auto max-w-[80%]">
        {/* LEFT (Sticky Text) */}
        <div className="lg:sticky lg:top-[10%] self-start">
          <div className="px-4 sm:px-6 py-4 rounded">
            <h2 className="craftr3 font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-left py-3">
              What Our <br className="hidden sm:flex" /> Customers Say
            </h2>
            <p className="craftr3 font-light text-[var(--color-secondary)] text-left text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque magni at pariatur eum vero repudiandae aliquid eligendi
              a architecto dolore rem reprehenderit ipsam tempore blanditiis
              incidunt amet excepturi. Harum, quibusdam!
            </p>
          </div>
        </div>

        {/* RIGHT (Testimonials) */}
        <div className="flex flex-col gap-6">
          {/* 1 - Right aligned */}
          <div className="flex justify-end">
            <div className="w-full sm:w-[80%] flex items-center gap-4 py-4 px-6 rounded-2xl border">
              <div className="h-12 flex justify-center items-center w-12 sm:h-24 sm:w-24 rounded-full overflow-hidden ">
                <FaRegUser className=" text-4xl md:text-6xl" />
              </div>
              <div className="flex-1">
                <h2 className="craftr4 text-xl sm:text-2xl font-semibold">
                  Karl Banson
                </h2>
                <p className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nesciunt maiores, laboriosam rerum voluptatem quaerat facere
                  accusantium, culpa optio quia porro.
                </p>
              </div>
              <div className="hidden sm:flex text-2xl  h-full">
                <FaQuoteRight />
              </div>
            </div>
          </div>

          {/* 2 - Left aligned */}
          <div className="flex justify-start">
            <div className="w-full sm:w-[80%] flex items-center gap-4 py-4 px-6 rounded-2xl border">
              <div className="h-12 flex justify-center items-center w-12 sm:h-24 sm:w-24 rounded-full overflow-hidden ">
                <FaRegUser className=" text-4xl md:text-6xl" />
              </div>
              <div className="flex-1">
                <h2 className="craftr4 text-xl sm:text-2xl font-semibold">
                  Sarah Lee
                </h2>
                <p className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nesciunt maiores, laboriosam rerum voluptatem quaerat facere
                  accusantium, culpa optio quia porro.
                </p>
              </div>
              <div className="hidden sm:block text-2xl  h-full">
                <FaQuoteRight />
              </div>
            </div>
          </div>

          {/* 3 - Right aligned */}
          <div className="flex justify-end">
            <div className="w-full sm:w-[80%] flex items-center gap-4 py-4 px-6 rounded-2xl border">
              <div className="h-12 flex justify-center items-center w-12 sm:h-24 sm:w-24 rounded-full overflow-hidden ">
                <FaRegUser className=" text-4xl md:text-6xl" />
              </div>
              <div className="flex-1">
                <h2 className="craftr4 text-xl sm:text-2xl font-semibold">
                  John Carter
                </h2>
                <p className="text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nesciunt maiores, laboriosam rerum voluptatem quaerat facere
                  accusantium, culpa optio quia porro.
                </p>
              </div>
              <div className="hidden sm:block text-2xl  h-full">
                <FaQuoteRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
