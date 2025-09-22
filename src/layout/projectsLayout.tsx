'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Button } from '@/components/partials/button' // Assuming you're using a UI library
import { Skeleton } from '@/components/partials/skeleton' // For loading states

type Particle = {
  x: number
  y: number
  originalX: number
  originalY: number
  previousX: number
  previousY: number
  color: string
  opacity: number
  originalAlpha: number
  velocityX: number
  velocityY: number
  angle: number
  speed: number
  shouldFadeQuickly?: boolean
  scale: number
  rotation: number
  rotationSpeed: number
  turbulence: number
}

type Project = {
  id: string
  title: string
  description: string
  github_url: string
  live_url: string
  features: Array<{
    id: string
    title: string
    feature_details: Array<{
      image_url?: string
      description: string
    }>
  }>
}

export function ProjectShowcase({ apiUrl }: { apiUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "ready">("ready")
  const [showContent, setShowContent] = useState(true)

  const vaporizeProgressRef = useRef(0)
  const fadeOpacityRef = useRef(0)

  // Configuration optimized for project showcase
  const config = useMemo(() => ({
    color: "rgb(255, 255, 255)",
    font: {
      fontFamily: "Inter, sans-serif",
      fontSize: "16px",
      fontWeight: 400
    },
    animation: {
      vaporizeDuration: 1200,
      fadeInDuration: 800
    },
    direction: "left-to-right" as const,
    spread: 3,
    density: 3,
    effects: {
      turbulence: 0.2,
      glow: false,
      trail: false,
      gravity: 0.05
    },
    particleSize: 1,
    background: "bg-gradient-to-br from-gray-900 to-gray-800"
  }), [])

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProjects(data)
        setAnimationState("ready")
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [apiUrl])

  // Convert project data to display content
  const projectToContent = (project: Project) => {
    return [
      `# ${project.title}`,
      project.description,
      "",
      "## Features:",
      ...project.features.map(feat => `- ${feat.title}: ${feat.feature_details[0].description}`),
      "",
      `[GitHub](${project.github_url}) | [Live Demo](${project.live_url})`
    ]
  }

  // Get all content sets from projects
  const contentSets = useMemo(() => projects.map(projectToContent), [projects])

  const startAnimation = () => {
    if (projects.length === 0) return
    setShowContent(false)
    setAnimationState("vaporizing")
    vaporizeProgressRef.current = 0
  }

  const nextProject = () => {
    if (projects.length === 0) return
    setCurrentProjectIndex(prev => (prev + 1) % projects.length)
    startAnimation()
  }

  const prevProject = () => {
    if (projects.length === 0) return
    setCurrentProjectIndex(prev => (prev - 1 + projects.length) % projects.length)
    startAnimation()
  }

  // Animation setup and effect
  useEffect(() => {
    if (animationState === "ready" || !containerRef.current || !canvasRef.current || !contentRef.current || projects.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    updateCanvasSize()

    const createParticles = (content: string[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Render content to hidden div
      contentRef.current!.innerHTML = content
        .map(line => line.startsWith('#') ? `<h1 class="text-2xl font-bold mb-4">${line.substring(2)}</h1>` : 
              line.startsWith('##') ? `<h2 class="text-xl font-semibold mb-3">${line.substring(3)}</h2>` :
              line.startsWith('-') ? `<li class="mb-2">${line.substring(2)}</li>` :
              line.startsWith('[') ? `<div class="flex gap-4 mt-4">${line}</div>` :
              line === "" ? `<br/>` : `<p class="mb-3">${line}</p>`)
        .join('')
      
      // Set canvas text style to match
      ctx.fillStyle = config.color
      ctx.font = `${config.font.fontWeight} ${config.font.fontSize} ${config.font.fontFamily}`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      
      // Draw all content
      const elements = contentRef.current!.children
      let yPos = 20
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (element instanceof HTMLElement) {
          const text = element.textContent || ''
          ctx.fillText(text, 20, yPos)
          yPos += element.offsetHeight
        }
      }
      
      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const particles: Particle[] = []
      
      // Sample and create particles
      const sampleRate = 5
      for (let y = 0; y < canvas.height; y += sampleRate) {
        for (let x = 0; x < canvas.width; x += sampleRate) {
          const index = (y * canvas.width + x) * 4
          const alpha = data[index + 3]
          
          if (alpha > 0) {
            const particle: Particle = {
              x,
              y,
              originalX: x,
              originalY: y,
              previousX: x,
              previousY: y,
              color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`,
              opacity: alpha / 255,
              originalAlpha: alpha / 255,
              velocityX: 0,
              velocityY: 0,
              angle: Math.random() * Math.PI * 2,
              speed: 0,
              scale: 1,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.1,
              turbulence: Math.random() * config.effects.turbulence
            }
            particles.push(particle)
          }
        }
      }
      
      particlesRef.current = particles
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Animation loop
    let lastTime = performance.now()
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      switch (animationState) {
        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 100
          const progress = Math.min(100, vaporizeProgressRef.current)

          let allVaporized = true
          particlesRef.current.forEach(particle => {
            const shouldVaporize = config.direction === "left-to-right"
              ? particle.originalX <= canvas.width * progress / 100
              : particle.originalX >= canvas.width * (1 - progress / 100)

            if (shouldVaporize) {
              if (particle.speed === 0) {
                particle.speed = Math.random() * config.spread + 1
                particle.angle = Math.random() * Math.PI * 2
                particle.velocityX = Math.cos(particle.angle) * particle.speed
                particle.velocityY = Math.sin(particle.angle) * particle.speed
                particle.shouldFadeQuickly = Math.random() > config.density / 10
              }

              particle.velocityY += config.effects.gravity
              particle.velocityX *= 0.98
              particle.velocityY *= 0.98
              particle.velocityX += (Math.random() - 0.5) * particle.turbulence
              particle.velocityY += (Math.random() - 0.5) * particle.turbulence

              particle.previousX = particle.x
              particle.previousY = particle.y
              particle.x += particle.velocityX
              particle.y += particle.velocityY
              particle.opacity *= particle.shouldFadeQuickly ? 0.92 : 0.96

              if (particle.opacity > 0.01) allVaporized = false

              if (particle.opacity > 0.01) {
                ctx.save()
                ctx.translate(particle.x, particle.y)
                ctx.rotate(particle.rotation)

                const particleColor = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`)
                ctx.fillStyle = particleColor
                ctx.fillRect(
                  -config.particleSize / 2, 
                  -config.particleSize / 2, 
                  config.particleSize, 
                  config.particleSize
                )

                ctx.restore()
              }
            } else {
              allVaporized = false
              ctx.fillStyle = particle.color
              ctx.fillRect(particle.x, particle.y, config.particleSize, config.particleSize)
            }
          })

          if (progress >= 100 && allVaporized) {
            const nextIndex = (currentProjectIndex + 1) % projects.length
            setCurrentProjectIndex(nextIndex)
            createParticles(contentSets[nextIndex])
            setAnimationState("fadingIn")
            fadeOpacityRef.current = 0
          }
          break
        }

        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 2.5
          const opacity = Math.min(1, fadeOpacityRef.current)

          particlesRef.current.forEach(particle => {
            particle.x = particle.originalX
            particle.y = particle.originalY
            particle.opacity = opacity * particle.originalAlpha

            ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`)
            ctx.fillRect(particle.x, particle.y, config.particleSize, config.particleSize)
          })

          if (opacity >= 1) {
            setAnimationState("static")
            setTimeout(() => {
              setShowContent(true)
            }, 300)
          }
          break
        }

        case "static": {
          particlesRef.current.forEach(particle => {
            ctx.fillStyle = particle.color
            ctx.fillRect(particle.x, particle.y, config.particleSize, config.particleSize)
          })
          break
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize with current project
    createParticles(contentSets[currentProjectIndex])
    animationFrameRef.current = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
      if (animationState === "vaporizing" || animationState === "fadingIn") {
        createParticles(contentSets[currentProjectIndex])
      }
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [config, contentSets, currentProjectIndex, animationState, projects.length])

  if (loading) {
    return (
      <div className={`relative w-full h-full ${config.background} p-8 rounded-xl flex items-center justify-center`}>
        <div className="space-y-4 w-full max-w-2xl">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-4/5" />
          <div className="space-y-3 mt-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex gap-4 mt-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`relative w-full h-full ${config.background} p-8 rounded-xl flex items-center justify-center`}>
        <div className="text-center text-red-400">
          <h3 className="text-xl font-bold mb-2">Error loading projects</h3>
          <p>{error}</p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className={`relative w-full h-full ${config.background} p-8 rounded-xl flex items-center justify-center`}>
        <div className="text-center text-gray-400">
          <h3 className="text-xl font-bold mb-2">No projects found</h3>
          <p>No project data available to display</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${config.background} p-8 rounded-xl`}>
      {/* Hidden div for rendering text */}
      <div 
        ref={contentRef} 
        className="absolute opacity-0 pointer-events-none w-full h-full p-8 text-white"
        style={{ zIndex: -1 }}
      />
      
      {/* Canvas for animation */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      {/* Actual content (shown when not animating) */}
      {showContent && (
        <div className="relative z-10 text-white h-full flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{projects[currentProjectIndex].title}</h1>
          <p className="mb-6 text-gray-300">{projects[currentProjectIndex].description}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Features:</h2>
            <ul className="space-y-2">
              {projects[currentProjectIndex].features.map(feat => (
                <li key={feat.id} className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <span className="font-medium">{feat.title}:</span> {feat.feature_details[0].description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 mt-auto">
            <Button asChild variant="outline">
              <a href={projects[currentProjectIndex].github_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
            <Button asChild>
              <a href={projects[currentProjectIndex].live_url} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      )}
      
      {/* Navigation controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        <Button 
          variant="outline" 
          size="icon"
          onClick={prevProject}
          disabled={animationState !== "static" && animationState !== "ready"}
        >
          ←
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={nextProject}
          disabled={animationState !== "static" && animationState !== "ready"}
        >
          →
        </Button>
        <Button 
          onClick={startAnimation}
          disabled={animationState !== "static" && animationState !== "ready"}
        >
          Vaporize
        </Button>
      </div>
    </div>
  )
}