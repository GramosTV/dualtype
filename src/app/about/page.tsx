'use client';
import React from 'react';
import { Blocks } from '@/components/ui';
import { CleanAppear } from '@/components/animations';

const About = () => {
  return (
    <div
      className="w-[100vw] h-[100vh] relative"
      style={{
        position: 'relative',
        background: 'transparent',
      }}
    >
      <CleanAppear>Greate Depression</CleanAppear>

      <Blocks />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', // This allows mouse events to pass through to the blocks
        }}
      >
        <h1 className="text-4xl font-bold" style={{ pointerEvents: 'auto' }}>
          About
        </h1>
      </div>
    </div>
  );
};

export default About;
