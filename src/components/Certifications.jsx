import { motion } from 'framer-motion';
import './Certifications.css';
import awsLogo from '../assets/aws.png';
import gcpLogo from '../assets/googlecloud.png';
import azureLogo from '../assets/azure.png';

const certifications = [
  {
    name: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    date: '2023',
    icon: awsLogo,
    link: 'https://www.credly.com/badges/your-aws-badge-id'
  },
  {
    name: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2023',
    icon: gcpLogo,
    link: 'https://www.credential.net/your-gcp-credential-id'
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    date: '2023',
    icon: 'https://www.datocms-assets.com/2885/1620155116-brandhcterraformverticalcolor.svg',
    link: 'https://www.credly.com/badges/your-terraform-badge-id'
  },
  {
    name: 'Microsoft Certified: Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: '2023',
    icon: azureLogo,
    link: 'https://learn.microsoft.com/en-us/users/your-ms-profile/transcript/your-cert-id'
  },
  {
    name: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    date: '2023',
    icon: azureLogo,
    link: 'https://learn.microsoft.com/en-us/users/your-ms-profile/transcript/your-cert-id'
  }
];

const CertificationCard = ({ certification, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="certification-card"
  >
    <a href={certification.link} target="_blank" rel="noopener noreferrer" className="certification-icon">
      <img src={certification.icon} alt={`${certification.name} logo`} />
    </a>
    <div className="certification-content">
      <h3>{certification.name}</h3>
      <p className="certification-issuer">{certification.issuer}</p>
      <p className="certification-date">{certification.date}</p>
    </div>
  </motion.div>
);

export default function Certifications() {
  return (
    <section id="certifications" className="certifications">
      <div className="certifications-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Professional Certifications
        </motion.h2>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.name}
              certification={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}