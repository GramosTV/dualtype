'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// Import the OrbitControls type from drei
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import gsap from 'gsap';
import { Suspense } from 'react';

import { KeyboardView } from '@/components/three';

interface RotationProps {
  initialColor?: string;
  initialBoard?: string;
  className?: string;
}

// Custom component for texture loading and material creation
const TexturedKeyboard = ({
  color,
  board,
  position,
}: {
  color: string;
  board: string;
  position: [number, number, number];
}) => {
  return <KeyboardView color={color} board={board} position={position} />;
};

const Rotation: React.FC<RotationProps> = ({ initialColor = '#282828', initialBoard = '#0d1b2a', className = '' }) => {
  // Use the correct type for OrbitControls
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Add state for tracking mouse position and hover state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const TextRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<boolean>(true);
  // Set a slower rotation speed
  const autoRotateSpeed = 0.5; // Lower value means slower rotation (default is 2.0)

  // Handle mouse movement over the canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Use GSAP to animate the cursor text position for smoother movement
      if (cursorTextRef.current) {
        gsap.to(cursorTextRef.current, {
          duration: 0.5,
          ease: 'power2.out',
          x: x, // Offset from cursor
          y: y, // Offset from cursor
        });
      }

      if (TextRef.current) {
        gsap.to(TextRef.current, {
          duration: 0.3,
          ease: 'power2.out',
          x: x, // Offset from cursor
          y: y, // Offset from cursor
        });
      }

      // Still update state for component re-renders if needed
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    // Initial setup for the cursor text element
    if (cursorTextRef.current) {
      gsap.set(cursorTextRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        scale: 0,
        opacity: 0,
      });
    }
  }, []);

  // Handle hover state with GSAP animations
  useEffect(() => {
    if (cursorTextRef.current) {
      if (isHovering) {
        gsap.to(cursorTextRef.current, {
          duration: 0.3,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
        });
      } else {
        gsap.to(cursorTextRef.current, {
          duration: 0.5,

          scale: 0,
          ease: 'power2.out',
        });
      }
    }
  }, [isHovering]);

  return (
    <div className={` h-[80vh]  pointer-events-none b relative w-full ${className}`}>
      <div
        className="w-[20vw] h-[20vw] bg-white opacity-55 blur-[250px] absolute
      bottom-[20vh] right-[30vw] "
      ></div>
      <div className="text-[16px] ml-[3vw]  font-bold absolute bottom-0  uppercase tracking-tighter">
        Designed by polish artist 2025
      </div>{' '}
      <div
        id="scrollsticker"
        className="leading-[90%] text-[17vw] font-bold  uppercase tracking-[-30px] top-0  ml-[2vw] absolute "
      >
        Watch
        <br />
        me <br />
        in 3D
      </div>
      <div className="leading-[90%] blur-[100px] opacity-30 text-[17vw] font-bold  uppercase tracking-[-30px] top-0  ml-[2vw] absolute ">
        Watch
        <br />
        me <br />
        in 3D
      </div>
      <div className="opacity-10 z-[-100] ">
        <div className="w-full h-[80vh] flex  items-center justify-between absolute z-[-100]">
          <div className="w-full  h-[80vh] "></div>
        </div>
        <div className="w-full h-full flex items-center justify-between absolute z-[-100]"></div>
      </div>
      <div className="absolute top-4 left-4 z-10 bg-black/30 p-3 backdrop-blur-sm rounded-lg"></div>
      <div className=" right-0 absolute opacity-50 mr-[3vw] text-[13px]   text-justify w-[20vw] tracking-tight leading-[100%]">
        <div className="">
          According to the documents, the teenagers – drafted in from schools and technical colleges in and around the
          central southern city of Hengyang – are classified as &quot;interns&quot;, and their teachers are paid by the
          factory to accompany them. Teachers are asked colleges in and around the central southern city of Hengyang –
          are classified as &quot;internscolleges in and around the central southern city of Hengyang – are classified
          as &quot;interns
        </div>
        <div className="opacity-50 mr-[3vw] text-justify w-[20vw] tracking-tight leading-[100%]">
          According to the documents, the teenagers – drafted in from schools and technical colleges in and around the
          central southern city of Hengyang – are classified as &quot;interns&quot;, and their teachers are paid by the
          factory to accompany them. Teachers are asked colleges in and around the central southern city of Hengyang –
          are classified as &quot;internscolleges in and around the central southern city of Hengyang – are classified
          as &quot;interns
        </div>
      </div>
      {/* Cursor-following rotate text - now with GSAP animation */}
      <div
        ref={cursorTextRef}
        className={`absolute pointer-events-none translate-x-[50%] font-bold text-white bg-black/20 border-2 border-[#ffffff34] rounded-full backdrop-blur-lg w-[15vw] h-[15vw] text-sm tracking-wider z-20 ${
          !isHovering ? 'opacity-0' : ''
        }`}
        style={{
          position: 'absolute',
          zIndex: 10,
        }}
      ></div>
      <div
        ref={TextRef}
        className={`absolute pointer-events-none font-bold text-white flex items-center justify-center  w-[6vw] h-[6vw] text-lg tracking-tighter z-20 ${
          !isHovering ? 'opacity-0' : ''
        }`}
        style={{
          position: 'absolute',
          zIndex: 20,
        }}
      >
        360°
      </div>
      <div
        ref={canvasContainerRef}
        className="w-full h-[80vh] min-h-[400px] pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense
            fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#333" wireframe />
              </mesh>
            }
          >
            {/* Improved lighting setup */}

            <OrbitControls
              ref={controlsRef}
              autoRotate={autoRotateRef.current}
              autoRotateSpeed={autoRotateSpeed}
              enableZoom={false}
              enablePan={false}
              minDistance={5}
              maxDistance={30}
            />
            <ambientLight intensity={1} />
            <pointLight position={[0, 0, -3]} intensity={40.2} />
            <pointLight position={[5, -5, 5]} intensity={40.6} />
            <pointLight position={[5, 5, 5]} intensity={40.6} />

            <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2.4}>
              <TexturedKeyboard color={initialColor} board={initialBoard} position={[0, 1, 0]} />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Rotation;
