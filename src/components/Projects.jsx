import { motion } from 'framer-motion';
import { useState } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Cloud-Native Microservices Platform',
    description: 'Designed and implemented a scalable microservices architecture using Kubernetes, service mesh, and cloud-native patterns.',
    technologies: ['Kubernetes', 'Go', 'gRPC', 'Istio', 'AWS'],
    link: '#'
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Built a real-time analytics platform with ML-driven insights and predictive analytics capabilities.',
    technologies: ['Python', 'React', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'Distributed Data Pipeline',
    description: 'Developed a high-throughput data processing pipeline handling millions of events per day.',
    technologies: ['Apache Kafka', 'Elasticsearch', 'Docker', 'Spring Boot'],
    link: '#'
  }
];

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`project-card ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      
      <div className="project-technologies">
        {project.technologies.map((tech) => (
          <span key={tech} className="technology-tag">{tech}</span>
        ))}
      </div>

      <motion.a
        href={project.link}
        className="project-link"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        View Project
      </motion.a>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}