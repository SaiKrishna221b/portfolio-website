import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Distributed Database System",
      tech: "PostgreSQL, Go, Docker",
      description: "High-performance distributed database system with automatic sharding"
    },
    {
      title: "API Security Framework",
      tech: "Node.js, JWT, OAuth",
      description: "Enterprise-grade API security framework with advanced authentication"
    },
    {
      title: "Cloud Infrastructure",
      tech: "AWS, Terraform, Kubernetes",
      description: "Scalable cloud infrastructure with automated deployment"
    }
  ];

  return (
    <section className="section projects-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>
        <div className="cards-container">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card certification-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3>{project.title}</h3>
              <p className="tech-stack">{project.tech}</p>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;