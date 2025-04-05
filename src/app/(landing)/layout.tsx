import { Navbar } from "@/components/header"
import { type ReactNode } from "react"

function LandingPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <div className="h-20"></div> */}
      {/* <Footer /> */}
    </>
  )
}

export default LandingPageLayout
