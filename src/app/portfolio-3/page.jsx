"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaPaintBrush,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaExternalLinkAlt,
  FaCode,
  FaBriefcase,
  FaLightbulb,
  FaUserAstronaut,
  FaBook,
  FaAward,
  FaArrowUp,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiAdobexd,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

// New Education Section Data
const education = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "Tech University",
    year: "2018 - 2022",
    icon: FaBook,
    description: "Graduated with honors, focusing on web development and UI/UX design.",
  },
  {
    degree: "Certified Frontend Developer",
    institution: "Online Academy",
    year: "2023",
    icon: FaAward,
    description: "Completed a professional certification in modern frontend frameworks.",
  },
];

// New Experience Section Data
const experience = [
  {
    role: "Frontend Developer",
    company: "Creative Web Studio",
    period: "2022 - Present",
    icon: FaBriefcase,
    description: "Building interactive and responsive web applications using React and Next.js.",
  },
  {
    role: "UI/UX Designer",
    company: "Designify",
    period: "2021 - 2022",
    icon: FaPaintBrush,
    description: "Designed user interfaces and experiences for SaaS products and mobile apps.",
  },
];

const projects = [
  {
    title: "Cosmic Canvas",
    description:
      "A generative art platform where users can create and share unique space-themed visuals. Built with Next.js, p5.js, and Framer Motion for dynamic interactions.",
    imageIcon: FaPaintBrush,
    tags: ["Next.js", "p5.js", "Framer Motion", "MongoDB"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "AI Story Weaver",
    description:
      "An interactive storytelling application powered by AI. Users collaborate with an AI to create branching narratives. Features a sleek, modern UI with Tailwind CSS.",
    imageIcon: FaLightbulb,
    tags: ["React", "Node.js", "Express", "OpenAI API", "Tailwind CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Dev-Portfolio Hub",
    description:
      "A customizable portfolio template generator for developers. Allows users to quickly create and deploy their personal websites.",
    imageIcon: FaUserAstronaut,
    tags: ["Next.js", "TypeScript", "Vercel", "Chakra UI"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "JavaScript (ES6+)", icon: FaJsSquare, color: "#F7DF1E" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
  { name: "UI/UX Design", icon: FaPaintBrush, color: "#A855F7" },
];

const socialLinks = [
  {
    icon: FaGithub,
    url: "https://github.com/",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    url: "https://linkedin.com/",
    label: "LinkedIn",
  },
  {
    icon: FaEnvelope,
    url: "mailto:hello@example.com",
    label: "Email",
  },
];

// Smooth scroll handler
function handleSmoothScroll(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Portfolio3() {
  // Add scroll-behavior: smooth to html element for fallback
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.scrollBehavior = "";
      }
    };
  }, []);

  // Floating Action Button: Show when scrolled down
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <FaUserAstronaut className="text-4xl text-indigo-400" />
          <span className="text-2xl font-bold tracking-tight">Wirasatwika</span>
        </motion.div>
        <nav className="flex gap-6 mt-4 md:mt-0">
          <a
            href="#about"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "about")}
          >
            About
          </a>
          <a
            href="#education"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "education")}
          >
            Education
          </a>
          <a
            href="#experience"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "experience")}
          >
            Experience
          </a>
          <a
            href="#skills"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "skills")}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "projects")}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-indigo-400 transition"
            onClick={e => handleSmoothScroll(e, "contact")}
          >
            Contact
          </a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="about" className="py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Hi, I'm <span className="text-indigo-400">Wirasatwika</span> 👋
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Creative full-stack developer passionate about building interactive web experiences and generative art. I love blending code, design, and animation to craft memorable digital products.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl hover:text-indigo-400 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1"
          >
            <div className="bg-gray-900 rounded-full p-6 md:p-10 flex items-center justify-center shadow-lg">
              <FaUserAstronaut className="text-7xl md:text-8xl text-indigo-300" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-6 md:px-16 bg-gray-900/60">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Education
        </motion.h2>
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
          {education.map(({ degree, institution, year, icon: Icon, description }) => (
            <motion.div
              key={degree + institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="bg-gray-800/80 rounded-lg p-6 flex flex-col gap-2 shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="text-2xl text-indigo-400" />
                <div>
                  <div className="font-semibold">{degree}</div>
                  <div className="text-sm text-gray-400">{institution}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-1">{year}</div>
              <div className="text-gray-300 text-sm">{description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Experience
        </motion.h2>
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
          {experience.map(({ role, company, period, icon: Icon, description }) => (
            <motion.div
              key={role + company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="bg-gray-900/80 rounded-lg p-6 flex flex-col gap-2 shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="text-2xl text-indigo-400" />
                <div>
                  <div className="font-semibold">{role}</div>
                  <div className="text-sm text-gray-400">{company}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-1">{period}</div>
              <div className="text-gray-300 text-sm">{description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 md:px-16 bg-gray-900/60">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Skills & Tools
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto"
        >
          {skills.map(({ name, icon: Icon, color }) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex flex-col items-center bg-gray-800/80 rounded-lg p-4 shadow hover:scale-105 transition"
            >
              <Icon className="text-3xl mb-2" style={{ color }} />
              <span className="text-sm text-gray-200">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Projects
        </motion.h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(
            ({ title, description, imageIcon: Icon, tags, liveUrl, sourceUrl }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-3xl text-indigo-400" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <p className="text-gray-300 mb-4 flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:underline"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    Live
                  </a>
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-indigo-300 transition"
                  >
                    <FaCode className="text-sm" />
                    Code
                  </a>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 md:px-16 bg-gray-900/60">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Contact
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto bg-gray-800/80 rounded-lg p-8 flex flex-col gap-6 shadow"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for reaching out!");
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="rounded px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="rounded px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-gray-200">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="rounded px-3 py-2 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03, backgroundColor: "#6366f1" }}
            type="submit"
            className="bg-indigo-500 text-white font-semibold py-2 rounded shadow hover:bg-indigo-600 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      {/* Floating Action Button for Back to Top */}
      {showFab && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="fixed z-50 bottom-8 right-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <FaArrowUp className="text-2xl" />
        </motion.button>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Wirasatwika. All rights reserved.
      </footer>
    </main>
  );
}
