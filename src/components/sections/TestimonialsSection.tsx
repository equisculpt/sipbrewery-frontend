'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote, TrendingUp, Award, Users, ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Software Engineer",
      location: "Bangalore",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      returns: "+22.5%",
      period: "2 Years",
      investment: "₹25,000/month",
      quote: "Smart SIP has completely transformed my investment journey. The AI automatically increased my SIP during the 2022 market crash, and I'm now seeing 22% better returns than my traditional SIP. The best part? I don't have to worry about market timing anymore.",
      highlight: "Achieved 22% better returns with zero effort",
      tags: ["Tech Professional", "Long-term Investor"]
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Marketing Manager",
      location: "Mumbai",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      returns: "+18.7%",
      period: "3 Years",
      investment: "₹15,000/month",
      quote: "As a working mother, I barely have time to track markets. Smart SIP's AI does all the heavy lifting. It detected the perfect entry points during market volatility and optimized my investments automatically. My portfolio has grown by 18.7% annually!",
      highlight: "Hands-off investing with superior results",
      tags: ["Working Mother", "Busy Professional"]
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Business Owner",
      location: "Ahmedabad",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      returns: "+25.3%",
      period: "1.5 Years",
      investment: "₹50,000/month",
      quote: "I was skeptical about AI-driven investing, but the results speak for themselves. Smart SIP's market analysis is incredibly accurate. It helped me navigate the recent market corrections beautifully, resulting in 25% annual returns.",
      highlight: "From skeptic to believer with 25% returns",
      tags: ["Business Owner", "High Net Worth"]
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Doctor",
      location: "Hyderabad",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      returns: "+19.8%",
      period: "2.5 Years",
      investment: "₹30,000/month",
      quote: "My medical practice keeps me extremely busy. Smart SIP has been a game-changer - it's like having a personal investment advisor who never sleeps. The AI's market predictions have been spot-on, and my returns have consistently beaten traditional SIPs.",
      highlight: "Personal AI advisor delivering consistent results",
      tags: ["Healthcare Professional", "Time-constrained"]
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Government Officer",
      location: "Delhi",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      returns: "+16.4%",
      period: "4 Years",
      investment: "₹20,000/month",
      quote: "Being in government service, I prefer stable and reliable investments. Smart SIP has given me both stability and growth. The AI's risk management is excellent - it protected my portfolio during market downturns while maximizing gains during uptrends.",
      highlight: "Perfect balance of stability and growth",
      tags: ["Government Employee", "Conservative Investor"]
    }
  ];

  const stats = [
    { label: "Average Returns", value: "20.5%", icon: TrendingUp },
    { label: "Happy Investors", value: "1,00,000+", icon: Users },
    { label: "Success Rate", value: "94.7%", icon: Award },
    { label: "Total Reviews", value: "25,000+", icon: Star }
  ];

  // Auto-play functionality
  useEffect(() => {
    setIsClient(true);
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-neon rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="display-title text-dark-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Success <span className="text-gradient">Stories</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real investors, real results. Discover how Smart SIP has helped thousands achieve their financial goals with AI-powered investing.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-dark-900" />
              </motion.div>
              <div className="text-3xl font-bold text-accent-neon mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-soft border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent-neon hover:border-accent-neon/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-soft border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent-neon hover:border-accent-neon/30 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Testimonial Card */}
            <motion.div
              key={currentSlide}
              className="bg-white rounded-3xl shadow-premium border border-gray-200 p-8 md:p-12 mx-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                
                {/* User Info */}
                <div className="text-center lg:text-left">
                  {/* Avatar */}
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent-neon to-accent-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {/* Success Badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* User Details */}
                  <h3 className="text-2xl font-bold text-dark-900 mb-2">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {currentTestimonial.location}
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {currentTestimonial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent-neon/10 text-accent-neon text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-accent-neon/20 mb-4" />
                    
                    {/* Quote Text */}
                    <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Highlight */}
                    <div className="bg-gradient-to-r from-accent-green/10 to-accent-neon/10 rounded-2xl p-4 mb-6 border-l-4 border-accent-green">
                      <p className="text-accent-green font-semibold">
                        💡 {currentTestimonial.highlight}
                      </p>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-accent-green mb-1">
                          {currentTestimonial.returns}
                        </div>
                        <div className="text-xs text-gray-600">Annual Returns</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-accent-neon mb-1">
                          {currentTestimonial.period}
                        </div>
                        <div className="text-xs text-gray-600">Investment Period</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-500 mb-1">
                          {currentTestimonial.investment}
                        </div>
                        <div className="text-xs text-gray-600">Monthly SIP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-accent-neon w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-dark-900 mb-8">
              Trusted by Professionals Across India
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60">
              {['Software Engineers', 'Doctors', 'Business Owners', 'Government Officers', 'Teachers'].map((profession, index) => (
                <motion.div
                  key={profession}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-lg font-semibold text-gray-700">
                    {profession}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join 1,00,000+ Success Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
