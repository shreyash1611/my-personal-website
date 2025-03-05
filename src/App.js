import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './cursor.css';
import googleImage from './images/googlelogo.png';
import linkedinImage from './images/linkedinlogo.png';
import githubImage from './images/githublogo.png';
import codeforcesImage from './images/codeforces.png';
import leetcodeImage from './images/leetcode.png';
import leetcodeImageLight from './images/leetcodeLight.png';
import switchToLightMode from './images/switchtolightmode.png';
import switchToDarkMode from './images/switchtodarkmode.png';
import githubImageLight from './images/githublogoLight.png';
import CustomCursor from './components/CustomCursor';

function App() {
  const [skillsVisible, setSkillsVisible] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
  const [isLightMode, setIsLightMode] = useState(false);
  const skillsRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/document/shreyashtrialresume.pdf';
    link.download = 'shreyashtrialresume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSkillsClick = (e) => {
    e.preventDefault();
    showSkills();
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showSkills = () => {
    const newSkillsVisible = [...skillsVisible];
    newSkillsVisible.fill(false);
    setSkillsVisible(newSkillsVisible);

    skillsVisible.forEach((_, index) => {
      setTimeout(() => {
        newSkillsVisible[index] = true;
        setSkillsVisible([...newSkillsVisible]);
      }, index * 500);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const nav = document.querySelector('nav');
        if (entry.isIntersecting) {
          nav.classList.remove('fixed-nav');
        } else {
          nav.classList.add('fixed-nav');
        }
      });
    });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showSkills();
        }
      });
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
      if (skillsSection) {
        skillsObserver.unobserve(skillsSection);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`App ${isLightMode ? 'light' : 'dark'}`}>
      <CustomCursor />
      <header className="App-header">
        <h1 className="name doto-shreyash">Shreyash Chaurasia</h1>
        <p className="intro animated-intro">Dive into my virtual world, where stories and experiences unfold.</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          <img src={isLightMode ? switchToDarkMode : switchToLightMode} alt="Toggle Theme" />
        </button>
      </header>
      <nav>
        <ul>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Me</a></li>
          <li><a href="#skills" onClick={handleSkillsClick}>Skills</a></li>
          <li><a href="#resume" onClick={(e) => handleNavClick(e, 'resume')}>Resume</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>
      </nav>
      <section id="about">
        <h2>About Me</h2>
        <p className="roboto-mono-details">Hi! I'm Shreyash Chaurasia, a final year student at MIT ADT university with a passion for creating impactful projects. Skilled in C++, Python, and JavaScript, I love exploring new technologies and solving real-world problems. Follow along on my journey!</p>
      </section>
      <section id="skills" ref={skillsRef}>
        <h2>Skills</h2>
        <p className="roboto-mono-details">Here are some of my skills:</p>
        <ul className="skills-list">
          {['C/C++', 'Python', 'JavaScript', 'Solidity', 'React.js', 'CSS', 'Bash', 'Flask', 'MySQL', 'HardHat', 'HyperLedger Fabric', 'NumPy', 'PyTorch', 'TensorFlow'].map((skill, index) => (
            <li key={index} className={`skill ${skillsVisible[index] ? 'show' : ''}`}>
              {skill}
            </li>
          ))}
        </ul>
      </section>
      <section id="resume">
        <h2>Resume</h2>
        <p className="roboto-mono-details">Click the button below to download my resume:</p>
        <button onClick={handleDownload}>Download Resume</button>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p className="roboto-mono-details">If you would like to reach me, feel free to connect:</p>
        <a href="mailto:shreyashc1611@gmail.com">
          <img src={googleImage} alt="Email Me" style={{ width: '70px', cursor: 'pointer', marginRight: '20px' }} />
        </a>
        <a href="https://www.linkedin.com/in/shreyash-chaurasia-07954b316/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinImage} alt="LinkedIn Profile" style={{ width: '70px', cursor: 'pointer', marginRight: '20px' }} />
        </a>
        <a href="https://github.com/shreyash1611" target="_blank" rel="noopener noreferrer">
          <img 
            src={isLightMode ? githubImageLight : githubImage} 
            alt="GitHub Profile" 
            style={{ width: '75px', cursor: 'pointer', marginRight: '20px' }} 
          />
        </a>
        <a href="https://codeforces.com/profile/shreyashchaurasia" target="_blank" rel="noopener noreferrer">
          <img src={codeforcesImage} alt="Codeforces Profile" style={{ width: '70px', cursor: 'pointer', marginRight: '20px' }} />
        </a>
        <a href="https://leetcode.com/u/shreyashchaurasia/" target="_blank" rel="noopener noreferrer">
          <img 
            src={isLightMode ? leetcodeImageLight : leetcodeImage} 
            alt="LeetCode Profile" 
            style={{ width: '70px', cursor: 'pointer' }} 
          />
        </a>
      </section>
      <footer className="footer">
        <p className="pacifico-shreyash">Built with 🤍 by Shreyash Chaurasia</p>
      </footer>
    </div>
  );
}

export default App;
