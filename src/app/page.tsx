"use client";

import { Suspense } from "react";
import Navigation from "@/components/Navigation";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        contain: "layout style paint",
      }}
    >
      {/* Fixed Glassy Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <div
        className="relative"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen pt-16 sm:pt-20 flex items-center justify-center px-4"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-imperial-red to-imperial-gold bg-clip-text text-transparent"
              style={{ willChange: "transform" }}
            >
              DARTH LISAN
            </h1>
            <p className="text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-300">
              Dark Side Developer
            </p>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Welcome to the Imperial Portfolio. Experience the power of the
              dark side in web development.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-imperial-gold">
              About the Empire
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              I am Darth Lisan, a powerful developer who has mastered the dark
              side of coding.
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed px-4">
              With years of experience in modern web technologies, I bring order
              to the digital galaxy through clean code and elegant solutions.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          <div className="text-center text-white max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-imperial-red">
              Dark Powers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: "React", desc: "Frontend Mastery" },
                { name: "Next.js", desc: "Full Stack Power" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "Three.js", desc: "3D Excellence" },
              ].map((skill, index) => (
                <div
                  key={skill.name}
                  className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:bg-white/15 touch-manipulation"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          <div className="text-center text-white max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-imperial-gold">
              Imperial Archives
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div
                className="p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:bg-white/15"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Death Star Plans
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                  Ultimate weapon of mass development. Built with React and
                  Three.js for galactic domination.
                </p>
                <button
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-imperial-red text-white rounded-lg hover:bg-imperial-red/80 transition-all duration-200 touch-manipulation font-medium"
                  style={{
                    willChange: "transform",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  View Project
                </button>
              </div>
              <div
                className="p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:bg-white/15"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Imperial Fleet
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                  Command center for managing the galaxy's most powerful fleet
                  with real-time coordination.
                </p>
                <button
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-imperial-gold text-black rounded-lg hover:bg-imperial-gold/80 transition-all duration-200 touch-manipulation font-medium"
                  style={{
                    willChange: "transform",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  View Project
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-imperial-red">
              Join the Empire
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
              Ready to embrace the dark side? Contact me for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-imperial-red text-white rounded-lg hover:bg-imperial-red/80 transition-all duration-200 touch-manipulation font-medium"
                style={{
                  willChange: "transform",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Send Message
              </button>
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-imperial-gold text-imperial-gold rounded-lg hover:bg-imperial-gold hover:text-black transition-all duration-200 touch-manipulation font-medium"
                style={{
                  willChange: "transform",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Download CV
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-6 sm:py-8 bg-black border-t border-white/10"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <div className="text-center text-gray-400 px-4">
            <p className="text-sm sm:text-base">
              &copy; 2024 Darth Lisan. The Empire strikes back.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
