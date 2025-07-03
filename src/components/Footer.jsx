import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/gsaikrishna221',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/SaiKrishna221b',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    }
  ];

  const certifications = [
    {
      name: 'Google Certified Professional Cloud Developer',
      url: 'https://www.credly.com/badges/21b56ef0-b44f-4746-ab36-34d1625ab6a8/public_url',
      icon: 'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png'
    },
    {
      name: 'AWS Solutions Architect',
      url: 'https://www.credly.com/badges/ea5da477-5917-491f-a2b7-636898391a7a/linked_in_profile',
      icon: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c4ef4d0697b0e561dc0ce72a59c588998.png'
    },
    {
      name: 'AWS Cloud Practitioner',
      url: 'https://www.credly.com/badges/051e50a7-c21d-49e7-8c31-21753b631b17',
      icon: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21632d09a93306f096ef4b593b5f6e171d.png'
    },
    {
      name: 'HashiCorp Terraform Associate',
      url: 'https://www.credly.com/badges/9f997351-49df-4e7a-a577-4606069c7204/public_url',
      icon: 'https://www.datocms-assets.com/2885/1620155116-brandhcterraformverticalcolor.svg'
    },
    {
      name: 'Microsoft Azure AI Fundamentals',
      url: 'https://learn.microsoft.com/en-us/users/saikrishna-8883/credentials/57f8512740df90ae?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      icon: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg'
    },
    {
      name: 'Microsoft Azure Serverless Computing',
      url: 'https://www.coursera.org/account/accomplishments/verify/G7Y42CJF3G7G?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=project',
      icon: 'https://azure.microsoft.com/content/dam/microsoft/final/en-us/microsoft-brand/icons/Azure.svg'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="footer-content"
        >
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">
                  {link.icon}
                </span>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="certifications">
            <h3 className="cert-title">Professional Certifications</h3>
            <div className="cert-grid">
              {certifications.map((cert, index) => (
                <motion.a
                  key={cert.name}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={cert.icon} alt={cert.name} className="cert-icon" />
                  <span>{cert.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {currentYear} G Sai Krishna. All rights reserved.
            </div>
            
            <div className="build-stack">
              Built with React + Vite + Framer Motion
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}