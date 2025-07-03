import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import RelaxSection from './components/RelaxSection';
import Footer from './components/Footer';
import FixedContactButton from './components/FixedContactButton';
import './App.css';

export default function App() {
  useEffect(() => {
    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="app">
      <FixedContactButton />
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <RelaxSection />
      <Footer />
    </div>
  );
}
