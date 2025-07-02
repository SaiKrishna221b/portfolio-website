import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="footer-content"
        >
          <div className="copyright">
            © {currentYear} G Sai Krishna. All rights reserved.
          </div>
          
          <div className="build-stack">
            Built with React + Vite + Framer Motion
          </div>
        </motion.div>
      </div>
    </footer>
  );
}