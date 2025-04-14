"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Add this array at the top of your file
const slides = [
  {
    id: 1,
    url: "https://streamline-nextjs-template.vercel.app/images/homepage/hero.webp",
    alt: "Streamline product interface showing Kanban",
  },
  {
    id: 2,
    url: "https://streamline-nextjs-template.vercel.app/images/homepage/hero2.webp",
    alt: "Streamline product interface showing Issues",
  },
  {
    id: 3,
    url: "https://streamline-nextjs-template.vercel.app/images/homepage/hero3.webp",
    alt: "Streamline product interface showing Add Issues",
  },
]

export const Hero = () => {
  return (
    <section className="bg-sand-100 relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:py-32">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-[1fr_0.68fr]">
        {/* <div className="to-foreground/27 absolute inset-x-0 bottom-0 z-10 -mr-[max(5rem,calc((100vw-80rem)/2+5rem))] h-px bg-linear-to-r from-transparent"></div> */}
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 md:space-y-8 lg:space-y-12">
          {/* Hero Title Section */}
          <div className="text-left">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-6xl">
              Are you a lucia fan ?
            </h1>
            <p className="mt-3 text-2xl leading-15 font-medium md:text-4xl lg:text-5xl">
              Struggling to add lucia to your app then you are at right place
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex max-w-[250px] gap-2.5 lg:gap-5">
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
                className="lucide lucide-circle-dot mt-1 size-4 shrink-0 lg:size-5"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                ></circle>
                <circle
                  cx="12"
                  cy="12"
                  r="1"
                ></circle>
              </svg>
              <div>
                <h2 className="font-inter font-semibold">Tailored workflows</h2>
                <p className="text-muted-foreground text-sm">
                  Track progress across custom issue flows for your team.
                </p>
              </div>
            </div>
            <div className="flex max-w-[250px] gap-2.5 lg:gap-5">
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
                className="lucide lucide-diamond mt-1 size-4 shrink-0 lg:size-5"
              >
                <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path>
              </svg>
              <div>
                <h2 className="font-inter font-semibold">Milestones</h2>
                <p className="text-muted-foreground text-sm">
                  Break projects down into concrete phases.
                </p>
              </div>
            </div>
            <div className="flex max-w-[250px] gap-2.5 lg:gap-5">
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
                className="lucide lucide-blend mt-1 size-4 shrink-0 lg:size-5"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                ></circle>
                <circle
                  cx="15"
                  cy="15"
                  r="7"
                ></circle>
              </svg>
              <div>
                <h2 className="font-inter font-semibold">Cross-team projects</h2>
                <p className="text-muted-foreground text-sm">
                  Collaborate across teams and departments.
                </p>
              </div>
            </div>
            <div className="flex max-w-[250px] gap-2.5 lg:gap-5">
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
                className="lucide lucide-chart-no-axes-column mt-1 size-4 shrink-0 lg:size-5"
              >
                <line
                  x1="18"
                  x2="18"
                  y1="20"
                  y2="10"
                ></line>
                <line
                  x1="12"
                  x2="12"
                  y1="20"
                  y2="4"
                ></line>
                <line
                  x1="6"
                  x2="6"
                  y1="20"
                  y2="14"
                ></line>
              </svg>
              <div>
                <h2 className="font-inter font-semibold">Progress insights</h2>
                <p className="text-muted-foreground text-sm">
                  Track scope, velocity, and progress over time.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center hover:opacity-90 bg-gray-900 justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow-sm h-9 px-4 py-2"
              aria-label="Get started"
            >
              Get started
            </Link>
            <a href="#Streamline-news">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 max-sm:hidden"
                aria-label="Streamline raises $12M from Roba Ventures"
              >
                <span className="flex items-center gap-2 text-start whitespace-pre-wrap">
                  Streamline raises $12M from Roba Ventures
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
                    className="lucide lucide-arrow-right size-4 stroke-3"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </a>
          </div>
        </div>
        <div className="relative -mr-[max(5rem,calc((100vw-80rem)/2+5rem))] shadow-xl max-lg:translate-x-10 lg:shadow-2xl">
          <Carousel />
        </div>
      </div>
      <div className="flex flex-col items-center font-medium mt-6 mb-8 lg:hidden">
        <div className="">
          <span className="text-sand-700">{/* 3 */}</span>
          <span className="text-primary">Add Issues</span>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Go to slide 1"
            className="py-2"
          >
            <div className="h-0.5 w-6 rounded-full transition-colors bg-primary/20 hover:bg-primary/40"></div>
          </button>
          <button
            aria-label="Go to slide 2"
            className="py-2"
          >
            <div className="h-0.5 w-6 rounded-full transition-colors bg-primary/20 hover:bg-primary/40"></div>
          </button>
          <button
            aria-label="Go to slide 3"
            className="py-2"
          >
            <div className="h-0.5 w-6 rounded-full transition-colors bg-primary"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="relative w-full min-h-[40rem] lg:min-h-[45rem]">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].url}
            alt={slides[currentIndex].alt}
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -1000 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover object-left-top rounded-t-xl"
            loading={currentIndex === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
