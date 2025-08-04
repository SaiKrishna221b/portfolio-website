import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import SpaceBackground from './components/SpaceBackground';
import Connect from './components/Connect';
import './App.css';

function App() {
  return (
    <div className="app">
      <SpaceBackground />
      <Connect />
      <div className="sections-container">
        <div className="card-section">
          <Hero />
        </div>
        <div className="card-section" id="about">
          <AboutMe />
        </div>
        <div className="card-section" id="experience">
          <Experience />
        </div>
        <div className="card-section" id="education">
          <Education />
        </div>
        <div className="card-section" id="projects">
          <Projects />
        </div>
        <div className="card-section" id="certifications">
          <Certifications />
        </div>
      </div>
    </div>
  );
}

export default App;