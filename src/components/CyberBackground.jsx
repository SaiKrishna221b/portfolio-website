import React from 'react';
import './CyberBackground.css';

const CyberBackground = () => {
  return (
    <div className="cyber-background">
      <div className="grid"></div>
      <div className="lines">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="line" style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
      <div className="particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      <div className="glitch-overlay"></div>
    </div>
  );
};

export default CyberBackground;