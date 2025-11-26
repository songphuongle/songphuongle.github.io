import React, { useRef, useEffect } from 'react';

interface Point3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  theta: number;
  phi: number;
  r: number;
}

const ParticleBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 3D Configuration
    const particleCount = width < 768 ? 90 : 250;
    // Increased size: significantly larger on both mobile and desktop
    const globeRadius = width < 768 ? width / 2.0 : width / 2.2; 
    const points: Point3D[] = [];
    const connectionDistance = 140; // Slightly increased connection distance due to larger scale
    
    // Use slightly brighter/more vibrant base colors for impact
    const baseColor = isDark ? { r: 0, g: 212, b: 255 } : { r: 37, g: 99, b: 235 }; 

    // Initialize 3D points
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      points.push({
        baseX: 0, // Calculated in loop
        baseY: 0,
        baseZ: 0,
        theta,
        phi,
        r: globeRadius * (0.85 + Math.random() * 0.15) // Slight random depth variation
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    let autoRotateSpeed = 0.0015;
    
    const animate = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const t = time * 0.001; // Time in seconds

      // Calculate target rotation based on mouse (Interactive part)
      // Increased sensitivity factor from 0.0002 to 0.001 (5x stronger)
      const targetRotX = (mouseRef.current.y - height / 2) * 0.001;
      const targetRotY = (mouseRef.current.x - width / 2) * 0.001;
      
      // Auto rotation + Mouse influence
      // Increased damping/lerp factor from 0.05 to 0.1 for faster, snappier reaction
      rotationX += (targetRotX - rotationX) * 0.1;
      rotationY += autoRotateSpeed + (targetRotY - rotationY * 0.5) * 0.1;

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 500; 

      const projectedPoints: { x: number, y: number, z: number, scale: number, alpha: number }[] = [];

      // Update and Project Points with WOBBLE (Wave Motion)
      points.forEach((p) => {
        // Create wave effect based on time and position
        // This makes the sphere surface "undulate"
        const wave = Math.sin(t * 2 + p.phi * 3 + p.theta * 2) * (globeRadius * 0.05);
        const currentR = p.r + wave;

        // Recalculate 3D position based on dynamic Radius
        const px = currentR * Math.sin(p.phi) * Math.cos(p.theta);
        const py = currentR * Math.sin(p.phi) * Math.sin(p.theta);
        const pz = currentR * Math.cos(p.phi);

        // Rotate Y
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        let x = px * cosY - pz * sinY;
        let z = pz * cosY + px * sinY;

        // Rotate X
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        let y = py * cosX - z * sinX;
        z = z * cosX + py * sinX;

        // Perspective Projection
        const depth = z + globeRadius + focalLength; 
        const scale = focalLength / depth;
        
        const x2d = x * scale + cx;
        const y2d = y * scale + cy;

        // Calculate dynamic alpha based on depth and wave
        const alpha = Math.max(0.05, scale - 0.2);

        projectedPoints.push({ x: x2d, y: y2d, z, scale, alpha });
      });

      // Sort points by Z depth so front points draw on top of lines
      projectedPoints.sort((a, b) => b.z - a.z);

      // Draw Lines (Neural Network Connections)
      ctx.lineWidth = 0.5;
      
      // Optimization: Only try to connect points that are relatively close in the sorted array
      // This is a naive heuristic but works well for visual clusters
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        
        // Skip back-facing points for line drawing to reduce clutter
        if (p1.z < -globeRadius * 0.3) continue;

        let connections = 0;
        for (let j = i + 1; j < projectedPoints.length; j++) {
          if (connections > 4) break; // Limit connections per node

          const p2 = projectedPoints[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connection logic
          if (dist < connectionDistance * p1.scale) {
             const opacity = (1 - dist / (connectionDistance * p1.scale)) * Math.min(p1.alpha, p2.alpha) * 0.4;
             
             ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`;
             ctx.beginPath();
             ctx.moveTo(p1.x, p1.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
             connections++;
          }
        }
      }

      // Draw Particles
      projectedPoints.forEach(p => {
         ctx.beginPath();
         // Size also pulses with the wave inherently due to perspective scaling (z-change)
         const radius = Math.max(0.5, 1.8 * p.scale); 
         ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
         
         ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${p.alpha})`;
         ctx.fill();

         // Glow effect for front-most particles
         if (p.scale > 0.9) {
             ctx.shadowBlur = 12 * p.scale;
             ctx.shadowColor = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${p.alpha})`;
             ctx.fill();
             ctx.shadowBlur = 0; 
         }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: isDark ? 0.8 : 0.6 }} 
    />
  );
};

export default ParticleBackground;