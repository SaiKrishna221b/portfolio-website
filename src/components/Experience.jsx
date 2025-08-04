import { motion } from 'framer-motion';
import { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTechMode, setIsTechMode] = useState(true);

  const experiences = [
    {
      title: "Research Associate",
      company: "SAN JOSE STATE UNIVERSITY",
      period: "Jun 2025 – Present",
      techAchievements: [
        "Exploring synthesis-focused GenAI techniques that merge document structure, tone, and semantics through parsing ML methods to generate actionable insights, accelerating niche business decision-making under Prof. Jerry Gao"
      ],
      nonTechAchievements: [
        "Researching advanced AI techniques to help businesses make faster, more informed decisions by analyzing document patterns and content structure under Prof. Jerry Gao"
      ],
      skills: "Python, PyTorch, OpenCV, LLMs"
    },
    {
      title: "Software Engineer",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Oct 2021 - Aug 2023",
      techAchievements: [
        "2 teams, contributed 9 services addressing NIKE's critical data retrieval, API endpoint security and uptime SLAs",
        "Led full-cycle development of business-critical features from ideation and prototyping to production deployment improving feature release velocity by 30%",
        "Designed, developed, maintained Java Spring Boot microservices (Spring MVC, Data, Batch, WebFlux, Hibernate) for financial/customer management systems supporting high scale concurrent database transactions",
        "Led PostgreSQL migration to partitioned, sharded architecture migration; created seed & verification scripts to ensure 100% data integrity of new database instances",
        "Containerized services with Docker and deployed to Kubernetes using Helm; introduced blue-green releases and automated rollbacks via Jenkins pipelines, cutting downtime incidents by 40%",
        "Implemented Layer 7 load balancing solution with Nginx Kubernetes Ingress Controller, involving Helm charts, YAML configurations, request-based routing through incoming HTTP header parsing, reduced application latency by 12%",
        "Onboarded 5 interns for code versioning, production environment leading to smoother onboarding and positive assimilation experience"
      ],
      nonTechAchievements: [
        "Collaborated across 2 teams to build 9 essential services for NIKE, ensuring their systems stayed secure and reliable",
        "Led complete development of important business features from initial ideas to final launch, making releases 30% faster",
        "Built and maintained robust backend systems for financial and customer management that handle thousands of simultaneous users",
        "Successfully migrated large databases to a more efficient structure while ensuring no data was lost during the transition",
        "Modernized application deployment process using containerization technology, reducing system failures by 40%",
        "Optimized application performance by implementing smart traffic distribution, making the system 12% faster for users",
        "Mentored 5 new team members, helping them integrate smoothly into the development workflow and company culture"
      ],
      skills: "Java, Python, AWS CDK, GraphQL, MySQL, PostgreSQL, Linux, Redis"
    },
    {
      title: "Software Engineer Intern II",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Jun 2021 - Sep 2021",
      techAchievements: [
        "Engineered secure OAuth2/MFA authentication on Spring Boot for internal portal—internal dashboarding on Grafana, Splunk, OpenTelemetry",
        "Automated pipelines and test triggers using Bash scripts on Jenkins, reducing manual QA testing delays by 40%"
      ],
      nonTechAchievements: [
        "Built secure login systems with multi-factor authentication for internal company tools and monitoring dashboards",
        "Automated testing processes to reduce manual work, cutting testing delays by 40% and improving team efficiency"
      ],
      skills: "Java Spring Boot, AWS CDK, Linux, .NET, ReactJS, NextJS, BitBucket"
    },
    {
      title: "Software Engineer Intern I",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Jan 2021 - May 2021",
      techAchievements: [
        "Improved Query Resolution Time from 2s to 900ms by restructuring MySQL database for JOIN heavy queries involving analyzing API query logs"
      ],
      nonTechAchievements: [
        "Optimized database performance, making data retrieval more than twice as fast by analyzing usage patterns and restructuring data storage"
      ],
      skills: "MySQL, PostgreSQL, Python, Java"
    },
    {
      title: "Software Engineer",
      company: "DOLPHIN INDUSTRIES",
      period: "Jun 2020 - Jul 2021",
      techAchievements: [
        "Designed and engineered an internal company portal with an intuitive UI and a secure, role-based database access, integrating VPN setup using OpenVPN on 2 Linux Debian Servers for local network implementation for 30-40 on premise devices",
        "Built a robust inventory management system with CRUD operations on MySQL Server, real-time inventory tracking with barcode scanning, automated restocking alerts, reducing manual efforts by 80% and improving operational efficiency",
        "Designed interactive sales dashboards cutting report generation time from hours to under seconds, improving business decision making"
      ],
      nonTechAchievements: [
        "Created a comprehensive internal company portal with user-friendly interface and secure access controls, including secure network setup for 30-40 office devices",
        "Developed a complete inventory management system with barcode scanning and automatic alerts, reducing manual work by 80% and streamlining operations",
        "Built interactive sales reporting dashboards that generate reports instantly instead of taking hours, enabling faster business decisions"
      ],
      skills: "Node.js, HTML, CSS, JavaScript, BASH, OpenVPN, WebSockets, Linux"
    }
  ];

  return (
    <section className="section experience-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Experience
        </motion.h2>
        
        {/* Toggle Button */}
        <motion.div 
          className="experience-toggle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            className={`toggle-btn ${isTechMode ? 'active' : ''}`}
            onClick={() => setIsTechMode(true)}
          >
            Tech Savvy
          </button>
          <button 
            className={`toggle-btn ${!isTechMode ? 'active' : ''}`}
            onClick={() => setIsTechMode(false)}
          >
            Non-Tech
          </button>
        </motion.div>

        <div className="experience-container">
          <div className="tabs-container">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{exp.title}</h3>
                <p>{exp.company}</p>
                <p className="period">{exp.period}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="tab-content"
            key={`${activeTab}-${isTechMode}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="experience-details">
              <h3>{experiences[activeTab].title}</h3>
              <h4>{experiences[activeTab].company}</h4>
              <p className="period">{experiences[activeTab].period}</p>
              <p className="skills">Skills: {experiences[activeTab].skills}</p>
              <ul className="achievements">
                {(isTechMode ? experiences[activeTab].techAchievements : experiences[activeTab].nonTechAchievements).map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;