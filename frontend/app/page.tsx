"use client"

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Results from "@/components/results"
import Footer from "@/components/footer"
import BackgroundEffects from "@/components/background-effects"
import { useState } from "react"

export interface SearchResult {
  id: string
  judgeName: string
  vcLink: string
  caseDetail: string
  itemNumber: string
  courtNumber: string
  matchedLine: string
}

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (
    keywords: string[],
    uploadType: "upload" | "link",
    file?: File,
    url?: string
  ) => {
    try {
      setIsSearching(true)

      const formData = new FormData()
      formData.append("keywords", JSON.stringify(keywords))

      if (uploadType === "upload" && file) {
        formData.append("file", file)
      } else if (uploadType === "link" && url) {
        formData.append("url", url)
      }

      const response = await fetch("/api/search", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to fetch results from the backend")
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Error during search:", error)
      alert("Something went wrong while searching. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const clearResults = () => {
    setResults([])
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        <BackgroundEffects />
        <Navbar />
        <main className="relative z-10">
          <Hero onSearch={handleSearch} isSearching={isSearching} />
          {results.length > 0 && <Results results={results} onClear={clearResults} />}
        </main>
        <Footer />

        {/* Search Loading Overlay */}
        {isSearching && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
              <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">Searching for keywords...</p>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
