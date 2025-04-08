import { Navbar } from "@/components/header"
import React from "react"

interface Props {
  children: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default LandingLayout
