import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Distributed Database System",
      tech: "PostgreSQL, Go, Docker",
      description: "High-performance distributed database system with automatic sharding. Handles millions of transactions with consistent data replication across multiple nodes."
    },
    {
      title: "API Security Framework",
      tech: "Node.js, JWT, OAuth",
      description: "Enterprise-grade API security framework with advanced authentication. Features rate limiting, threat detection, and comprehensive audit trails."
    },
    {
      title: "Cloud Infrastructure",
      tech: "AWS, Terraform, Kubernetes",
      description: "Scalable cloud infrastructure with automated deployment. Supports blue-green deployments and auto-scaling based on traffic patterns."
    },
    {
      title: "Kubernetes Microservices Platform",
      tech: "Go, Kubernetes, Helm, gRPC",
      description: "Cloud-native microservices with autoscaling and health checks for high availability. Enables modular scaling and seamless service communication."
    },
    {
      title: "Cloud Identity System",
      tech: "Go, JWT, GKE, GitOps",
      description: "Secure API-first authentication backend with RBAC and audit logs. Designed to replace traditional physical ID cards with digital identity management."
    },
    {
      title: "Event Monitoring Tool",
      tech: "Go, ELK Stack, Slack API",
      description: "Distributed log processing system with real-time anomaly detection and alerts. Processes events across multiple services for faster incident response."
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
          Projects{' '}
          <a 
            href="https://github.com/SaiKrishna221b" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              fontSize: '0.4em', 
              textDecoration: 'none', 
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 'normal'
            }}
          >
            (see all on <span style={{ 
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.9)',
              textDecorationThickness: '2px',
              textUnderlineOffset: '2px'
            }}>Github</span>)
          </a>
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