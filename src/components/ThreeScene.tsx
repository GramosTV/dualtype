"use client";
import { Canvas} from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { Keyboard } from "./Keyboard";
import { Suspense } from "react";



interface ThreeSceneProps {
  zoom?: number;
  color?: string;
  board?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({color, board }) => {

  return (
    <div className="h-full w-[50vw] overflow-hidden relative   z-[100000]  pointer-events-none  ">




      <Canvas
        className="h-[280vh] w-[50vw] overflow-hidden relative    b flex items-center justify-center "
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <Suspense fallback={"Loading"}>
          <Scene color={color} board={board} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;

interface SceneProps {
  color?: string;
  board?: string;
}

const Scene: React.FC<SceneProps> = ({ color, board }) => {
  const keyboardRef = useRef<THREE.Group>(null);


  useEffect(() => {
    if (!keyboardRef.current) return;
    gsap.set(keyboardRef.current.position, { y: -4.3 });
    gsap.set(keyboardRef.current.position, { x: -0.5 });
    gsap.set(keyboardRef.current.rotation, { y: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "center top",
        scrub: true,
      },
    });
    tl.to(keyboardRef.current.position, {
      x: -0.21, // Move to x position 1
      z: -2.15, // Move to z position 1
      ease: "power3.out",


      
    }, 0); // Start at the same time (0 seconds offset)
    tl.to(keyboardRef.current.rotation, {
      y: 1 * Math.PI, // Rotate 360 degrees
      ease: "power3.out",
    }, 0); // Start at the same time (0 seconds offset)

    return () => {
      tl.kill(); // Cleanup GSAP animation
    };
  }, []);


  return (
    <group ref={keyboardRef} position={[-0.3, -4.5, 0]} scale={1.5}>
      <pointLight intensity={102} color={"#F2F1FF"} position={[0, 7, -0.4]} />

      <ambientLight color={"#fffbdd"} intensity={0.01} />

      <pointLight intensity={40} color={"#ffffff"}  position={[-3.5, 3, -1]} />
      <pointLight intensity={100}  color={"#fffbdd"} position={[3.5, 3, -2]} />
     
      
      <pointLight intensity={200} color={"#ffffff"}  position={[-2.5, 0.1, -1.2]} />
  
      <Keyboard size={color} board={board} />
    </group>
  );
};
