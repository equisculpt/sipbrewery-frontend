'use client';

import { useState, useEffect, useRef } from 'react';

interface InteractiveElement {
  id: string;
  type: 'button' | 'card' | 'input' | 'toggle';
  position: { x: number; y: number };
  isActive: boolean;
  rippleEffect: boolean;
  glowIntensity: number;
}

interface RippleEffect {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

export default function PremiumMicroInteractions() {
  const [elements, setElements] = useState<InteractiveElement[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize interactive elements
  useEffect(() => {
    const initElements = () => {
      const newElements: InteractiveElement[] = [
        {
          id: 'premium-btn-1',
          type: 'button',
          position: { x: 100, y: 100 },
          isActive: false,
          rippleEffect: false,
          glowIntensity: 0
        },
        {
          id: 'premium-card-1',
          type: 'card',
          position: { x: 300, y: 150 },
          isActive: false,
          rippleEffect: false,
          glowIntensity: 0
        },
        {
          id: 'premium-toggle-1',
          type: 'toggle',
          position: { x: 500, y: 200 },
          isActive: false,
          rippleEffect: false,
          glowIntensity: 0
        }
      ];
      setElements(newElements);
    };

    initElements();
  }, []);

  // Handle mouse movement for magnetic effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Create ripple effect
  const createRipple = (x: number, y: number) => {
    const newRipple: RippleEffect = {
      id: `ripple-${Date.now()}`,
      x,
      y,
      timestamp: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  // Premium Button Component
  const PremiumButton = ({ 
    children, 
    onClick, 
    variant = 'primary',
    size = 'medium',
    disabled = false 
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
  }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            color: '#000000',
            boxShadow: isHovered ? '0 8px 32px rgba(0,249,255,0.4)' : '0 4px 16px rgba(0,249,255,0.2)'
          };
        case 'secondary':
          return {
            background: 'linear-gradient(45deg, #8000ff, #ff8000)',
            color: '#ffffff',
            boxShadow: isHovered ? '0 8px 32px rgba(128,0,255,0.4)' : '0 4px 16px rgba(128,0,255,0.2)'
          };
        case 'ghost':
          return {
            background: 'rgba(255,255,255,0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: isHovered ? '0 8px 32px rgba(255,255,255,0.1)' : 'none'
          };
        default:
          return {};
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'small':
          return { padding: '0.5rem 1rem', fontSize: '0.9rem' };
        case 'large':
          return { padding: '1.2rem 2.5rem', fontSize: '1.2rem' };
        default:
          return { padding: '0.8rem 2rem', fontSize: '1rem' };
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        createRipple(e.clientX - rect.left, e.clientY - rect.top);
      }
      
      onClick?.();
    };

    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        disabled={disabled}
        style={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          border: 'none',
          borderRadius: '50px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.05)' : 'scale(1)',
          opacity: disabled ? 0.5 : 1,
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}
      >
        {children}
        
        {/* Shimmer Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: isHovered ? 'shimmer 1.5s infinite' : 'none'
          }}
        />
      </button>
    );
  };

  // Premium Card Component
  const PremiumCard = ({ 
    children, 
    onClick,
    glowColor = '#00f9ff',
    interactive = true 
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    glowColor?: string;
    interactive?: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tiltTransform, setTiltTransform] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!interactive || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      setTiltTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTiltTransform('');
    };

    return (
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${isHovered ? glowColor : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)',
          cursor: interactive ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: tiltTransform,
          boxShadow: isHovered 
            ? `0 20px 40px ${glowColor}30, 0 0 20px ${glowColor}20`
            : '0 4px 16px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {children}
        
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${glowColor}10 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  };

  // Premium Toggle Component
  const PremiumToggle = ({ 
    checked, 
    onChange, 
    label,
    color = '#00f9ff' 
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    color?: string;
  }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
      setIsAnimating(true);
      onChange(!checked);
      setTimeout(() => setIsAnimating(false), 300);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {label && (
          <span style={{ fontSize: '1rem', fontWeight: 500 }}>{label}</span>
        )}
        
        <div
          onClick={handleToggle}
          style={{
            width: '60px',
            height: '32px',
            borderRadius: '16px',
            background: checked 
              ? `linear-gradient(45deg, ${color}, ${color}80)`
              : 'rgba(255,255,255,0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            boxShadow: checked 
              ? `0 4px 16px ${color}40`
              : '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#ffffff',
              position: 'absolute',
              top: '2px',
              left: checked ? '30px' : '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          />
          
          {/* Ripple effect on toggle */}
          {isAnimating && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: checked ? '44px' : '16px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: `${color}40`,
                transform: 'translate(-50%, -50%)',
                animation: 'ripple-expand 0.6s ease-out'
              }}
            />
          )}
        </div>
      </div>
    );
  };

  // Premium Input Component
  const PremiumInput = ({ 
    placeholder, 
    value, 
    onChange, 
    type = 'text',
    icon 
  }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    icon?: string;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      setHasValue(value.length > 0);
    }, [value]);

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              opacity: 0.7,
              zIndex: 1
            }}
          >
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: icon ? '1rem 1rem 1rem 3rem' : '1rem',
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${isFocused ? '#00f9ff' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: isFocused 
              ? '0 8px 32px rgba(0,249,255,0.2)'
              : '0 2px 8px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Floating Label */}
        <label
          style={{
            position: 'absolute',
            left: icon ? '3rem' : '1rem',
            top: isFocused || hasValue ? '0.2rem' : '50%',
            transform: isFocused || hasValue ? 'translateY(0)' : 'translateY(-50%)',
            fontSize: isFocused || hasValue ? '0.8rem' : '1rem',
            color: isFocused ? '#00f9ff' : 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            background: isFocused || hasValue ? 'rgba(0,0,0,0.8)' : 'transparent',
            padding: isFocused || hasValue ? '0 0.5rem' : '0',
            borderRadius: '4px'
          }}
        >
          {placeholder}
        </label>
      </div>
    );
  };

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          ✨ Premium Micro-Interactions
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          World-class interactive elements with sophisticated animations
        </p>
      </div>

      {/* Interactive Showcase */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '4rem',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px'
        }}
      >
        {/* Magnetic Cursor Effect */}
        {isHovering && (
          <div
            style={{
              position: 'absolute',
              left: mousePosition.x - 10,
              top: mousePosition.y - 10,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,249,255,0.6) 0%, transparent 70%)',
              pointerEvents: 'none',
              transition: 'all 0.1s ease',
              zIndex: 1000
            }}
          />
        )}

        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            style={{
              position: 'absolute',
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,249,255,0.4) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'ripple-expand 1s ease-out',
              zIndex: 999
            }}
          />
        ))}

        {/* Component Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Buttons Showcase */}
          <PremiumCard glowColor="#00f9ff">
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              marginBottom: '2rem',
              color: '#00f9ff'
            }}>
              🎯 Premium Buttons
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <PremiumButton 
                variant="primary" 
                onClick={() => createRipple(150, 100)}
              >
                Primary Action
              </PremiumButton>
              
              <PremiumButton 
                variant="secondary" 
                size="large"
                onClick={() => createRipple(150, 150)}
              >
                Secondary Large
              </PremiumButton>
              
              <PremiumButton 
                variant="ghost" 
                size="small"
                onClick={() => createRipple(150, 200)}
              >
                Ghost Small
              </PremiumButton>
              
              <PremiumButton disabled>
                Disabled State
              </PremiumButton>
            </div>
          </PremiumCard>

          {/* Inputs Showcase */}
          <PremiumCard glowColor="#39ff14">
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              marginBottom: '2rem',
              color: '#39ff14'
            }}>
              📝 Premium Inputs
            </h3>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              <PremiumInput
                placeholder="Enter your name"
                value=""
                onChange={() => {}}
                icon="👤"
              />
              
              <PremiumInput
                placeholder="Email address"
                value="user@example.com"
                onChange={() => {}}
                type="email"
                icon="📧"
              />
              
              <PremiumInput
                placeholder="Search investments"
                value=""
                onChange={() => {}}
                icon="🔍"
              />
            </div>
          </PremiumCard>

          {/* Toggles Showcase */}
          <PremiumCard glowColor="#8000ff">
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              marginBottom: '2rem',
              color: '#8000ff'
            }}>
              🎛️ Premium Toggles
            </h3>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
              <PremiumToggle
                checked={true}
                onChange={() => {}}
                label="Dark Mode"
                color="#00f9ff"
              />
              
              <PremiumToggle
                checked={false}
                onChange={() => {}}
                label="Notifications"
                color="#39ff14"
              />
              
              <PremiumToggle
                checked={true}
                onChange={() => {}}
                label="Auto-invest"
                color="#8000ff"
              />
              
              <PremiumToggle
                checked={false}
                onChange={() => {}}
                label="Email Alerts"
                color="#ff8000"
              />
            </div>
          </PremiumCard>
        </div>

        {/* Interactive Demo Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,249,255,0.1) 0%, rgba(57,255,20,0.1) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '2rem',
            background: 'linear-gradient(45deg, #00f9ff, #39ff14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎮 Interactive Demo
          </h3>
          
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.8, 
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Experience premium micro-interactions with magnetic effects, 
            ripple animations, and sophisticated hover states.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <PremiumButton 
              variant="primary" 
              size="large"
              onClick={() => {
                // Create multiple ripples for dramatic effect
                setTimeout(() => createRipple(200, 300), 0);
                setTimeout(() => createRipple(220, 320), 100);
                setTimeout(() => createRipple(240, 340), 200);
              }}
            >
              🚀 Launch Experience
            </PremiumButton>
            
            <PremiumButton 
              variant="secondary" 
              size="large"
              onClick={() => createRipple(400, 300)}
            >
              💎 Premium Features
            </PremiumButton>
          </div>
        </div>
      </div>

      {/* Global Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,249,255,0.3); }
          50% { box-shadow: 0 0 40px rgba(0,249,255,0.6); }
        }
      `}</style>
    </div>
  );
}
