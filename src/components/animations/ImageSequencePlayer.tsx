// "use client";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { gsap } from "gsap";
// import Appear from "./Appear";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// interface ImageSequencePlayerProps {
//   onImagesLoaded: () => void;
// }

// const ImageSequencePlayer: React.FC<ImageSequencePlayerProps> = ({
//   onImagesLoaded,
// }) => {
//   const container = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [frame, setFrame] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [hasError, setHasError] = useState(false);
  
//   const fps = 24;
//   const totalFrames = 25;
//   const frameInterval = 1000 / fps;
  
//   // Initialize animation refs to store and clean up animations
//   const animationsRef = useRef<gsap.core.Tween[]>([]);

//   // Preload images using useMemo to avoid reloading on each render
//   const images = useMemo(() => {
//     const imgArray: HTMLImageElement[] = [];
//     if (typeof window !== "undefined") {
//       for (let i = 0; i < totalFrames; i++) {
//         const img = new window.Image();
//         const frameNumber = String(i + 1).padStart(4, "0");
//         img.src = `/video/appear/${frameNumber}.png`;
//         // Add crossOrigin attribute to handle CORS issues if needed
//         img.crossOrigin = "anonymous";
//         imgArray.push(img);
//       }
//     }
//     return imgArray;
//   }, [totalFrames]);

//   // Set up scroll animations
//   useEffect(() => {
//     if (!container.current || !canvasRef.current) return;
    
//     // Create a loading progress animation
//     const clipAnimation = gsap.to("#clipprogres", {
//       duration: 2,
//       clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
//       paused: true, // Start paused, we'll control it with the loading progress
//     });
    
//     // Add to animation registry for cleanup
//     animationsRef.current.push(clipAnimation);
    
//     // Set up scroll animation only after images are loaded
//     if (isLoaded && canvasRef.current) {
//       // Force ScrollTrigger refresh to ensure proper positioning
//       ScrollTrigger.refresh();
      
//       const scrollAnim = gsap.to(canvasRef.current, {
//         scrollTrigger: {
//           trigger: container.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//           markers: false, // Set to true temporarily for debugging
//         },
//         y: "-6vh",
//         ease: "none",
//       });
      
//       animationsRef.current.push(scrollAnim);
//     }
    
//     // Cleanup function
//     return () => {
//       animationsRef.current.forEach(anim => anim.kill());
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [isLoaded]); // Only re-run when isLoaded changes

//   // Load images with progress tracking and error handling
//   useEffect(() => {
//     let loadedImagesCount = 0;
//     let hasLoadError = false;
    
//     // Set a timeout to handle stalled loading
//     const timeoutId = setTimeout(() => {
//       if (!isLoaded && loadedImagesCount < totalFrames) {
//         console.warn("Image loading timed out, proceeding anyway");
//         setIsLoaded(true);
//         onImagesLoaded();
//       }
//     }, 10000); // 10 second timeout
    
//     const onImageLoad = () => {
//       loadedImagesCount++;
//       // Update loading progress percentage
//       const progress = Math.round((loadedImagesCount / totalFrames) * 100);
//       setLoadProgress(progress);
      
//       // Update clip animation progress to reflect loading
//       const progressRatio = loadedImagesCount / totalFrames;
//       gsap.to("#clipprogres", {
//         clipPath: `polygon(0 0, ${progressRatio * 100}% 0, ${progressRatio * 100}% 100%, 0 100%)`,
//         duration: 0.3,
//       });
      
//       if (loadedImagesCount === totalFrames && !hasLoadError) {
//         clearTimeout(timeoutId);
//         setIsLoaded(true);
//         onImagesLoaded();
//       }
//     };
    
//     const onImageError = (index: number) => {
//       console.error(`Failed to load image ${index + 1}`);
//       hasLoadError = true;
//       setHasError(true);
      
//       // Still try to continue if some images loaded
//       loadedImagesCount++;
//       if (loadedImagesCount === totalFrames) {
//         clearTimeout(timeoutId);
//         setIsLoaded(true);
//         onImagesLoaded();
//       }
//     };
    
//     images.forEach((img, index) => {
//       if (img.complete && img.naturalHeight !== 0) {
//         // Image is already loaded (from cache)
//         onImageLoad();
//       } else {
//         img.onload = onImageLoad;
//         img.onerror = () => onImageError(index);
//       }
//     });
    
//     return () => {
//       clearTimeout(timeoutId);
//       // Remove event listeners to prevent memory leaks
//       images.forEach(img => {
//         img.onload = null;
//         img.onerror = null;
//       });
//     };
//   }, [images, totalFrames, onImagesLoaded]);

//   // Animation loop for playing frames
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || frame >= totalFrames || !isLoaded) return;
    
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
    
//     const drawImage = (img: HTMLImageElement) => {
//       const { width: canvasW, height: canvasH } = canvas;
//       const { width: imgW, height: imgH } = img;
      
//       // Scale while maintaining aspect ratio
//       const scale = Math.min(canvasW / imgW, canvasH / imgH);
//       const drawWidth = imgW * scale;
//       const drawHeight = imgH * scale;
      
//       // Center the image
//       const offsetX = (canvasW - drawWidth) / 2;
//       const offsetY = (canvasH - drawHeight) / 2;
      
//       ctx.clearRect(0, 0, canvasW, canvasH);
//       ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
//     };
    
//     const img = images[frame];
//     if (img && img.complete && img.naturalHeight !== 0) {
//       drawImage(img);
      
//       // Use requestAnimationFrame for more reliable frame timing
//       const nextFrameTimer = window.setTimeout(() => {
//         setFrame((prev) => (prev + 1 < totalFrames ? prev + 1 : prev));
//       }, frameInterval);
      
//       return () => {
//         window.clearTimeout(nextFrameTimer);
//       };
//     }
//   }, [frame, images, isLoaded, totalFrames, frameInterval]);

//   // Initial canvas setup once loaded
//   useEffect(() => {
//     if (isLoaded && canvasRef.current && images[0]) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
      
//       if (ctx && images[0].complete) {
//         // Draw the first frame immediately when available
//         const img = images[0];
//         const { width: canvasW, height: canvasH } = canvas;
//         const { width: imgW, height: imgH } = img;
        
//         const scale = Math.min(canvasW / imgW, canvasH / imgH);
//         const drawWidth = imgW * scale;
//         const drawHeight = imgH * scale;
        
//         const offsetX = (canvasW - drawWidth) / 2;
//         const offsetY = (canvasH - drawHeight) / 2;
        
//         ctx.clearRect(0, 0, canvasW, canvasH);
//         ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
//       }
//     }
//   }, [isLoaded, images]);

//   return (
//     <div className="md:block  hidden">
//     <div ref={container} className="flex items-center  h-[100vh] relative">
//       {isLoaded ? (
//         <Appear delay={0}>
//           <canvas
//             ref={canvasRef}
//             className="mr-[3.5vw]   translate-x-[0%]  w-[86vw] mt-[32vh]"
//             width={1070}
//             height={1070}
//           />
//         </Appear>
//       ) : (
//         <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 text-center">
//           <div className="text-sm opacity-50 mb-2">Loading frames... {loadProgress}%</div>
//           <div 
//             id="clipprogres" 
//             className="w-[200px] h-[4px] bg-white mx-auto transition-all" 
//             style={{
//               clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)"
//             }}
//           />
//           {hasError && (
//             <div className="text-red-500 mt-2 text-sm">
//               Some frames failed to load. Animation may be incomplete.
//             </div>
//           )}
//         </div>
//       )}
//     </div></div>
//   );
// };

// export default ImageSequencePlayer;