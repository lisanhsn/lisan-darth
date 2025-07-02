"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Calendar,
  Eye,
  Code,
  Globe,
  Filter,
  Search,
} from "lucide-react";
import { Project } from "@/types";
import {
  getFeaturedProjects,
  getLanguageColor,
  formatRelativeTime,
} from "@/lib/github";
import ProjectsBackground3D from "@/components/3d/ProjectsBackground3D";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (inView) {
      loadProjects();
    }
  }, [inView]);

  useEffect(() => {
    let filtered = projects;

    // Filter by language
    if (selectedLanguage !== "all") {
      filtered = filtered.filter(
        (project) => project.language === selectedLanguage
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedLanguage, searchTerm]);

  const languages = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.language).filter(Boolean))),
  ];

  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
  }) => (
    <motion.div
      className="glass-card glass-imperial p-4 sm:p-6 hover:glass-gold transition-all duration-300 group h-full holo-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-orbitron font-bold text-text-primary mb-2 group-hover:text-imperial-gold transition-colors heading-imperial holo-text">
            {project.name.replace(/-/g, " ").toUpperCase()}
          </h3>
          <p className="text-text-secondary text-sm opacity-90 leading-relaxed text-readable">
            {project.description}
          </p>
        </div>
        <div className="ml-4 flex space-x-2">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass-panel glass-imperial rounded-2xl hover:glass-gold transition-all duration-300"
          >
            <Github className="w-4 h-4 text-imperial-red" />
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-panel glass-gold rounded-2xl hover:scale-110 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4 text-imperial-gold" />
            </a>
          )}
        </div>
      </div>

      {/* Project Stats */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <div className="flex items-center space-x-1 text-imperial-gold glass-btn px-2 py-1 rounded-full">
          <Star className="w-4 h-4" />
          <span className="holo-text">{project.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-1 text-energy-blue glass-btn px-2 py-1 rounded-full">
          <GitFork className="w-4 h-4" />
          <span className="holo-text">{project.forks_count}</span>
        </div>
        <div className="flex items-center space-x-1 text-text-muted">
          <Calendar className="w-4 h-4" />
          <span>{formatRelativeTime(project.updated_at)}</span>
        </div>
      </div>

      {/* Language Badge */}
      {project.language && (
        <div className="mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium glass-panel border holo-text"
            style={{
              backgroundColor: `${getLanguageColor(project.language)}20`,
              borderColor: getLanguageColor(project.language),
              color: getLanguageColor(project.language),
            }}
          >
            <Code className="w-3 h-3 mr-1" />
            {project.language}
          </span>
        </div>
      )}

      {/* Topics */}
      {project.topics.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 glass-panel glass-imperial rounded-2xl text-xs text-text-secondary"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="px-2 py-1 text-xs text-imperial-gold holo-text">
                +{project.topics.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Imperial Classification */}
      <div className="border-t border-imperial-gray pt-4 glass-panel glass-imperial p-2 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs text-imperial-red font-orbitron font-bold heading-imperial holo-text">
            IMPERIAL CLASSIFIED
          </span>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3 text-imperial-gold" />
            <span className="text-xs text-imperial-gold holo-text">
              CLEARANCE LEVEL: {Math.floor(Math.random() * 10) + 1}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen py-10 sm:py-16 lg:py-20 bg-space-gradient overflow-hidden glass-section"
    >
      {/* Glass Overlay */}
      <div className="glass-overlay" />
      {/* 3D Background */}
      <ProjectsBackground3D />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-imperial-red rounded-3xl"
            style={{
              width: "100px",
              height: "80px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-imperial-red mb-4 sm:mb-6 sith-text holo-text"
            initial={{ scale: 0.5 }}
            animate={{ scale: inView ? 1 : 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            IMPERIAL ARCHIVES
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-imperial-gold font-exo max-w-3xl mx-auto mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Classified projects from the Imperial development division. Witness
            the technological supremacy of the dark side.
          </motion.p>

          {/* Controls */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Search */}
            <div className="relative glass-panel glass-imperial p-1 rounded-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-imperial-gold" />
              <input
                type="text"
                placeholder="Search Imperial archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white placeholder-imperial-gold placeholder-opacity-70 focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none w-64 glass-btn"
              />
            </div>

            {/* Language Filter */}
            <div className="relative glass-panel glass-imperial p-1 rounded-2xl">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-imperial-gold" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="pl-10 pr-8 py-2 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none appearance-none cursor-pointer glass-btn"
              >
                {languages.map((language) => (
                  <option
                    key={language}
                    value={language}
                    className="bg-space-dark text-imperial-white"
                  >
                    {language === "all" ? "All Technologies" : language}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-imperial-black bg-opacity-30 border border-imperial-gray rounded-3xl p-4 sm:p-6 animate-pulse"
              >
                <div className="h-6 bg-imperial-gray rounded mb-4"></div>
                <div className="h-4 bg-imperial-gray rounded mb-2"></div>
                <div className="h-4 bg-imperial-gray rounded mb-4 w-3/4"></div>
                <div className="flex space-x-4 mb-4">
                  <div className="h-4 bg-imperial-gray rounded w-16"></div>
                  <div className="h-4 bg-imperial-gray rounded w-16"></div>
                </div>
                <div className="h-6 bg-imperial-gray rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-imperial-red text-6xl mb-4">⚠</div>
                <h3 className="text-2xl font-orbitron font-bold text-imperial-red mb-2">
                  NO ARCHIVES FOUND
                </h3>
                <p className="text-imperial-gold">
                  The Empire has classified these documents. Try different
                  search terms.
                </p>
              </motion.div>
            )}

            {/* View All Projects */}
            {filteredProjects.length > 0 && (
              <motion.div
                className="text-center mt-8 sm:mt-12 lg:mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.a
                  href="https://github.com/LisanHsn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="imperial-button inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-orbitron font-bold text-imperial-white hover:text-imperial-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                  <span>VIEW ALL IMPERIAL PROJECTS</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </motion.div>
            )}
          </>
        )}

        {/* Imperial Quote */}
        <motion.div
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-imperial-black bg-opacity-50 border border-imperial-gold rounded-3xl p-4 sm:p-6 max-w-2xl mx-auto">
            <p className="text-lg text-imperial-red font-mono italic sith-text mb-2">
              "Impressive. Most impressive."
            </p>
            <p className="text-imperial-gold text-sm font-orbitron">
              - DARTH VADER
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
