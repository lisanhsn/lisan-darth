"use client";

import { Suspense } from "react";
import Navigation from "@/components/Navigation";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Fixed Glassy Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <div className="relative">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen pt-20 flex items-center justify-center"
        >
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-imperial-red to-imperial-gold bg-clip-text text-transparent">
              DARTH LISAN
            </h1>
            <p className="text-2xl mb-8 text-gray-300">Dark Side Developer</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Welcome to the Imperial Portfolio. Experience the power of the
              dark side in web development.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-imperial-gold">
              About the Empire
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              I am Darth Lisan, a powerful developer who has mastered the dark
              side of coding.
            </p>
            <p className="text-lg text-gray-400">
              With years of experience in modern web technologies, I bring order
              to the digital galaxy through clean code and elegant solutions.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900"
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-imperial-red">
              Dark Powers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-2">React</h3>
                <p className="text-gray-400">Frontend Mastery</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-2">Next.js</h3>
                <p className="text-gray-400">Full Stack Power</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
                <p className="text-gray-400">Type Safety</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-2">Three.js</h3>
                <p className="text-gray-400">3D Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-imperial-gold">
              Imperial Archives
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Death Star Plans</h3>
                <p className="text-gray-400 mb-4">
                  Ultimate weapon of mass development. Built with React and
                  Three.js.
                </p>
                <button className="px-4 py-2 bg-imperial-red text-white rounded hover:bg-imperial-red/80 transition-colors">
                  View Project
                </button>
              </div>
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Imperial Fleet</h3>
                <p className="text-gray-400 mb-4">
                  Command center for managing the galaxy's most powerful fleet.
                </p>
                <button className="px-4 py-2 bg-imperial-gold text-black rounded hover:bg-imperial-gold/80 transition-colors">
                  View Project
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900"
        >
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-imperial-red">
              Join the Empire
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to embrace the dark side? Contact me for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-imperial-red text-white rounded-lg hover:bg-imperial-red/80 transition-colors">
                Send Message
              </button>
              <button className="px-8 py-3 border border-imperial-gold text-imperial-gold rounded-lg hover:bg-imperial-gold hover:text-black transition-colors">
                Download CV
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-white/10">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Darth Lisan. The Empire strikes back.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
