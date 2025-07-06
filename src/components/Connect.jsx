import { motion } from 'framer-motion';

const Connect = () => {
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
      initial="hidden"
      whileHover="visible"
    >
      <motion.button
        className="connect-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's Connect
      </motion.button>
      
      <motion.div
        className="dropdown-menu"
        variants={{
          hidden: { opacity: 0, y: -10, display: 'none' },
          visible: { opacity: 1, y: 0, display: 'block' }
        }}
        transition={{ duration: 0.2 }}
      >
        {links.map((link, index) => (
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
                transition: { delay: index * 0.1 }
              }
            }}
            whileHover={{ color: '#00fff5' }}
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