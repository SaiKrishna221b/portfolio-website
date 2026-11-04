import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef);
  return (
    <section ref={heroRef} className={`hero${isInView ? " is-in-view" : ""}`}>
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="personal-info"
          >
            <motion.div className="name-container">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hero-title"
              >
                G Sai Krishna
              </motion.h1>
              <div className="title-glow" />
              <div className="pink-glow" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.04 }}
              className="research-line"
            >
              Currently advancing Generative AI Research @ San Jose State University
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.08 }}
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
              transition={{ duration: 0.3, delay: 0.08 }}
              className="hero-subtitle"
            >
              Cloud Architect & AI Integration Expert
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className="location"
            >
              San Jose, CA
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <motion.a href="#experience" className="nav-link">Experience</motion.a>
          <motion.a href="#education" className="nav-link">Education</motion.a>
          <motion.a href="#projects" className="nav-link">Projects</motion.a>
          <motion.a href="#certifications" className="nav-link">Certifications</motion.a>
          <motion.a href="#about" className="nav-link">About Me</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
