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
            </motion.div>
            <motion.div
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p>3+ Years experience in:</p>
              <p>Distributed Systems 🚀 • Databases 💾 • API Security 🔒 • Making people laugh in boring meetings 😄</p>
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
              San Jose, CA
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="nav-link"
          >
            Projects
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' })}
            className="nav-link"
          >
            Certifications
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('resume').scrollIntoView({ behavior: 'smooth' })}
            className="nav-link"
          >
            Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}