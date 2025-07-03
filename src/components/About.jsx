import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="about">
      <div className="about-container">


        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="about-content"
        >
          <div className="experience-section">
            <h2>Experience</h2>
            <div className="experience-item">
              <h3>Software Engineer at Cognizant Technology Solutions</h3>
              <p className="date">Jun 2020 - Aug 2023</p>
              <ul>
                <li>Led 2 teams, contributed to 9 services addressing NIKE's critical data retrieval, API endpoint security and uptime SLAs</li>
                <li>Led full-cycle development of business-critical features improving feature release velocity by 30%</li>
                <li>Designed and developed Java Spring Boot microservices for financial/customer management systems</li>
                <li>Led PostgreSQL migration to partitioned, sharded architecture with 100% data integrity</li>
                <li>Implemented Layer 7 load balancing with Nginx Kubernetes Ingress Controller, reducing latency by 12%</li>
              </ul>
            </div>

            <div className="experience-item">
              <h3>Software Engineer at Dolphin Industries</h3>
              <p className="date">Jun 2020 - Jul 2021</p>
              <ul>
                <li>Designed and engineered internal company portal with secure, role-based access</li>
                <li>Built inventory management system reducing manual efforts by 80%</li>
                <li>Designed interactive sales dashboards improving business decision making</li>
              </ul>
            </div>
          </div>

          <div className="education-section">
            <h2>Education</h2>
            <div className="education-item">
              <h3>San Jose State University</h3>
              <p>MS in Software Engineering (Expected May 2025)</p>
              <p>Relevant Coursework: Enterprise Software, Network Design, Cloud Infrastructure, Machine Learning, Distributed Systems</p>
            </div>
            <div className="education-item">
              <h3>Bhilai Institute of Technology</h3>
              <p>BTech in Computer Science Engineering</p>
              <p>Member: IEEE, CodeClub, BusinessHub, TEDx BITD</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
