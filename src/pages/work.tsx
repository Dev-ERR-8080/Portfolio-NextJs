'use client'

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavigationDial from "@/components/circleNav/circleNav"
import { Floating } from "@/components/floating/floating"
import Image from "next/image"

type FeatureDetail = {
  heading: string
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

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false))
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  if (loading) {
    return <div className="text-center pt-32 text-gray-400">Loading Projects...</div>
  }

  if (!projects.length) {
    return <div className="text-center pt-32 text-red-400">No projects found.</div>
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="dark  text-white relative overflow-hidden flex flex-col gap-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black/90 pointer-events-none z-0" /> 
        <div className="absolute left-0 w-full h-full opacity-30 pointer-events-none z-0 overflow-hidden">
          <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,white,transparent_50%)] animate-pulse blur-3xl"></div>
        </div>

      {/* Background vignette & gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 pointer-events-none z-0" />
      
      <div className="absolute top-0 inset-0 bg-gradient-to-b from-black via-black/20 to-transparent pointer-events-none z-0" />
      

      <div className="relative top-0 z-10 rounded-xl overflow-hidden h-[80vh] md:h-[70vh] ">
        {/* image background with overlay */}
        <div className="absolute inset-0 z-0 top-0">
          <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
          <Image
            src={currentProject.background_url}
            alt="Project Preview"
            className="object-cover"
            loading="lazy"
            fill
            priority={false}
          />
        </div>

          {/* title and description */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-20">
            <div className="bg-gradient-to-tr from-gray-950 via-gray-950/75 to-transparent absolute inset-0 z-0" />
            <AnimatePresence mode="wait">
              <motion.div
                className="flex flex-col max-w-4xl relative z-30"
                key={currentProject.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-[68px] font-bold tracking-tight">
                  {currentProject.title}
                </h1>
                <p className="text-sm sm:text-lg text-gray-400 mt-4 leading-relaxed">
                  {currentProject.description}
                </p>
                <div className="flex items-center space-x-6 p-5">
                  <a
                    href={currentProject.github_url}
                    className="relative text-grey-300 underline-offset-1 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gray-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
                  >
                    View on GitHub
                  </a>
                  <a
                    href={currentProject.live_url}
                    className="relative text-black bg-white p-3 rounded-2xl transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:origin-left after:transition-transform after:duration-300 hover:text-black hover:after:scale-y-75"
                  >
                    View Live
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
      </div>
      {/* Project content */}
      <div className="flex flex-col relative z-10 h-[10%] p-10">
        <ProjectDetails key={currentProject.id} project={currentProject} />
      </div>
      {/* Navigation + Floating Action */}
      <div className="absolute right-10 bottom-10 z-30">
        <NavigationDial onClick={handleNext}  />
      </div>
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-20">
        <Floating />
      </div>
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)

  // Auto-switch every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % project.features.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [project.features.length])

  const currentFeature = project.features[currentFeatureIndex]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
      {/* LEFT → Feature details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature.id}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          {currentFeature.feature_details.map((detail, idx) => (
            <div key={idx} className="mb-6">
              {detail.heading && (
                <h5 className="text-xl font-semibold text-[#FF5733] mb-2">
                  {detail.heading}
                </h5>
              )}
              <p className="text-gray-300 leading-relaxed">{detail.description}</p>
              {detail.image_url && (
                <Image
                  src={detail.image_url}
                  alt={detail.heading || "Feature Detail"}
                  width={420}
                  height={280}
                  className="rounded-lg mt-3"
                />
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* RIGHT → Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {project.features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`p-6 rounded-xl shadow-md transition-all duration-500 ${
              idx === currentFeatureIndex
                ? "bg-gradient-to-r from-[#3c5a3c] to-[#2f402f] text-white shadow-lg"
                : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
            }`}
            onClick={() => setCurrentFeatureIndex(idx)}
          >
            <h4 className="text-lg font-medium">{feature.title}</h4>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
