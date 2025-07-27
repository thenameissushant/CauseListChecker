"use client"

import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export default function BackgroundEffects() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {theme === "dark" ? (
        // Dark Mode - Floating Bubbles
        <div className="absolute inset-0 bg-[#222629]">
          {/* Animated Bubbles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: `linear-gradient(45deg, #474B4F, #6B6E70)`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#474B4F]/10 to-[#6B6E70]/10"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#86C232]/5 to-transparent rounded-full blur-3xl"></div>
        </div>
      ) : (
        // Light Mode - Cloudy Smoky Effect
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50">
          {/* Cloud Effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-30 animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.8), rgba(240,240,240,0.4))`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 20 + 20}s`,
                filter: "blur(2px)",
              }}
            />
          ))}

          {/* Subtle Gradient Overlays */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#86C232]/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  )
}
