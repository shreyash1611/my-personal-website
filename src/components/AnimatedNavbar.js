import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../AnimatedNavbar.css';

const AnimatedNavbar = ({ isOpen, isLightMode, handleNavClick }) => {
  const navbarRef = useRef(null);
  const itemsRef = useRef([]);
  
  // Reset refs array
  itemsRef.current = [];
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // Animate sidebar in from the left
      gsap.to(navbarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      // Animate each nav item with stagger
      gsap.fromTo(itemsRef.current, 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    } else {
      // Animate sidebar out to the left
      gsap.to(navbarRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);
  
  return (
    <nav 
      ref={navbarRef} 
      className={`animated-navbar ${isOpen ? 'open' : ''} ${isLightMode ? 'light' : 'dark'}`}
    >
      <ul>
        <li ref={addToRefs}>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Me</a>
        </li>
        <li ref={addToRefs}>
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
        </li>
        <li ref={addToRefs}>
          <a href="#resume" onClick={(e) => handleNavClick(e, 'resume')}>Resume</a>
        </li>
        <li ref={addToRefs}>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default AnimatedNavbar;