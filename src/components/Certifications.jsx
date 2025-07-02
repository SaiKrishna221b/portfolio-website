import { motion } from 'framer-motion';
import './Certifications.css';

const certifications = [
  {
    name: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
    icon: '🏆'
  },
  {
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2023',
    icon: '🎯'
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    icon: '⚙️'
  },
  {
    name: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    date: '2022',
    icon: '🚀'
  }
];

const CertificationCard = ({ certification, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="certification-card"
  >
    <span className="certification-icon">{certification.icon}</span>
    <div className="certification-content">
      <h3>{certification.name}</h3>
      <p className="certification-issuer">{certification.issuer}</p>
      <p className="certification-date">{certification.date}</p>
    </div>
  </motion.div>
);

export default function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="certifications-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Professional Certifications
        </motion.h2>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.name}
              certification={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}