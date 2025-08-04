import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: 'Backend Engineering', level: 4, description: 'Java\nPython\nGo' },
    { name: 'DevOps and CI/CD', level: 3, description: 'Kubernetes\nGitOps\nAutomation Scripting' },
    { name: 'Cloud Services', level: 5, description: 'AWS\nGCP\nAzure' },
    { name: 'Machine Learning', level: 3, description: 'Numerical Analysis\nStatistics\nNLP' },
    { name: 'Databases', level: 4, description: 'SQL\nNoSQL\nIndexing\nSharding\nPooling' },
    { name: 'Product Sense', level: 4, description: 'User Experience\nMarket Analysis\nFeature Prioritization' }
  ];

  const rightSideContent = [
    {
      title: "Experience Highlights",
      content: "2+ years at Cognizant Technology Solutions building enterprise-scale microservices and cloud infrastructure for Fortune 500 clients."
    },
    {
      title: "Current Focus",
      content: "AI Quality & Reliability research at San Jose State University, exploring GenAI synthesis techniques for business decision-making."
    },
    {
      title: "Technical Achievements",
      content: "Led database migrations, implemented blue-green deployments, and reduced application latency by 12% through load balancing optimization."
    },
    {
      title: "Leadership & Growth",
      content: "Mentored 5 interns, improved feature release velocity by 30%, and contributed to 9 critical services for NIKE's data infrastructure."
    }
  ];

  const maxLevel = 5;
  const centerX = 300;
  const centerY = 300;
  const radius = 126;

  // Calculate points for hexagon shape (6 skills now)
  const getPoint = (index, level = maxLevel) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const distance = (level / maxLevel) * radius;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle)
    };
  };

  // Generate grid lines (concentric hexagons)
  const generateGridLines = () => {
    const lines = [];
    for (let level = 1; level <= maxLevel; level++) {
      const points = skills.map((_, index) => getPoint(index, level));
      const pathData = `M ${points[0].x} ${points[0].y} ` + 
        points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') + ' Z';
      
      lines.push(
        <path
          key={level}
          d={pathData}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />
      );
    }
    return lines;
  };

  // Generate axis lines
  const generateAxisLines = () => {
    return skills.map((_, index) => {
      const endPoint = getPoint(index, maxLevel);
      return (
        <line
          key={index}
          x1={centerX}
          y1={centerY}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />
      );
    });
  };

  // Generate skill level polygon
  const generateSkillPolygon = () => {
    const points = skills.map((skill, index) => getPoint(index, skill.level));
    const pathData = `M ${points[0].x} ${points[0].y} ` + 
      points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') + ' Z';
    
    return (
      <motion.path
        d={pathData}
        fill="rgba(0, 255, 255, 0.2)"
        stroke="rgba(0, 255, 255, 0.8)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    );
  };

  // Generate skill points
  const generateSkillPoints = () => {
    return skills.map((skill, index) => {
      const point = getPoint(index, skill.level);
      return (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="rgba(0, 255, 255, 1)"
          stroke="white"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
        />
      );
    });
  };

  // Generate labels
  const generateLabels = () => {
    return skills.map((skill, index) => {
      const labelPoint = getPoint(index, maxLevel + 1.5);
      const isRightSide = labelPoint.x > centerX;
      const descriptionLines = skill.description.split('\n');
      
      return (
        <motion.g key={index}>
          <motion.text
            x={labelPoint.x}
            y={labelPoint.y - 8}
            textAnchor={isRightSide ? 'start' : 'end'}
            fill="white"
            fontSize="12"
            fontWeight="bold"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          >
            {skill.name}
          </motion.text>
          {descriptionLines.map((line, lineIndex) => (
            <motion.text
              key={lineIndex}
              x={labelPoint.x}
              y={labelPoint.y + 12 + (lineIndex * 12)}
              textAnchor={isRightSide ? 'start' : 'end'}
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="9"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 + lineIndex * 0.05 }}
            >
              {line}
            </motion.text>
          ))}
        </motion.g>
      );
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section about-section">
      <div className="section-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="about-content-split"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left side - Radar Chart */}
          <div className="radar-chart-container">
            <motion.div
              className="radar-chart"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              onViewportEnter={() => setIsVisible(true)}
            >
              <svg width="600" height="600" viewBox="0 0 600 600">
                {generateGridLines()}
                {generateAxisLines()}
                {generateSkillPolygon()}
                {generateSkillPoints()}
                {generateLabels()}
              </svg>
            </motion.div>
          </div>

          {/* Right side - Info Cards */}
          <div className="info-cards-container">
            {rightSideContent.map((item, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;