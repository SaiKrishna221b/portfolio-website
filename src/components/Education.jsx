import { motion } from 'framer-motion';

const Education = () => {
  const education = [
    {
      school: "San Jose State University",
      degree: "MS in Software Engineering",
      gradDate: "May 2025",
      courses: "Enterprise Software, Network Design, Cloud Infrastructure, Machine Learning, Distributed Systems",
      transcriptLink: "https://drive.google.com/file/d/1SY9QKgCEhYZI2S22c7YrAfAv72uNPY5Q/view?usp=sharing"
    },
    {
      school: "Bhilai Institute of Technology",
      degree: "BTech in Computer Science Engineering",
      memberships: ["IEEE", "CodeClub", "BusinessHub", "TEDx BITD"],
      transcriptLink: "https://drive.google.com/file/d/1ykfjIr2QCiSzPJleeWRI8guKBfTHqxJS/view?usp=drive_link"
    }
  ];

  return (
    <section className="section education-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Education
        </motion.h2>
        <div className="education-container">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="education-header">
                <div className="education-title">
                  <h3>{edu.school}</h3>
                  <a href={edu.transcriptLink} className="view-text-btn" target="_blank" rel="noopener noreferrer">
                    View Transcript
                  </a>
                </div>
                <h4>{edu.degree}</h4>
                {edu.gradDate && <p className="grad-date">Expected: {edu.gradDate}</p>}
              </div>
              <div className="education-details">
                {edu.courses && (
                  <div className="courses">
                    <h5>Relevant Coursework</h5>
                    <p>{edu.courses}</p>
                  </div>
                )}
                {edu.memberships && (
                  <div className="memberships">
                    <h5>Memberships</h5>
                    <ul>
                      {edu.memberships.map((membership, i) => (
                        <li key={i}>{membership}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;