'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumTestimonials: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Senior Software Engineer",
      company: "Google India",
      avatar: "👨‍💻",
      returns: "+28.5%",
      quote: "SIPBrewery's AI revolutionized my investment strategy. 28% annual returns with zero effort!",
      gradient: "from-cyan-400 to-blue-600",
      glowColor: "rgba(0, 249, 255, 0.4)"
    },
    {
      name: "Dr. Priya Sharma", 
      role: "Cardiologist",
      company: "Apollo Hospitals",
      avatar: "👩‍⚕️",
      returns: "+24.7%",
      quote: "As a busy surgeon, SIPBrewery's quantum algorithms handle everything automatically.",
      gradient: "from-purple-400 to-pink-600",
      glowColor: "rgba(139, 92, 246, 0.4)"
    },
    {
      name: "Amit Patel",
      role: "Founder & CEO", 
      company: "TechVenture Pvt Ltd",
      avatar: "👨‍💼",
      returns: "+31.2%",
      quote: "SIPBrewery's AI is in a league of its own. 31% returns with perfect market timing!",
      gradient: "from-green-400 to-emerald-600",
      glowColor: "rgba(16, 185, 129, 0.4)"
    }
  ];

  return (
    <section className="relative min-h-screen py-32 overflow-hidden" style={{
      background: `
        radial-gradient(circle at 25% 25%, rgba(0, 249, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
      `
    }}>
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl" style={{
          animation: 'float 20s ease-in-out infinite',
          filter: 'blur(80px)'
        }}></div>
        
        {isClient && (
          <div 
            className="absolute w-96 h-96 pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-8xl font-black mb-8"
            style={{
              background: `linear-gradient(45deg, #00f9ff 0%, #8b5cf6 25%, #10b981 50%, #f59e0b 75%, #00f9ff 100%)`,
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 4s ease-in-out infinite',
              textShadow: '0 0 80px rgba(0, 249, 255, 0.8)'
            }}
          >
            Elite Success Stories
          </motion.h2>
        </motion.div>

        {/* Testimonial Showcase */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className={`absolute -inset-4 bg-gradient-to-r ${testimonials[currentTestimonial].gradient} rounded-3xl blur-3xl opacity-30`}
                style={{
                  boxShadow: `0 0 120px ${testimonials[currentTestimonial].glowColor}`
                }}
              ></div>
              
              <div className="relative bg-black/70 backdrop-blur-3xl rounded-3xl p-16 border border-white/30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  
                  {/* Profile */}
                  <div className="text-center lg:text-left">
                    <div className="relative inline-block mb-8">
                      <div className={`absolute -inset-2 bg-gradient-to-r ${testimonials[currentTestimonial].gradient} rounded-full blur-xl opacity-60`}></div>
                      <div className="relative bg-black/50 rounded-full p-8 text-6xl border border-white/30">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                    </div>
                    
                    <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${testimonials[currentTestimonial].gradient} bg-clip-text text-transparent`}>
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-xl text-white/90 font-medium mb-2">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-lg text-white/70">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                  
                  {/* Quote */}
                  <div className="lg:col-span-2">
                    <blockquote className="text-2xl text-white leading-relaxed mb-8">
                      {testimonials[currentTestimonial].quote}
                    </blockquote>
                    
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className={`text-4xl font-black bg-gradient-to-r ${testimonials[currentTestimonial].gradient} bg-clip-text text-transparent`}>
                        {testimonials[currentTestimonial].returns}
                      </div>
                      <div className="text-white/70 font-medium">Annual Returns</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-center space-x-4 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? `bg-gradient-to-r ${testimonials[currentTestimonial].gradient} w-12` 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumTestimonials;
