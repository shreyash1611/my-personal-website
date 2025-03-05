import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isFalling, setIsFalling] = useState(false);
  const timeoutRef = useRef(null);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);
  const isScrollingRef = useRef(false);
  
  const GRAVITY = 1.5;
  const BOUNCE_FACTOR = 0.6;
  const TERMINAL_VELOCITY = 20;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY;
      setPosition({ 
        x: e.clientX, 
        y: e.clientY + scrollY
      });
      setIsFalling(false);
      velocityRef.current = 0;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsFalling(true);
        let lastTime = performance.now();
        
        const animate = (currentTime) => {
          const deltaTime = (currentTime - lastTime) / 16;
          lastTime = currentTime;

          setPosition(prev => {
            velocityRef.current = Math.min(
              velocityRef.current + (GRAVITY * deltaTime), 
              TERMINAL_VELOCITY
            );
            
            let newY = prev.y + velocityRef.current;

            const maxY = window.innerHeight + window.scrollY - 20;
            if (newY >= maxY) {
              newY = maxY;
              if (Math.abs(velocityRef.current) > 0.5) {
                velocityRef.current = -velocityRef.current * BOUNCE_FACTOR;
              } else {
                velocityRef.current = 0;
                return { ...prev, y: maxY };
              }
            }

            return { ...prev, y: newY };
          });
          
          if (Math.abs(velocityRef.current) > 0.1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
      }, 5000);
    };

    const handleScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(timeoutRef.current);
      
      if (!isFalling) {
        setPosition(prev => ({
          ...prev,
          y: prev.y + (window.scrollY - prevScrollY.current)
        }));
      }
      prevScrollY.current = window.scrollY;

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isFalling]);

  return (
    <div
      className="custom-cursor"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: isFalling ? '#ff0000' : '#ff00ff',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default CustomCursor; 