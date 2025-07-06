import { motion } from 'framer-motion';
import SpaceBackground from './SpaceBackground';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <SpaceBackground />
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="personal-info"
          >
            <motion.div className="name-container">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hero-title"
              >
                G Sai Krishna
              </motion.h1>
              <motion.div 
                className="title-glow"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="pink-glow"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="experience-section"
            >
              <h2 className="experience-title">3 years experience in:</h2>
              <div className="experience-list">
                <span>Distributed Systems 🌐 </span>
                <span>Databases  💾</span>
                <span>API Security 🔒 </span>
                <span>Making people laugh in boring meetings 😄 </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="hero-subtitle"
            >
              Cloud Architect & AI Integration Expert
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="location"
            >
              San jose, CA
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.a href="#experience" className="nav-link">Experience</motion.a>
          <motion.a href="#education" className="nav-link">Education</motion.a>
          <motion.a href="#projects" className="nav-link">Projects</motion.a>
          <motion.a href="#certifications" className="nav-link">Certifications</motion.a>
          <motion.button className="nav-link">About Me</motion.button>
        </motion.div>
      </div>
    </section>
  );
}