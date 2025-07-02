import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Java', 'SQL']
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Node.js', 'Django', 'FastAPI', 'Spring Boot']
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch']
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'Linux', 'Nginx', 'GraphQL', 'REST APIs']
  }
];

const SkillCard = ({ title, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="skill-card"
  >
    <h3>{title}</h3>
    <ul>
      {skills.map((skill, idx) => (
        <motion.li
          key={skill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
        >
          {skill}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Technical Skills
        </motion.h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}