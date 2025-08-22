'use client'

import React, { useEffect, useRef, useState } from "react"
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect-button"
import NavigationDial from "@/components/circleNav/circleNav"
import { Floating } from "@/components/floating/floating"
import { Button } from "@/components/partials/button"
import { FaGithub } from "react-icons/fa"
import { LuArrowUpRight } from "react-icons/lu"

type FeatureDetail = {
  description: string
  image_url: string
}

type Feature = {
  id: string
  title: string
  feature_details: FeatureDetail[]
}

type Project = {
  id: string
  title: string
  description: string
  github_url: string
  live_url: string
  features: Feature[]
}

export default function test() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const vaporRef = useRef<any>(null)
  const vaporRefDescription = useRef<any>(null)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err))
  }, [])

  const handleNext = () => {
    vaporRef.current?.nextText()
    vaporRefDescription.current?.nextText()

    // Wait for vapor animation to complete before updating index
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 2500) // Wait same as vaporizeDuration
  }


  const handleSwitchAfterVapor = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  if (!projects.length) {
    return <div className="text-center pt-32 text-gray-400">Loading Projects...</div>
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="dark bg-[#18181b] text-white min-h-screen">

      {/* Gradient overlays */}
      <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-t from-transparent via-transparent to-black pointer-events-none z-10" />
      <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

      {/* Title and Preview */}
      <section className="min-h-[100dvh] p-6 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between max-w-7xl mx-auto">
          
          {/* Left - Title & Description */}
          <div className="w-full lg:w-[50%] flex flex-col justify-around">
            <div className="h-[180px] md:h-[220px]">
              <VaporizeTextCycle
                ref={vaporRef}
                key={projects[currentIndex]?.id}
                texts={projects.map((p: Project) => p.title)}
                
                tag={Tag.P}
                font={{
                  fontFamily: "mhiora",
                  fontSize: {
                    sm: "32px",
                    md: "44px",
                    lg: "64px",
                    xl: "92px"
                  },
                  fontWeight: 400,
                }}
                color="rgb(255,255,255)"
                spread={5}
                density={8}
                direction="left-to-right"
                alignment="left"
                animation={{
                  vaporizeDuration: 2,
                  fadeInDuration: 1.5,
                  waitDuration: 0.5,
                }}
                
              />
            </div>

            <div className="">
              <VaporizeTextCycle
                ref={vaporRefDescription}
                key={`description-${currentIndex}`}
                texts={projects.map((p: Project) => p.description)}
                tag={Tag.H1}
                font={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: {
                    sm: "14px",
                    md: "18px",
                    lg: "20px",
                    xl: "24px"
                  },
                  fontWeight: 100,
                }}
                color="rgb(155,155,155)"
                spread={5}
                density={5}
                direction="left-to-right"
                alignment="left"
                animation={{
                  vaporizeDuration: 2.5,
                  fadeInDuration: 1.5,
                  waitDuration: 0.5,
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-5 text-base">
                <a
                  href={currentProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-black"
                >
                  <FaGithub className="w-5 h-5" />
                  GitHub Repo
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="px-5 text-base underline-offset-4 hover:underline"
              >
                <a
                  href={currentProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400"
                >
                  Live Demo <LuArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="w-full lg:w-[50%]">
            <div className="aspect-video border border-gray-700 rounded-lg shadow-md overflow-hidden">
              <iframe
                src={currentProject.live_url}
                title="live demo"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Cards */}
      <div className="mt-20 pb-20 max-w-7xl mx-auto px-4">
        <ProjectDetails project={currentProject} />
      </div>

      {/* Floating UI */}
      <div className="fixed right-6 bottom-12 z-50">
        <NavigationDial onClick={handleNext} />
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-20">
        <Floating />
      </div>
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {project.features.map((feature) => (
        <div
          key={feature.id}
          className="bg-[#1F1F23] rounded-2xl p-6 shadow-xl border-l-2 border-b-2 border-gray-800 relative hover:shadow-2xl transition-all duration-300"
        >
          {/* Expand icon */}
          <div className="absolute top-4 right-4 text-white/60 hover:text-white border-s-2 border-green-400  rounded-full">
            <LuArrowUpRight className="w-5 h-5" />
          </div>

          {/* Feature title */}
          <h2 className="text-lg font-semibold text-white mb-4">{feature.title}</h2>

          {/* Feature details */}
          {feature.feature_details.map((detail, index) => (
            <div key={index} className="space-y-2 mb-4">
              <p className="text-sm text-gray-300">{detail.description}</p>
              {detail.image_url && (
                <div className="w-full h-40 overflow-hidden rounded-md border border-white/10">
                  <img
                    src={detail.image_url}
                    alt={`Feature ${feature.title}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

