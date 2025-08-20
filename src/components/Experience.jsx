import { motion } from 'framer-motion';
import { useState } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTechMode, setIsTechMode] = useState(true);

  const experiences = [
    {
      title: "Research Associate – AI Quality",
      company: "SAN JOSE STATE UNIVERSITY",
      period: "Jun 2025 – Present",
      techAchievements: [
        "Exploring synthesis focused GenAI techniques that merge document structure, tone and semantics through ML parsing methods to generate actionable insights, accelerating niche business decision making."
      ],
      nonTechAchievements: [
        "Researching advanced AI techniques to help businesses make faster, more informed decisions by analyzing document patterns and content structure."
      ],
      skills: "Python, REST, OpenCV, PyTorch, LLMs, Git"
    },
    {
      title: "Software Engineer – Nike EU",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Nov 2022 – Aug 2023",
      techAchievements: [
        "Engineered highly scalable distributed pricing & inventory GraphQL and REST APIs serving 90K+ requests/day with <200ms latency during flash sales by creating new Spring Boot services and optimizing existing NGINX workloads.",
        "Decomposed a legacy core into 12 Java microservices; led end to end prototyping and implementation with testing of the microservice suite.",
        "Reduced MTTR by 40% for 200K+ concurrent user events via Kubernetes readiness probes, Helm health checks, SLO dashboards, and GitOps rollbacks.",
        "Elevated reliability with contract, integration, and load tests (JUnit, Gatling) and CI quality gates in Jenkins leading to reduced failed requests on high-traffic paths.",
        "Prevented 20+ daily integration errors from impacting checkout by building serverless AWS Lambda validations and circuit-breaker alerts integrated with AWS CloudWatch and AWS SQS.",
        "Cut client render time 35% by streamlining JSON payloads and aligning API response contracts serving React frontends.",
        "Halved onboarding time by publishing Java Spring Boot starter kits, CI/CD templates, and technical guides; led documentation & code reviews across 12+ services and mentored interns on a variety of internship projects."
      ],
      nonTechAchievements: [
        "Built highly scalable systems handling 90,000+ daily requests with lightning-fast response times during peak shopping periods.",
        "Led the transformation of a large legacy system into 12 smaller, more manageable services, improving overall system reliability.",
        "Reduced system recovery time by 40% for applications serving 200,000+ concurrent users through improved monitoring and automated recovery processes.",
        "Enhanced system reliability through comprehensive testing strategies, significantly reducing failures during high-traffic periods.",
        "Prevented 20+ daily system errors from affecting customer checkout experience through proactive monitoring and alerting systems.",
        "Improved customer experience by making web pages load 35% faster through optimized data delivery.",
        "Streamlined team onboarding process, reducing new developer setup time by 50% while mentoring multiple interns and leading code quality initiatives."
      ],
      skills: "Java, Spring Boot, GraphQL, REST, Docker, Kubernetes, Splunk, NGINX"
    },
    {
      title: "Software Engineer Intern",
      company: "COGNIZANT TECHNOLOGY SOLUTIONS",
      period: "Apr 2022 – Nov 2022",
      techAchievements: [
        "Developed containerized Python REST services handling 5K+ daily requests; validated via CI-based integration and load tests in GitHub Actions.",
        "Modeled PostgreSQL schemas and queries; improved p95 query latency by analyzing and optimizing JOIN heavy queries.",
        "Developed functional tests and integrated dependency scans, and load testing into CI, reducing post-deployment defects."
      ],
      nonTechAchievements: [
        "Built containerized web services handling 5,000+ daily requests with automated testing to ensure reliability.",
        "Optimized database performance, significantly improving query response times through data structure analysis and optimization.",
        "Implemented comprehensive testing strategies that reduced bugs and issues after software deployment."
      ],
      skills: "Python, Docker, REST, PostgreSQL, GitHub Actions"
    },
    {
      title: "Founding Software Engineer",
      company: "DOLPHIN INDUSTRIES",
      period: "Jan 2020 – Mar 2022",
      techAchievements: [
        "Launched the company's first enterprise sales website for a Windows-focused business serving hospitals, hotels, and commercial builders; integrated clickstream analytics (Python, Django) and heatmaps that generated actionable insights and boosted lead conversions by 25%.",
        "Designed, implemented, and deployed a centralized inventory portal (Python Django, MySQL, Nginx) with role-based access controls and an intuitive UI; managed 350+ hardware SKUs across 3 manufacturing units, automated stock alerts, and eliminated outages entirely.",
        "Built and rolled out employee payroll & billing software from scratch with secure role-based permissions and a streamlined UI, cutting manual processing time by 70% and eliminating reconciliation errors.",
        "Established and maintained a hybrid infrastructure across on-prem Debian servers and AWS EC2/RDS, implementing secure snapshot backups, disaster recovery readiness, and high availability for mission-critical workloads.",
        "Recruited, grew, and mentored a team of 10 engineers over 2 years while setting up peer code reviews, documentation standards, and Git workflows, alongside agile sprint planning and engineering best practices to drive scalable product development."
      ],
      nonTechAchievements: [
        "Launched the company's first enterprise sales website serving hospitals, hotels, and commercial builders, implementing user behavior analytics that increased lead conversions by 25%.",
        "Created a comprehensive inventory management system handling 350+ products across 3 manufacturing locations, completely eliminating system downtime and automating stock management.",
        "Developed employee payroll and billing software from the ground up, reducing manual processing time by 70% and eliminating calculation errors.",
        "Built and maintained a robust hybrid technology infrastructure combining on-premise and cloud solutions, ensuring high availability and disaster recovery for critical business operations.",
        "Grew and led a team of 10 engineers over 2 years, establishing development best practices, code quality standards, and agile workflows that enabled scalable product development."
      ],
      skills: "Python, Django, MySQL, Bash, Nginx, AWS (EC2, RDS), Debian, Git"
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