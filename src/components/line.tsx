import React from 'react'

interface LineProps {
  start?: { x: number, y: number }
  end?: { x: number, y: number }
  length?: number
  orientation?: 'horizontal' | 'vertical'
  thickness?: number
  color?: string
  className?: string
  animated?: boolean
  dashArray?: string
  dashOffset?: string
}

const Line: React.FC<LineProps> = ({ 
  start = { x: 0, y: 0 }, 
  end = { x: 0, y: 0 },
  length,
  orientation = 'horizontal',
  thickness = 1,
  color = 'white',
  className = '',
  animated = false,
  dashArray = '',
  dashOffset = ''
}) => {
  // Calculate start and end points based on orientation and length if provided
  const x1 = start.x;
  const y1 = start.y;
  let x2 = end.x;
  let y2 = end.y;
  
  if (length) {
    if (orientation === 'horizontal') {
      x2 = x1 + length;
      y2 = y1;
    } else { // vertical
      x2 = x1;
      y2 = y1 + length;
    }
  }
  
  // Calculate viewBox dimensions
  const width = Math.abs(x2 - x1) + thickness;
  const height = Math.abs(y2 - y1) + thickness;
  const viewBox = `0 0 ${width} ${height}`;
  
  // Adjust line position to account for stroke width
  const halfThickness = thickness / 2;
  const lineX1 = x1 === x2 ? halfThickness : halfThickness;
  const lineY1 = y1 === y2 ? halfThickness : halfThickness;
  const lineX2 = x1 === x2 ? halfThickness : width - halfThickness;
  const lineY2 = y1 === y2 ? height - halfThickness : halfThickness;
  
  // Animation properties
  const animationProps = animated ? {
    strokeDasharray: dashArray || '5,5',
    strokeDashoffset: dashOffset || '0',
    style: {
      animation: 'dash 1.5s linear infinite'
    }
  } : {};
  
  return (
    <>
      {animated && (
        <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 20;
            }
          }
        `}</style>
      )}
      <svg 
        width={width} 
        height={height} 
        viewBox={viewBox}
        className={className}
        style={{ overflow: 'visible' }}
      >
        <line
          x1={lineX1}
          y1={lineY1}
          x2={lineX2}
          y2={lineY2}
          stroke={color}
          strokeWidth={thickness}
          {...animationProps}
        />
      </svg>
    </>
  )
}

export default Line