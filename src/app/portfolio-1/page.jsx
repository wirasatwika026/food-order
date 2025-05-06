"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Portfolio1() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8 sm:py-16 text-center relative"
      >
        <nav className="absolute top-0 left-0 right-0 p-4 flex justify-center sm:justify-end space-x-4">
          <motion.a onClick={() => scrollToSection('top')} className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer" whileHover={{ scale: 1.1 }}>Home</motion.a>
          <motion.a onClick={() => scrollToSection('projects')} className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer" whileHover={{ scale: 1.1 }}>Projects</motion.a>
          <motion.a onClick={() => scrollToSection('skills')} className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer" whileHover={{ scale: 1.1 }}>Skills</motion.a>
          <motion.a onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer" whileHover={{ scale: 1.1 }}>Contact</motion.a>
        </nav>
        <div className="pt-12 sm:pt-0">
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold mb-4 font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            John Doe
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl mb-8 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Full Stack Developer & UI/UX Designer
          </motion.p>
        </div>
      </motion.header>

      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <section id="projects" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-colors flex flex-col"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-48 bg-slate-700/70 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">Dummy Image {item} (16:9)</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">Project {item}</h3>
                  <p className="text-slate-400 mb-4 flex-grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc.</p>
                  <motion.button 
                    className="mt-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded hover:from-cyan-600 hover:to-blue-600 transition-all self-start"
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.95}}
                  >
                    View Project
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {['React', 'Node.js', 'TypeScript', 'Next.js', 'TailwindCSS', 'MongoDB', 'GraphQL', 'Docker', 'Figma', 'JavaScript', 'HTML5', 'CSS3'].map((skill) => (
              <motion.div
                key={skill}
                className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg text-center border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>

      <motion.footer 
        id="contact"
        className="container mx-auto px-4 py-8 text-center scroll-mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-2xl text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-2xl text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-2xl text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <FaTwitter />
          </motion.a>
        </div>
      </motion.footer>
    </div>
  );
}
