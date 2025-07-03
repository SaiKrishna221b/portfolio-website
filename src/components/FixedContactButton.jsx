import { motion } from 'framer-motion';
import './FixedContactButton.css';

export default function FixedContactButton() {
  return (
    <div className="fixed-contact-button-container">
      <div className="contact-wrapper">
        <motion.button
          className="contact-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect!
        </motion.button>
        <div className="contact-dropdown">
          <a href="mailto:sai.krishna221b@gmail.com" className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>Email</span>
          </a>
          <a href="https://linkedin.com/in/gsaikrishna221" target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">💼</span>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/SaiKrishna221b" target="_blank" rel="noopener noreferrer" className="contact-item">
            <span className="contact-icon">💻</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}