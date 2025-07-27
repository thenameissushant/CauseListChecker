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

  const handleSearch = async (keywords: string[], uploadType: "upload" | "link", file?: File, url?: string) => {
    setIsSearching(true)

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResults: SearchResult[] = [
      {
        id: "1",
        judgeName: "Hon'ble Justice Rajesh Kumar",
        vcLink: "https://example.com/vc/court1",
        caseDetail: "Religare Finvest Limited vs. ABC Corporation & Others",
        itemNumber: "15",
        courtNumber: "Court No. 3",
        matchedLine: `Found keyword "${keywords[0]}" in: The petitioner Religare Finvest Limited has filed this application...`,
      },
      {
        id: "2",
        judgeName: "Hon'ble Justice Priya Sharma",
        vcLink: "https://example.com/vc/court2",
        caseDetail: "State Bank of India vs. XYZ Enterprises",
        itemNumber: "23",
        courtNumber: "Court No. 7",
        matchedLine: `Found keyword "${keywords[0]}" in: The respondent bank has submitted that the loan amount...`,
      },
    ]

    setResults(mockResults)
    setIsSearching(false)
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
