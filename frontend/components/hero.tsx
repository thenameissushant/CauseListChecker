"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, LinkIcon, Search, X } from "lucide-react"

interface HeroProps {
  onSearch: (keywords: string[], uploadType: "upload" | "link", file?: File, url?: string) => void
  isSearching: boolean
}

export default function Hero({ onSearch, isSearching }: HeroProps) {
  const [uploadType, setUploadType] = useState<"upload" | "link">("upload")
  const [keywords, setKeywords] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if (!keywords.trim()) return

    const keywordArray = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k)

    if (uploadType === "upload" && selectedFile) {
      onSearch(keywordArray, "upload", selectedFile)
    } else if (uploadType === "link" && pdfUrl.trim()) {
      onSearch(keywordArray, "link", undefined, pdfUrl)
    }
  }

  const handleClear = () => {
    setKeywords("")
    setPdfUrl("")
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Main Heading */}
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#86C232] to-[#81892F] bg-clip-text text-transparent leading-tight">
            Cause List Checker
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload or link your PDF documents and search for specific keywords with precision
          </p>
        </div>

        {/* Upload Type Selection */}
        <div className="flex justify-center space-x-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="uploadType"
              value="upload"
              checked={uploadType === "upload"}
              onChange={(e) => setUploadType(e.target.value as "upload")}
              className="w-5 h-5 text-[#86C232] focus:ring-[#86C232] focus:ring-2"
            />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#86C232] transition-colors duration-300">
              Upload PDF
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="uploadType"
              value="link"
              checked={uploadType === "link"}
              onChange={(e) => setUploadType(e.target.value as "link")}
              className="w-5 h-5 text-[#86C232] focus:ring-[#86C232] focus:ring-2"
            />
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#86C232] transition-colors duration-300">
              Paste PDF Link
            </span>
          </label>
        </div>

        {/* Input Fields */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* PDF Input */}
          {uploadType === "upload" ? (
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-[#86C232] dark:hover:border-[#86C232] transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-[#86C232] transition-colors duration-300" />
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {selectedFile ? selectedFile.name : "Click to upload PDF file"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">PDF files only</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="Enter PDF URL..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#86C232] focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              />
            </div>
          )}

          {/* Keywords Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords (comma separated)..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#86C232] focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleSearch}
              disabled={
                isSearching ||
                !keywords.trim() ||
                (uploadType === "upload" && !selectedFile) ||
                (uploadType === "link" && !pdfUrl.trim())
              }
              className="px-8 py-4 bg-gradient-to-r from-[#86C232] to-[#81892F] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
