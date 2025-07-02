import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import '../BulbButton.css';

// Register the Draggable plugin
gsap.registerPlugin(Draggable);

const BulbButton = ({ toggleNavbar, isLightMode }) => {
  const bulbRef = useRef(null);
  const dragInstance = useRef(null);
  
  useEffect(() => {
    // Create the draggable instance
    dragInstance.current = Draggable.create(bulbRef.current, {
      type: 'y',
      bounds: {
        minY: 0,
        maxY: 150 // Maximum drag distance to reveal navbar
      },
      onDrag: function() {
        // Calculate drag progress (0 to 1)
        const progress = Math.min(this.y / 150, 1);
        
        // Animate bulb glow based on drag progress
        gsap.to(bulbRef.current, {
          boxShadow: `0 0 ${10 + progress * 20}px ${progress * 10}px rgba(${isLightMode ? '255, 165, 0' : '255, 255, 255'}, ${0.3 + progress * 0.7})`,
          duration: 0.1
        });
        
        // If dragged more than 70% of the way, trigger navbar
        if (progress > 0.7) {
          toggleNavbar(true);
        }
      },
      onRelease: function() {
        // Animate back to top position
        gsap.to(bulbRef.current, {
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    })[0];
    
    // Cleanup
    return () => {
      if (dragInstance.current) {
        dragInstance.current.kill();
      }
    };
  }, [toggleNavbar, isLightMode]);
  
  return (
    <div className="bulb-container">
      <div 
        ref={bulbRef} 
        className={`bulb-button ${isLightMode ? 'light' : 'dark'}`}
        onClick={() => toggleNavbar(prev => !prev)}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
        </svg>
      </div>
    </div>
  );
};

export default BulbButton;