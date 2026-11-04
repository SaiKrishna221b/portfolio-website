import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Connect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const escape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [isOpen]);

  const links = [
    {
      name: 'Email',
      url: 'mailto:sai.krishna221b@gmail.com',
      icon: '📧'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/gsaikrishna221',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/SaiKrishna221b',
      icon: '💻'
    }
  ];

  return (
    <motion.div 
      className="connect-container"
      ref={containerRef}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <motion.button
        className="connect-button"
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="contact-links"
        onClick={() => setIsOpen(open => !open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's Connect
      </motion.button>
      
      <motion.div
        className="dropdown-menu"
        id="contact-links"
        variants={{
          hidden: { opacity: 0, y: -10, display: 'none', pointerEvents: 'none' },
          visible: { opacity: 1, y: 0, display: 'block', pointerEvents: 'auto' }
        }}
        transition={{ duration: 0.2 }}
      >
        {links.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dropdown-item"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { duration: 0.15 }
              }
            }}
          >
            <span className="icon">{link.icon}</span>
            {link.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Connect;