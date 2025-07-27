"use client"

import type { SearchResult } from "@/app/page"
import { ExternalLink, User, Building, Hash, MapPin, FileText, X } from "lucide-react"

interface ResultsProps {
  results: SearchResult[]
  onClear: () => void
}

export default function Results({ results, onClear }: ResultsProps) {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Search Results</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Found {results.length} matching result{results.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Results Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
          <div className="max-h-96 overflow-y-auto space-y-6 custom-scrollbar">
            {results.map((result, index) => (
              <div
                key={result.id}
                className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 dark:border-gray-600"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Judge Name</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.judgeName}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <ExternalLink className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">VC Link</p>
                        <a
                          href={result.vcLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-[#86C232] hover:text-[#81892F] transition-colors duration-300 hover:underline"
                        >
                          Join Video Conference
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Case Detail</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.caseDetail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Hash className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Number</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.itemNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Building className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Court Number</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.courtNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-[#86C232] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Matched Line</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-[#86C232]">
                          {result.matchedLine}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Results Button */}
        <div className="text-center">
          <button
            onClick={onClear}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <X className="w-5 h-5" />
            <span>Clear Results</span>
          </button>
        </div>
      </div>
    </section>
  )
}
