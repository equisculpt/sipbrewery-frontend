'use client';

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface BackgroundEffectsProps {
  mousePosition?: { x: number; y: number };
}

export default function BackgroundEffects({ mousePosition }: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lines, setLines] = useState<Array<{x1: number, y1: number, x2: number, y2: number}>>([]);
  const [isClient, setIsClient] = useState(false);
  const [internalMousePosition, setInternalMousePosition] = useState({ x: 0, y: 0 });

  // Use internal mouse position if not provided
  const currentMousePosition = mousePosition || internalMousePosition;

  useEffect(() => {
    setIsClient(true);
    
    // Add internal mouse tracking if not provided
    const handleMouseMove = (e: MouseEvent) => {
      setInternalMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (!mousePosition) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Generate lines only on client to avoid hydration mismatch
    const lineData = Array.from({length: 25}).map(() => ({
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100
    }));
    setLines(lineData);
    
    // Generate 150 premium particles only on client
    const particleArray = Array.from({length: 150}, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.9 + 0.1,
      color: ['#00f9ff', '#ff0080', '#39ff14', '#8b5cf6', '#f59e0b', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 8)]
    }));
    setParticles(particleArray);
    
    return () => {
      if (!mousePosition) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mousePosition]);

  // Animate particles with physics
  useEffect(() => {
    if (!isClient || particles.length === 0) return;
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }
        
        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      }));
    };
    
    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [isClient, particles.length]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic Mesh Gradients - Tesla/Amazon Level */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-70">
          <div className="absolute w-[1000px] h-[1000px] -top-60 -left-60 bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
          <div className="absolute w-[800px] h-[800px] top-40 right-40 bg-gradient-to-bl from-purple-500/40 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s', animationDelay: '3s'}}></div>
          <div className="absolute w-[900px] h-[900px] bottom-40 left-1/3 bg-gradient-to-tr from-green-500/40 via-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '18s', animationDelay: '6s'}}></div>
          <div className="absolute w-[700px] h-[700px] top-1/3 right-1/3 bg-gradient-to-tl from-yellow-500/40 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '20s', animationDelay: '2s'}}></div>
          <div className="absolute w-[600px] h-[600px] bottom-1/4 right-1/4 bg-gradient-to-br from-red-500/40 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '14s', animationDelay: '8s'}}></div>
        </div>
      </div>
      
      {/* 150 Advanced Particle System with Physics */}
      {isClient && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}, 0 0 ${particle.size * 8}px ${particle.color}40`,
            filter: `blur(${particle.size * 0.2}px)`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Neural Network Lines - Advanced AI Visualization */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neuralGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f9ff" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#ff0080" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#39ff14" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {isClient && lines.map((line, i) => (
          <line
            key={i}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#neuralGradient1)"
            strokeWidth={Math.random() * 1.5 + 0.5}
            filter="url(#glow)"
            className="animate-pulse"
            style={{
              animationDuration: `${3 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </svg>
      
      {/* Interactive Mouse Glow - Premium Effect */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: currentMousePosition.x - 250,
          top: currentMousePosition.y - 250,
          background: `
            radial-gradient(circle, 
              rgba(0, 249, 255, 0.15) 0%, 
              rgba(255, 0, 128, 0.1) 30%, 
              rgba(139, 92, 246, 0.08) 60%, 
              transparent 100%
            )
          `,
          filter: 'blur(30px)',
          transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`
        }}
      />
    </div>
  );
}
