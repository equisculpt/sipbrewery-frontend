'use client';

import { useState, useEffect, useRef } from 'react';

interface FloatingIcon {
  id: number;
  icon: string;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  scale: number;
  speed: number;
  color: string;
}

export default function FloatingElements() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Financial icons with colors
  const financialIcons = [
    { icon: '💰', color: '#39ff14' },
    { icon: '📈', color: '#00f9ff' },
    { icon: '💎', color: '#8000ff' },
    { icon: '🏦', color: '#ff8000' },
    { icon: '💳', color: '#ff4757' },
    { icon: '📊', color: '#00f9ff' },
    { icon: '🎯', color: '#39ff14' },
    { icon: '⚡', color: '#ffff00' },
    { icon: '🚀', color: '#ff6b6b' },
    { icon: '💼', color: '#8000ff' },
    { icon: '🔥', color: '#ff8000' },
    { icon: '⭐', color: '#ffff00' }
  ];

  // Initialize floating icons
  useEffect(() => {
    const initIcons = () => {
      const newIcons: FloatingIcon[] = [];
      
      for (let i = 0; i < 15; i++) {
        const iconData = financialIcons[i % financialIcons.length];
        newIcons.push({
          id: i,
          icon: iconData.icon,
          x: Math.random() * 100,
          y: Math.random() * 100,
          z: Math.random() * 100,
          rotationX: Math.random() * 360,
          rotationY: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          speed: 0.5 + Math.random() * 1.5,
          color: iconData.color
        });
      }
      
      setIcons(newIcons);
    };

    initIcons();
  }, []);

  // Mouse tracking for 3D interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const animateIcons = () => {
      setIcons(prevIcons => 
        prevIcons.map(icon => ({
          ...icon,
          rotationX: icon.rotationX + icon.speed * 0.5,
          rotationY: icon.rotationY + icon.speed * 0.3,
          y: icon.y + Math.sin(Date.now() * 0.001 + icon.id) * 0.1,
          x: icon.x + Math.cos(Date.now() * 0.0008 + icon.id) * 0.05
        }))
      );
    };

    const interval = setInterval(animateIcons, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on server
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {icons.map((icon) => {
        // Calculate 3D transformation based on mouse position
        const mouseInfluenceX = mousePosition.x * 20;
        const mouseInfluenceY = mousePosition.y * 20;
        const perspective = 1000;
        const translateZ = icon.z * 200 - 100;
        
        return (
          <div
            key={icon.id}
            style={{
              position: 'absolute',
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              fontSize: `${2 + icon.scale}rem`,
              color: icon.color,
              transform: `
                perspective(${perspective}px)
                translateZ(${translateZ}px)
                rotateX(${icon.rotationX + mouseInfluenceY}deg)
                rotateY(${icon.rotationY + mouseInfluenceX}deg)
                scale(${icon.scale})
              `,
              filter: `
                drop-shadow(0 0 10px ${icon.color}40)
                blur(${Math.abs(translateZ) / 100}px)
              `,
              opacity: Math.max(0.3, 1 - Math.abs(translateZ) / 300),
              transition: 'all 0.1s ease-out',
              textShadow: `0 0 20px ${icon.color}`,
              animation: `float-${icon.id} ${3 + icon.speed}s ease-in-out infinite alternate`
            }}
          >
            {icon.icon}
          </div>
        );
      })}
      
      {/* Dynamic CSS animations */}
      <style jsx>{`
        ${icons.map(icon => `
          @keyframes float-${icon.id} {
            0% { 
              transform: 
                perspective(1000px)
                translateZ(${icon.z * 200 - 100}px)
                rotateX(${icon.rotationX}deg)
                rotateY(${icon.rotationY}deg)
                scale(${icon.scale})
                translateY(0px);
            }
            100% { 
              transform: 
                perspective(1000px)
                translateZ(${icon.z * 200 - 100}px)
                rotateX(${icon.rotationX + 10}deg)
                rotateY(${icon.rotationY + 15}deg)
                scale(${icon.scale * 1.1})
                translateY(-20px);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

// Particle System Component
export function ParticleSystem() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
  }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Initialize particles
    const initParticles = () => {
      const newParticles = [];
      const colors = ['#00f9ff', '#39ff14', '#8000ff', '#ff8000'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      
      setParticles(newParticles);
    };

    initParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx;
          let newVy = particle.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newVx = -particle.vx;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newVy = -particle.vy;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on server
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* Connecting Lines */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.3
        }}
      >
        {particles.map((particle, i) =>
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 15) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${otherParticle.x}%`}
                  y2={`${otherParticle.y}%`}
                  stroke={particle.color}
                  strokeWidth="1"
                  opacity={Math.max(0, 1 - distance / 15)}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: 'translate(-50%, -50%)',
            animation: `glow-${particle.id} 2s ease-in-out infinite alternate`
          }}
        />
      ))}
      
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes glow-${particle.id} {
            0% { 
              box-shadow: 0 0 ${particle.size * 3}px ${particle.color};
              opacity: ${particle.opacity};
            }
            100% { 
              box-shadow: 0 0 ${particle.size * 6}px ${particle.color};
              opacity: ${particle.opacity * 1.5};
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}
