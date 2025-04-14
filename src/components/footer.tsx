import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="bg-primary">
        <div className="border-sand-600 mx-auto flex max-w-[95vw] flex-col items-center border-b py-10 text-center md:py-14 lg:py-20">
          <h2 className="max-w-[800px] text-5xl leading-none font-semibold tracking-tight text-balance lg:text-6xl">
            Try the starter kit Now
            {/* <span className="text-sand-600">Your future won't wait.</span> */}
          </h2>
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 rounded-lg px-8 mt-9">
            Made with ❤️ by <Link href="https://github.com/Ajay01103">Ajay Singh</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
