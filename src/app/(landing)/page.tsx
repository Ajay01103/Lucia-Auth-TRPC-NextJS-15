// import { trpc } from "@/trpc/client"

import { Features } from "@/components/features"
import { Hero } from "@/components/hero"

export default function Home() {
  // const { data } = trpc.hello.useQuery({ text: "Ajay" })
  // const data = await trpc.hello({ text: "Ajay" })
  return (
    <div className="bg-[#EEECE7]">
      <Hero />
      <Features />
    </div>
  )
}
