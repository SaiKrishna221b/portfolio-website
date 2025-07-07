import { motion } from 'framer-motion';

const Certifications = () => {
  const certifications = [
    {
      name: "Google Certified Professional Cloud Developer",
      date: "Mar 2025",
      link: "https://www.credly.com/badges/21b56ef0-b44f-4746-ab36-34d1625ab6a8/public_url"
    },
    {
      name: "AWS Solutions Architect",
      date: "Sep 2024",
      link: "https://www.credly.com/badges/ea5da477-5917-491f-a2b7-636898391a7a/linked_in_profile"
    },
    {
      name: "AWS Cloud Practitioner",
      date: "Jun 2024",
      link: "https://www.credly.com/badges/051e50a7-c21d-49e7-8c31-21753b631b17"
    },
    {
      name: "HashiCorp Terraform Associate",
      date: "Aug 2024",
      link: "https://www.credly.com/badges/9f997351-49df-4e7a-a577-4606069c7204/public_url"
    },
    {
      name: "Microsoft Azure Artificial Intelligence Tools",
      date: "Jun 2024",
      link: "https://learn.microsoft.com/en-us/users/saikrishna-8883/credentials/57f8512740df90ae?ref=https%3A%2F%2Fwww.linkedin.com%2F"
    },
    {
      name: "Microsoft Azure Serverless Computing",
      date: "Mar 2024",
      link: "https://www.coursera.org/account/accomplishments/verify/G7Y42CJF3G7G?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=project"
    }
  ];

  return (
    <section className="section certifications-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Certifications
        </motion.h2>
        <div className="cards-container">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="card certification-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{cert.name}</h3>
              <p className="date">{cert.date}</p>
              <div className="card-actions">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="view-text-btn">
                  View
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;