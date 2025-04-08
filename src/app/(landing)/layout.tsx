import { Header } from "@/components/navbar"
import React from "react"

interface Props {
  children: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default LandingLayout
