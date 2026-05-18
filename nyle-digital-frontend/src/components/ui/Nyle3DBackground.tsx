'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
}

export default function Nyle3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  // Mouse and scroll variables tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Handles viewport resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initializing 3D floating particles
    const initParticles = () => {
      const list: Particle[] = [];
      const particleCount = 42;
      for (let i = 0; i < particleCount; i++) {
        list.push({
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 400,
          z: Math.random() * 600,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          vz: -Math.random() * 0.6 - 0.2, // Drifting towards camera
          color: i % 2 === 0 ? 'rgba(34, 211, 238,' : 'rgba(99, 102, 241,',
        });
      }
      particlesRef.current = list;
    };
    initParticles();

    // Mouse tilt tracking
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to range [-1, 1]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll speed enhancement tracking
    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3D Engine Loop
    const render = () => {
      time += 0.008;

      // Smooth interpolation/damping for mouse and scroll movement (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const scroll = scrollRef.current;
      scroll.y += (scroll.targetY - scroll.y) * 0.06;

      // Clear with zero background to let layout theme background show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = resolvedTheme === 'dark';
      const width = canvas.width;
      const height = canvas.height;

      // Projection Configuration
      const fov = 380;
      const maxDepth = 600;
      const tiltX = mouse.x * 0.12; // tilt camera Y based on mouse X
      const tiltY = mouse.y * 0.08 + scroll.y * 0.0005; // tilt camera X based on mouse Y + scroll

      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate around Y-axis (tiltX)
        let x1 = x3d * Math.cos(tiltX) - z3d * Math.sin(tiltX);
        let z1 = x3d * Math.sin(tiltX) + z3d * Math.cos(tiltX);

        // Rotate around X-axis (tiltY)
        let y2 = y3d * Math.cos(tiltY) - z1 * Math.sin(tiltY);
        let z2 = y3d * Math.sin(tiltY) + z1 * Math.cos(tiltY);

        if (z2 <= 20) return null;

        const scale = fov / z2;
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          depth: z2,
        };
      };

      // 1. Draw 3D Perspective Undulating Wave Grid
      const draw3DGrid = () => {
        const gridSpacing = 40;
        const gridWidth = 400;
        const speedMultiplier = 1 + (scroll.y * 0.002);
        const camOffsetZ = (time * 18 * speedMultiplier) % gridSpacing;

        const getGridY = (x: number, z: number) => {
          // Double sine wave representing technological pulse waves
          return 160 + 
            Math.sin(x * 0.006 + time * 1.5) * 16 + 
            Math.cos(z * 0.008 - time * 1.0) * 16;
        };

        const gridColor = isDark ? 'rgba(6, 182, 212, ' : 'rgba(37, 99, 235, ';
        const minorColor = isDark ? 'rgba(59, 130, 246, ' : 'rgba(13, 148, 136, ';

        // Lateral lines (horizontal segments)
        for (let z = gridSpacing; z < maxDepth; z += gridSpacing) {
          const currentZ = z - camOffsetZ;
          if (currentZ <= 0) continue;

          ctx.beginPath();
          let firstPoint = true;

          for (let x = -gridWidth; x <= gridWidth; x += 20) {
            const y = getGridY(x, currentZ);
            const pt = project(x, y, currentZ);

            if (pt) {
              if (firstPoint) {
                ctx.moveTo(pt.x, pt.y);
                firstPoint = false;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            }
          }

          const depthFade = 1 - currentZ / maxDepth;
          ctx.strokeStyle = `${gridColor}${depthFade * (isDark ? 0.15 : 0.08)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Longitudinal lines (vertical segments extending into Z depth)
        for (let x = -gridWidth; x <= gridWidth; x += gridSpacing) {
          ctx.beginPath();
          let firstPoint = true;

          for (let z = gridSpacing; z < maxDepth; z += 15) {
            const currentZ = z - camOffsetZ;
            if (currentZ <= 0) continue;

            const y = getGridY(x, currentZ);
            const pt = project(x, y, currentZ);

            if (pt) {
              if (firstPoint) {
                ctx.moveTo(pt.x, pt.y);
                firstPoint = false;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            }
          }

          const depthFade = 0.5;
          ctx.strokeStyle = `${minorColor}${depthFade * (isDark ? 0.06 : 0.04)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      };

      draw3DGrid();

      // 2. Draw 3D Floating Constellation Mesh
      const particles = particlesRef.current;
      const projectedList: { x: number; y: number; depth: number; particle: Particle }[] = [];

      particles.forEach((p) => {
        // Move particle forward in Z space, speed up slightly during fast scrolls
        const scrollBoost = scroll.y * 0.005;
        p.z += p.vz * (1 + scrollBoost);
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles back to far plane if they pass the camera
        if (p.z <= 10) {
          p.z = maxDepth;
          p.x = (Math.random() - 0.5) * 600;
          p.y = (Math.random() - 0.5) * 400;
        }

        const pt = project(p.x, p.y, p.z);
        if (pt) {
          projectedList.push({
            x: pt.x,
            y: pt.y,
            depth: pt.depth,
            particle: p,
          });
        }
      });

      // Draw constellation connections (based on 3D distance proximity)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projectedList.length; i++) {
        for (let j = i + 1; j < projectedList.length; j++) {
          const pi = projectedList[i];
          const pj = projectedList[j];

          // Compute 3D distance
          const dx = pi.particle.x - pj.particle.x;
          const dy = pi.particle.y - pj.particle.y;
          const dz = pi.particle.z - pj.particle.z;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < 110) {
            const opacity = (1 - dist3d / 110) * (1 - pi.depth / maxDepth) * (1 - pj.depth / maxDepth);
            ctx.strokeStyle = isDark
              ? `rgba(147, 197, 253, ${opacity * 0.15})`
              : `rgba(59, 130, 246, ${opacity * 0.1})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Render individual particle nodes
      projectedList.forEach(({ x, y, depth, particle: p }) => {
        const depthFade = 1 - depth / maxDepth;
        const finalSize = p.size * (fov / depth) * 0.5;

        // Glow radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, finalSize * 3);
        const colorPrefix = p.color;
        
        gradient.addColorStop(0, `${colorPrefix}${depthFade * (isDark ? 0.9 : 0.7)})`);
        gradient.addColorStop(0.3, `${colorPrefix}${depthFade * (isDark ? 0.4 : 0.3)})`);
        gradient.addColorStop(1, `${colorPrefix}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, finalSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${depthFade * 0.8})`
          : `rgba(37, 99, 235, ${depthFade * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, finalSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
