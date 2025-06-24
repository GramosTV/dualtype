import React, { useRef, useEffect, ReactNode, useState } from 'react';
import gsap from 'gsap';

interface StaggerBlurOutProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  playOnce?: boolean; 
  threshold?: number; // How much of the element needs to be visible to trigger animation
}

const StaggerBlurOut: React.FC<StaggerBlurOutProps> = ({
  children,
  stagger = 0.1,
  duration = 0.7,
  delay = 0,
  className = '',
  playOnce = true, // Changed default to true to prevent replaying on scroll back
  threshold = 0.5, // Default to trigger when 50% of element is visible
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRefs = useRef<HTMLElement[]>([]);
  const hasAnimated = useRef<boolean>(false);
  const [isInView, setIsInView] = useState(false);

  // Apply initial state before the component mounts
  useEffect(() => {
    // Make sure elements start invisible
    const childElements = containerRef.current ? 
      Array.from(containerRef.current.children) as HTMLElement[] : [];
    
    if (childElements.length > 0) {
      gsap.set(childElements, {
        autoAlpha: 0,
        filter: 'blur(20px)',
        y: 20,
      });
    }
  }, []);

  // Set up intersection observer to detect when element is in viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold, // Trigger when threshold amount is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When element's center crosses viewport center
        if (entry.isIntersecting) {
          // Only set to in view if it hasn't been animated or if playOnce is false
          if (!hasAnimated.current || !playOnce) {
            setIsInView(true);
          }
          
          // If we only want to observe once, disconnect after first trigger
          if (playOnce && hasAnimated.current) {
            observer.disconnect();
          }
        } else {
          if (!playOnce) {
            setIsInView(false);
            hasAnimated.current = false;
          }
        }
      });
    }, options);

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [playOnce, threshold]);

  // Run animation when element is in view
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    // If playOnce is true and animation has already played, skip
    if (playOnce && hasAnimated.current) return;
    
    // Clear previous refs
    childrenRefs.current = [];
    
    // Get all direct children elements
    const childElements = Array.from(containerRef.current.children) as HTMLElement[];
    childrenRefs.current = childElements;
    
    // Make sure everything is properly set to initial state
    gsap.set(childElements, {
      autoAlpha: 0,
      filter: 'blur(20px)',
      y: 20,
    });
    
    // Add a small delay to ensure initial state is applied
    const timeline = gsap.timeline({delay: 0.1 + delay});
    
    // Animate elements
    timeline.to(childElements, {
      duration,
      autoAlpha: 1,
      filter: 'blur(0px)',
      y: 0,
      stagger,
      ease: 'power3.out',
      onComplete: () => {
        hasAnimated.current = true;
      }
    });
    
    return () => {
      // Clean up animation if component unmounts
      timeline.kill();
    };
  }, [isInView, stagger, duration, delay, playOnce]);

  // Apply CSS to ensure container is visible even if children are not
  return (
    <div ref={containerRef} className={className} style={{ visibility: 'visible' }}>
      {children}
    </div>
  );
};

export default StaggerBlurOut;
