"use client"

import { Twitter, Linkedin, Github, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#81892F] dark:bg-[#81892F] text-white py-12 mt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">About the Developer</h3>
            <div className="flex items-start space-x-4">
              {/* Round Image Container */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-150">
                 <img
                    src="/dev_img.png"
                   alt="Developer"
                   className="w-full h-full object-cover rounded-full"
                  />
                </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Sushant Jha</h4>
                <p className="text-gray-100 text-sm leading-relaxed">
                  Built with passion to help legal professionals efficiently search through cause lists and court
                  documents. This tool streamlines finding relevant case information.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Website Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Cause List Checker</h3>
            <p className="text-gray-100 text-sm leading-relaxed mb-4">
              A powerful tool for legal professionals to quickly search and analyze PDF documents, specifically cause
              lists and court documents. Upload documents or provide links to search for keywords and get detailed
              results.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://x.com/itz_sushantjha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/thenameissushant/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/thenameissushant"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="flex items-center justify-center space-x-2 text-gray-100 text-sm">
            <span>© 2025 Cause List Checker | Built with</span>
            <Heart className="w-4 h-4 text-white-400" />
            <span>for the legal community</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
