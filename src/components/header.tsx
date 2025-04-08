export const Navbar = () => {
  return (
    <header className="sticky z-40 flex  max-w-6xl mx-auto">
      <div className="container">
        <div className="bg-opacity-15 border rounded-2xl flex items-center p-2 bg-background/70 backdrop-blur-sm">
          <div className="flex-1">
            <a
              className="flex font-bold items-center"
              href="/"
            >
              <span className="flex items-center justify-center size-7 lg:size-8 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun-dim size-5 lg:size-6 text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  ></circle>
                  <path d="M12 4h.01"></path>
                  <path d="M20 12h.01"></path>
                  <path d="M12 20h.01"></path>
                  <path d="M4 12h.01"></path>
                  <path d="M17.657 6.343h.01"></path>
                  <path d="M17.657 17.657h.01"></path>
                  <path d="M6.343 17.657h.01"></path>
                  <path d="M6.343 6.343h.01"></path>
                </svg>
              </span>
              <h5 className="text-lg lg:text-xl">Cosmic</h5>
            </a>
          </div>
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative z-10 max-w-max flex-1 items-center justify-center hidden lg:flex mx-auto"
          >
            <div style={{ position: "relative" }}>
              <ul
                data-orientation="horizontal"
                className="group flex flex-1 list-none items-center justify-center space-x-1"
                dir="ltr"
              >
                <li>
                  <a
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 !bg-transparent"
                    data-radix-collection-item=""
                    href="#solutions"
                  >
                    Solutions
                  </a>
                  <a
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 !bg-transparent"
                    data-radix-collection-item=""
                    href="#pricing"
                  >
                    Pricing
                  </a>
                  <a
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 !bg-transparent"
                    data-radix-collection-item=""
                    href="#team"
                  >
                    Team
                  </a>
                  <a
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 !bg-transparent"
                    data-radix-collection-item=""
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="absolute left-0 top-full flex justify-center"></div>
          </nav>
          <div className="hidden lg:flex flex-1 justify-end">
            <a
              aria-label="Get Template"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 btn-bezel bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ms-2"
              href="https://bundui.lemonsqueezy.com/buy/1bdac9fb-8246-494a-b28c-6c2ca6a28867"
            >
              Get Template
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
