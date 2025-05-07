"use client";

import React from 'react';
import { motion } from 'framer-motion';
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
  FaUserAstronaut
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiFigma, SiAdobexd, SiMongodb, SiExpress } from 'react-icons/si';

export default function Portfolio2() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate header height dynamically if possible, or use a fixed offset
      // For this example, using a fixed offset.
      const headerOffset = 80; // Adjust this value based on your fixed header's height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  };

  const projects = [
    {
      title: "Cosmic Canvas",
      description: "A generative art platform where users can create and share unique space-themed visuals. Built with Next.js, p5.js, and Framer Motion for dynamic interactions.",
      imageIcon: FaPaintBrush,
      tags: ["Next.js", "p5.js", "Framer Motion", "MongoDB"],
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      title: "AI Story Weaver",
      description: "An interactive storytelling application powered by AI. Users collaborate with an AI to create branching narratives. Features a sleek, modern UI with Tailwind CSS.",
      imageIcon: FaLightbulb,
      tags: ["React", "Node.js", "Express", "OpenAI API", "Tailwind CSS"],
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      title: "Dev-Portfolio Hub",
      description: "A customizable portfolio template generator for developers. Allows users to quickly create and deploy their personal websites.",
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

  const experiences = [
    {
      role: "Senior Frontend Engineer",
      company: "Innovatech Solutions",
      duration: "Jan 2022 - Present",
      description: "Leading the development of cutting-edge web applications using React, Next.js, and modern JavaScript frameworks. Mentoring junior developers and driving UI/UX best practices.",
    },
    {
      role: "Web Developer",
      company: "Creative Digital Agency",
      duration: "Jun 2019 - Dec 2021",
      description: "Developed and maintained responsive websites and e-commerce platforms for diverse clients. Collaborated closely with designers and project managers to deliver high-quality products.",
    },
    {
      role: "UI/UX Design Intern",
      company: "PixelPerfect Studios",
      duration: "Jan 2019 - May 2019",
      description: "Assisted in designing user interfaces, creating wireframes and prototypes, and conducting user research for various mobile and web projects.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-800 text-gray-200 font-sans antialiased">
      {/* Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur-lg shadow-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
          >
            Alice W.
          </motion.div>
          <nav className="hidden sm:flex space-x-5">
            {['Home', 'About', 'Portfolio', 'Experience', 'Skills', 'Contact'].map((item) => (
              <motion.a
                key={item}
                onClick={() => scrollToSection(item === 'Home' ? 'top' : item.toLowerCase())}
                className="text-gray-300 hover:text-pink-400 transition-colors cursor-pointer text-sm font-medium"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          {/* Mobile menu button can be added here */}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="top" className="min-h-screen flex flex-col items-center justify-center text-center pt-24 sm:pt-28 px-4 relative overflow-hidden">
        {/* Background animated shapes (optional) */}
        <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-20 filter blur-2xl animate-pulse-slow"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, delay: 1 }}
        />
        <motion.div 
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-600 rounded-lg opacity-20 filter blur-2xl animate-pulse-slower"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 2, delay: 1.5 }}
        />

        <motion.div
          className="z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
              Alice Wonderland
            </span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            Creative Frontend Developer & UI/UX Enthusiast, crafting delightful digital experiences with code and pixels.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection('portfolio')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-lg shadow-lg transform transition-all duration-300 ease-out text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <motion.section 
          id="about" 
          className="py-16 sm:py-24 scroll-mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            About <span className="text-pink-400">Me</span>
          </h2>
          <motion.div 
            className="max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              Hello! I'm Alice, a passionate frontend developer with a keen eye for UI/UX design. I specialize in building responsive, performant, and visually appealing web applications using modern technologies like React, Next.js, and Tailwind CSS.
            </p>
            <p>
              My journey into web development started with a fascination for how design and technology intersect to create meaningful user experiences. I thrive on transforming complex problems into intuitive and elegant digital solutions. When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or lost in a good sci-fi novel.
            </p>
          </motion.div>
        </motion.section>

        {/* Portfolio Section */}
        <motion.section 
          id="portfolio" 
          className="py-16 sm:py-24 scroll-mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            My <span className="text-pink-400">Creations</span>
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                variants={listItemVariants}
                className="bg-slate-800/70 p-6 rounded-xl shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 ease-out flex flex-col"
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(236, 72, 153, 0.2)" }}
              >
                <div className="w-full h-48 bg-slate-700 rounded-lg mb-6 flex items-center justify-center">
                  <project.imageIcon className="text-6xl text-pink-400 opacity-70" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-pink-400">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
                <div className="mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="inline-block bg-slate-700 text-pink-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto pt-4 border-t border-slate-700">
                  <motion.a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-pink-400 transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaExternalLinkAlt className="mr-2" /> Live Demo
                  </motion.a>
                  <motion.a 
                    href={project.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-pink-400 transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaCode className="mr-2" /> Source Code
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          id="experience" 
          className="py-16 sm:py-24 scroll-mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            Work <span className="text-pink-400">Journey</span>
          </h2>
          <motion.div 
            className="max-w-3xl mx-auto space-y-12"
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                variants={listItemVariants}
                className="flex"
              >
                <div className="mr-6 pt-1">
                  <FaBriefcase className="text-3xl text-pink-400" />
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg flex-1">
                  <h3 className="text-xl font-semibold text-pink-300 mb-1">{exp.role}</h3>
                  <p className="text-md text-gray-400 mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                  <p className="text-gray-300 leading-relaxed text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="py-16 sm:py-24 scroll-mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            My <span className="text-pink-400">Arsenal</span>
          </h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8"
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                variants={listItemVariants}
                className="bg-slate-800/70 p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-center aspect-square"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 15px ${skill.color}33`, // 33 for opacity
                  borderColor: skill.color 
                }}
                style={{ border: '2px solid transparent' }}
                transition={{ duration: 0.2 }}
              >
                <skill.icon className="text-5xl mb-3" style={{ color: skill.color }} />
                <p className="text-sm font-medium text-gray-300">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-16 sm:py-24 scroll-mt-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Let's <span className="text-pink-400">Connect</span>
          </h2>
          <motion.form 
            className="max-w-xl mx-auto space-y-6 bg-slate-800/70 p-8 rounded-xl shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors" 
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors" 
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows="5" 
                className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                placeholder="Your message..."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-out"
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(236, 72, 153, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="py-10 mt-16 border-t border-slate-700/50 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center space-x-6 mb-6">
          <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2, y: -2 }}>
            <FaGithub size={28} />
          </motion.a>
          <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2, y: -2 }}>
            <FaLinkedin size={28} />
          </motion.a>
          <motion.a href="mailto:alice@example.com" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2, y: -2 }}>
            <FaEnvelope size={28} />
          </motion.a>
        </div>
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Alice Wonderland. All rights reserved.</p>
        <p className="text-xs text-gray-600 mt-2">Crafted with <span className="text-pink-500">&hearts;</span> using Next.js & Tailwind CSS.</p>
      </motion.footer>
      
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
            animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
