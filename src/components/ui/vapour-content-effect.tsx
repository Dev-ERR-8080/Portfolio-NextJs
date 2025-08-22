// components/ui/vapour-content-effect.tsx
'use client'

import React, { forwardRef, useState, useImperativeHandle } from 'react'

type VaporizeContentProps = {
  content: React.ReactNode
  nextContent: React.ReactNode
  animationDuration?: number
  onComplete?: () => void
}

export type VaporizeContentHandle = {
  vaporize: () => void
}

const VaporizeContent = forwardRef<VaporizeContentHandle, VaporizeContentProps>(
  ({ content, nextContent, animationDuration = 1.5, onComplete }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const [showNext, setShowNext] = useState(false)
    const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([])

    useImperativeHandle(ref, () => ({
      vaporize: () => {
        setIsAnimating(true)
        setShowNext(false)
        
        // Create particles from current content position
        const newParticles = []
        for (let i = 0; i < 100; i++) {
          newParticles.push({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 3 + 1
          })
        }
        setParticles(newParticles)
        
        // Transition to next content
        setTimeout(() => {
          setShowNext(true)
          setTimeout(() => {
            setIsAnimating(false)
            onComplete?.()
          }, animationDuration * 500) // Half duration for fade in
        }, animationDuration * 500) // Half duration for fade out
      }
    }))

    return (
      <div className="relative">
        {/* Current content fading out */}
        <div 
          className={`transition-opacity duration-${animationDuration * 500}`}
          style={{
            opacity: isAnimating ? 0 : 1,
            pointerEvents: isAnimating ? 'none' : 'auto'
          }}
        >
          {content}
        </div>
        
        {/* Next content fading in */}
        {isAnimating && (
          <div 
            className={`transition-opacity duration-${animationDuration * 500}`}
            style={{
              opacity: showNext ? 1 : 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            {nextContent}
          </div>
        )}
        
        {/* Particles animation */}
        {isAnimating && !showNext && (
          <div className="fixed inset-0 pointer-events-none">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translateY(-${animationDuration * 100}px)`,
                  opacity: 0,
                  transition: `transform ${animationDuration}s ease-out, opacity ${animationDuration}s ease-out`
                }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

VaporizeContent.displayName = 'VaporizeContent'

export default VaporizeContent