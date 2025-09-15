'use client'

import React, { useEffect, useRef, useState } from "react"
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect-button"
import NavigationDial from "@/components/circleNav/circleNav"
import { Floating } from "@/components/floating/floating"
// import Image from "next/image" // ✅ Uncomment if using next/image

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
  background_url: string
  live_url: string
  features: Feature[]
}

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const vaporRef = useRef<any>(null)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleNext = () => {
      vaporRef.current.nextText()
  }
  

  const handleSwitchAfterVapor = () => {
    console.log("[DEBUG] Switching to next project")
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  if (loading) {
    return <div className="text-center pt-32 text-gray-400">Loading Projects...</div>
  }

  if (!projects.length) {
    return <div className="text-center pt-32 text-red-400">No projects found.</div>
  }
  
  console.log("currentIndex:", currentIndex)
  const currentProject = projects[currentIndex]
  console.log("[DEBUG] Current Project:", currentProject)
  return (
    <div className="dark bg-[#18181b] p-10 text-white relative">

      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-t from-transparent via-transparent to-black pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      {/* Title - vapor animation */}
      <div className="">
        <div className="absolute top-[10%] left-[5%] opacity-50 pointer-events-none z-0">
          <img
          src={currentProject.background_url}
          alt="Project Preview"
          className="w-full h-full object-contain "
          loading="lazy"
        />
        </div>
          <div className="pt-24 pb-10 flex flex-col flex-initial max-w-4xl space-y-6 relative">
            <VaporizeTextCycle
              ref={vaporRef}
              texts={projects.map((p: Project) => p.title)}
              tag={Tag.H1}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "82px",
                fontWeight: 600,
              }}
              color="rgb(255, 255, 255)"
              spread={5}
              density={5}
              direction="left-to-right"
              alignment="left"
              animation={{
                vaporizeDuration: 2,
                fadeInDuration: 1.5,
                waitDuration: 0.5,
              }}
              onVaporizeComplete={handleSwitchAfterVapor}
            />
            <div>
              <p>{currentProject.description}</p>
            </div>
          </div>
      </div>
      {/* Project content */}
      <ProjectDetails key={currentProject.id} project={currentProject} />

      {/* Navigation and floating UI */}
      <div className="fixed right-10 bottom-10 z-10">
        <NavigationDial onClick={handleNext}/>
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center">
        <Floating />
      </div>
    </div>
  )
}

// function ProjectDetails({ project }: { project: Project }) {
//   return (
//     <div className="max-w-[100%] mx-auto px-6 space-y-6">

//       {/* 🔥 Animated Description */}
//       <div className="">
//         <p className="fonr-[20px]"> {project.description} </p>
//       </div>

//       <div className="flex justify-center space-x-6 text-blue-400">
//         <a href={project.github_url} target="_blank" rel="noreferrer">GitHub</a>
//         <a href={project.live_url} target="_blank" rel="noreferrer">Live Demo</a>
//       </div>

//       <div className="space-y-8 pt-8">
//         {project.features.map((feature) => (
//           <div key={feature.id}>
//             {/* 🔥 Animated Feature Title */}
//             <h1 className="text-[28px] font-[600] text-[#FF5733]"> {feature.title} </h1>

//             {feature.feature_details.map((detail, idx) => (
//               <div key={idx} className="pl-4 mt-2 space-y-2">
//                 {/* 🔥 Animated Feature Description */}
//                 <p className="text-[16px]"> {detail.description} </p>

//                 <img
//                   src={detail.image_url}
//                   alt={`Feature ${feature.title}`}
//                   className="rounded-lg shadow-lg w-full max-w-xl"
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
function ProjectDetails({ project }: { project: Project }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)

  // Auto-switch every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % project.features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [project.features.length])

  const currentFeature = project.features[currentFeatureIndex]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
      {/* LEFT SIDE → only feature description + background */}
      <div className="relative space-y-6">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20 -z-10">
          <img
            src={currentFeature.feature_details[0]?.image_url || project.background_url}
            alt="Feature Background"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Feature Title & Description */}
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
          {/* <h3 className="text-2xl font-semibold text-[#FF5733]">{currentFeature.title}</h3> */}
          {currentFeature.feature_details.map((detail, idx) => (
            <p key={idx} className="text-gray-200 mt-2">
              {detail.description}
            </p>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE → Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.features.map((feature, idx) => (
          <div
            key={feature.id}
            className={`p-6 rounded-xl shadow-md cursor-pointer transition-all duration-500 ${
              idx === currentFeatureIndex
                ? "bg-[#384837] text-white scale-105"
                : "bg-[#9bb99d] text-[#2e3b2d] hover:bg-gray-200"
            }`}
            onClick={() => setCurrentFeatureIndex(idx)}
          >
            <h4 className="text-lg font-semibold">{feature.title}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

