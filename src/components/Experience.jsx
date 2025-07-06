import { motion } from 'framer-motion';
import { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      title: "Software Engineer",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Oct 2021 - Aug 2023",
      achievements: [
        "2 teams, contributed 9 services addressing NIKE's critical data retrieval, API endpoint security and uptime SLAs",
        "Led full-cycle development of business-critical features from ideation and prototyping to production deployment improving feature release velocity by 30%",
        "Designed, developed, maintained Java Spring Boot microservices (Spring MVC, Data, Batch, WebFlux, Hibernate) for financial/customer management systems supporting high scale concurrent database transactions",
        "Led PostgreSQL migration to partitioned, sharded architecture migration; created seed & verification scripts to ensure 100% data integrity of new database instances",
        "Containerized services with Docker and deployed to Kubernetes using Helm; introduced blue-green releases and automated rollbacks via Jenkins pipelines, cutting downtime incidents by 40%",
        "Implemented Layer 7 load balancing solution with Nginx Kubernetes Ingress Controller, involving Helm charts, YAML configurations, request-based routing through incoming HTTP header parsing, reduced application latency by 12%",
        "Onboarded 5 interns for code versioning, production environment leading to smoother onboarding and positive assimilation experience"
      ],
      skills: "Java, Python, AWS CDK, GraphQL, MySQL, PostgreSQL, Linux, Redis"
    },
    {
      title: "Software Engineer Intern II",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Jun 2021 - Sep 2021",
      achievements: [
        "Engineered secure OAuth2/MFA authentication on Spring Boot for internal portal—internal dashboarding on Grafana, Splunk, OpenTelemetry",
        "Automated pipelines and test triggers using Bash scripts on Jenkins, reducing manual QA testing delays by 40%"
      ],
      skills: "Java Spring Boot, AWS CDK, Linux, .NET, ReactJS, NextJS, BitBucket"
    },
    {
      title: "Software Engineer Intern I",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Jan 2021 - May 2021",
      achievements: [
        "Improved Query Resolution Time from 2s to 900ms by restructuring MySQL database for JOIN heavy queries involving analyzing API query logs"
      ],
      skills: "MySQL, PostgreSQL, Python, Java"
    },
    {
      title: "Software Engineer",
      company: "DOLPHIN INDUSTRIES",
      period: "Jun 2020 - Jul 2021",
      achievements: [
        "Designed and engineered an internal company portal with an intuitive UI and a secure, role-based database access, integrating VPN setup using OpenVPN on 2 Linux Debian Servers for local network implementation for 30-40 on premise devices",
        "Built a robust inventory management system with CRUD operations on MySQL Server, real-time inventory tracking with barcode scanning, automated restocking alerts, reducing manual efforts by 80% and improving operational efficiency",
        "Designed interactive sales dashboards cutting report generation time from hours to under seconds, improving business decision making"
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
            key={activeTab}
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
                {experiences[activeTab].achievements.map((achievement, i) => (
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