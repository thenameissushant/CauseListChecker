"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import { Moon, Sun, Twitter, Linkedin, User, FileText } from "lucide-react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 dark:bg-[#222629]/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#86C232] to-[#81892F] shadow-lg group-hover:shadow-xl transition-all duration-300">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#86C232] to-[#81892F] bg-clip-text text-transparent group-hover:from-[#81892F] group-hover:to-[#86C232] transition-all duration-300">
              Cause List Checker
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="https://x.com/itz_sushantjha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#6B6E70] hover:text-[#86C232] hover:bg-[#86C232]/10 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/thenameissushant/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#6B6E70] hover:text-[#86C232] hover:bg-[#86C232]/10 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/thenameissushant/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#6B6E70] hover:text-[#86C232] hover:bg-[#86C232]/10 transition-all duration-300 transform hover:scale-110"
              >
                <User className="w-5 h-5" />
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
