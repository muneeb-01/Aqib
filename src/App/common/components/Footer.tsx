export function Footer() {
  return (
    <footer className="bg-(--color-paper) font-neue-machina flex justify-center items-center text-(--color-paper-fg) rounded-t-(--container-roundness) pt-24 pb-8">
      {/* Top Grid */}
      <div className="max-w-[1500px]">
      <div className="container mx-auto   px-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-16 mb-16">
        {/* Brand */}
        <div>
          <a href="#" className="text-2xl font-semibold">
            Nexus<span className="">.</span>
          </a>
          <p className="mt-4 max-w-[250px] ">
            High-end digital solutions for modern brands.
          </p>
        </div>

        {/* Agency Links */}
        <div>
          <h5 className="text-lg font-semibold mb-6">Agency</h5>
          <div className="space-y-4">
            <a href="#" className="block transition">
              About Us
            </a>
            <a href="#" className="block transition">
              Services
            </a>
            <a href="#" className="block transition">
              Careers
            </a>
          </div>
        </div>

        {/* Resources Links */}
        <div>
          <h5 className="text-lg font-semibold mb-6">Resources</h5>
          <div className="space-y-4">
            <a href="#" className="block transition">
              Case Studies
            </a>
            <a href="#" className="block transition">
              Blog
            </a>
            <a href="#" className="block transition">
              Process
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-lg font-semibold mb-6">Stay Updated</h5>
          <form className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3 rounded-full  border focus:outline-none focus:shadow-[0_0_10px_rgba(149,255,0,0.2)] transition"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-(--color-paper-fg) text-(--color-paper)   font-medium hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 pt-8 border-t border-[var(--surface-border)] flex flex-col md:flex-row justify-between items-center text-sm  gap-4">
        <p>&copy; 2026 Craftr-Studio. All rights reserved.</p>

        <div className="flex gap-8">
          <a href="#" className="hover:text-[var(--text-primary)] transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[var(--text-primary)] transition">
            Terms of Service
          </a>
        </div>
      </div>
      </div>
    </footer>
  )
}
