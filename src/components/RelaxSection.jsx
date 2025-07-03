import { motion } from 'framer-motion';
import SpaceBackground from './SpaceBackground';
import './RelaxSection.css';

export default function RelaxSection() {
  return (
    <section className="relax-section">
      <SpaceBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relax-message"
      >
        Relax and calm your attention span for 20 seconds here.
      </motion.div>
    </section>
  );
}