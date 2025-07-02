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
import BulbButton from './components/BulbButton';
import AnimatedNavbar from './components/AnimatedNavbar';
import { gsap } from 'gsap';

function App() {
  const [skillsVisible, setSkillsVisible] = useState([
    false, false, false, false, false, false, false, false, false, false, false, false, false, false
  ]);
  const [isLightMode, setIsLightMode] = useState(false);
  const skillsRef = useRef(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const nameRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/document/latestresumeshreyash.pdf';
    link.download = 'latestresumeshreyash.pdf';
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
      if (skillsSection) {
        skillsObserver.unobserve(skillsSection);
      }
    };
  }, []);

  // GSAP letter-by-letter animation for name, with special effects for certain letters
  useEffect(() => {
    if (nameRef.current) {
      // Animate only the dot of the "i" in "Chaurasia"
      const fanIDot = nameRef.current.querySelector('.fan-i');
      let fanIDotTween;
      if (fanIDot) {
        fanIDotTween = gsap.to(fanIDot, {
          rotate: 360,
          repeat: -1,
          duration: 1,
          ease: 'linear',
          transformOrigin: '50% 50%',
        });
      }

      // List of unique letters in the name (excluding space and the i-dot)
      const uniqueLetters = Array.from(new Set("Shreyash Chaurasia".replace(/ /g, "").replace("i", ""))).map(l => l.toLowerCase());
      const tweens = [];
      uniqueLetters.forEach((letter, idx) => {
        const elements = nameRef.current.querySelectorAll(`.anim-${letter}`);
        // Assign a different animation to each letter for creativity
        let tween;
        switch (idx % 5) {
          case 0: // rotate
            tween = gsap.to(elements, {
              rotate: 360,
              repeat: -1,
              duration: 2,
              ease: "linear",
              transformOrigin: "50% 50%",
            });
            break;
          case 1: // scale pulse
            tween = gsap.to(elements, {
              scale: 1.3,
              yoyo: true,
              repeat: -1,
              duration: 1.2,
              ease: "sine.inOut",
            });
            break;
          case 2: // bounce
            tween = gsap.to(elements, {
              y: -10,
              yoyo: true,
              repeat: -1,
              duration: 0.7,
              ease: "bounce.inOut",
            });
            break;
          case 3: // scaleX pulse
            tween = gsap.to(elements, {
              scaleX: 1.4,
              yoyo: true,
              repeat: -1,
              duration: 1.1,
              ease: "sine.inOut",
            });
            break;
          case 4: // wiggle
            tween = gsap.to(elements, {
              rotate: 10,
              yoyo: true,
              repeat: -1,
              duration: 0.5,
              ease: "sine.inOut",
            });
            break;
          default:
            break;
        }
        if (tween) tweens.push(tween);
      });

      // After 5 seconds, revert all animations to normal
      const timeout = setTimeout(() => {
        // Kill all tweens
        tweens.forEach(tween => tween && tween.kill());
        if (fanIDotTween) fanIDotTween.kill();
        // Reset transforms for all letters
        const allLetters = nameRef.current.querySelectorAll('.letter');
        gsap.to(allLetters, { rotate: 0, scale: 1, scaleX: 1, y: 0, opacity: 1, duration: 0.5, clearProps: 'all' });
        // Reset i-dot
        if (fanIDot) {
          gsap.to(fanIDot, { rotate: 0, duration: 0.5, clearProps: 'all' });
        }
      }, 5000);

      // Cleanup
      return () => {
        clearTimeout(timeout);
        tweens.forEach(tween => tween && tween.kill());
        if (fanIDotTween) fanIDotTween.kill();
      };
    }
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

  // Helper to render the name with special effects
  const renderName = () => {
    const name = "Shreyash Chaurasia";
    return name.split("").map((char, i) => {
      // For the "i" in "Chaurasia" (index 16), split into dot and stem
      if (i === 16) {
        return (
          <span key={i} className="letter i-split">
            <span className="i-dot fan-i">•</span>
            <span className="i-stem anim-i">|</span>
          </span>
        );
      }
      // All other letters get a unique class based on the letter (except spaces)
      if (char !== " ") {
        return (
          <span key={i} className={`letter anim-${char.toLowerCase()}`}>{char}</span>
        );
      }
      return (
        <span key={i} className="letter">{'\u00A0'}</span>
      );
    });
  };

  return (
    <div className={`App ${isLightMode ? 'light' : 'dark'}`}>
      <CustomCursor />
      <BulbButton toggleNavbar={setNavbarOpen} isLightMode={isLightMode} />
      <AnimatedNavbar
        isOpen={navbarOpen}
        isLightMode={isLightMode}
        handleNavClick={(e, id) => {
          e.preventDefault();
          setNavbarOpen(false);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <header className="App-header">
        <h1 className="name doto-shreyash" ref={nameRef}>
          {renderName()}
        </h1>
        <p className="intro animated-intro">Dive into my virtual world, where stories and experiences unfold.</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          <img src={isLightMode ? switchToDarkMode : switchToLightMode} alt="Toggle Theme" />
        </button>
      </header>
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
