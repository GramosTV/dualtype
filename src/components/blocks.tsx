"use client"
import React, { useEffect, useRef } from 'react'

const blocksize = 120
const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
const numCols = Math.ceil(screenWidth / blocksize)
const numRows = Math.ceil(screenHeight / blocksize)
const numBlocks = numCols * numRows

function shuffleArray<T>(array: T[]): T[] {
   for(let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1))
     ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}

type BlockElement = HTMLDivElement;
type BlockEventHandler = (this: BlockElement, ev: MouseEvent) => void;

const Blocks = () => {
  const blocks = useRef<HTMLDivElement>(null)
  
  // Using a proper function type
  const highlightFunction: BlockEventHandler = function(this: BlockElement) {
    console.log("Highlighting block:", this.dataset.index); // Debug logging
    
    const index = parseInt(this.dataset.index || '0')
    const neighbors = [
        index - 1,
        index + 1,
        index - numCols,
        index + numCols,
        index - numCols - 1,
        index - numCols + 1,
        index + numCols - 1,
        index + numCols + 1
    ].filter((i) => i >= 0 && i < numBlocks && Math.abs(i % numCols - index % numCols) <= 1)
    
    this.classList.add('highlight')
    setTimeout(() => { this.classList.remove('highlight') }, 500)
    
    shuffleArray([...neighbors]).slice(0, 3).forEach((nIndex: number) => {
      if (blocks.current && blocks.current.children[nIndex]) {
        const neighbor = blocks.current.children[nIndex] as HTMLDivElement
        neighbor.classList.add('highlight')
        setTimeout(() => { neighbor.classList.remove('highlight') }, 500)
      }
    })
  }

  useEffect(() => {
    if (!blocks.current) return
    
    // Store a reference to blocks.current for cleanup
    const blocksElement = blocks.current
    
    // Set grid layout properties
    blocksElement.style.display = 'grid'
    blocksElement.style.gridTemplateColumns = `repeat(${numCols}, ${blocksize}px)`
    blocksElement.style.gridAutoRows = `${blocksize}px` // This ensures rows are created correctly
    blocksElement.style.width = '100%'
    blocksElement.style.height = '100vh'
    blocksElement.style.position = 'absolute'
    blocksElement.style.top = '0'
    blocksElement.style.left = '0'
    blocksElement.style.pointerEvents = 'auto' // Ensure mouse events work
    
    // Clear any existing blocks
    blocksElement.innerHTML = ''
    
    // Create and append blocks
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement('div')
      block.classList.add('block')
      block.dataset.index = i.toString()
      block.style.width = `${blocksize}px`
      block.style.height = `${blocksize}px`
      block.style.border = '0.5px solid rgba(255, 255, 255, 0.01)'
      block.style.transition = 'border-color 0.3s ease'
      
      // Use proper type casting for the event handler
      block.addEventListener('mouseenter', highlightFunction as EventListener)
      
      blocksElement.appendChild(block)
    }
    
    // Add highlight style - make it more visible
    const style = document.createElement('style')
    style.innerHTML = `
      .block {
        box-sizing: border-box;
        cursor: pointer;
      }
      .highlight {
        border:0.5px solid rgba(255, 255, 255, 0.1) !important;
      }
    `
    document.head.appendChild(style)
    
    // Cleanup function
    return () => {
      // Use the stored reference instead of blocks.current
      if (blocksElement) {
        const blockElements = blocksElement.querySelectorAll('.block')
        blockElements.forEach(block => {
          block.removeEventListener('mouseenter', highlightFunction as EventListener)
        })
      }
      
      // Remove the style element
      const styleElement = document.head.querySelector('style:last-child')
      if (styleElement) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  return (
    <div className='w-[90%] h-full absolute'>
      <div className='z-[-10000]' style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden',
        zIndex: 0 // Ensure the container has a higher z-index
      }}>
        <div ref={blocks} id='blocks' style={{ pointerEvents: 'auto' }}></div>
      </div>
    </div>
  )
}

export default Blocks