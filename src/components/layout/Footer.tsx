'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Building,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Smart SIP", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Performance", href: "#performance" },
        { name: "Pricing", href: "/pricing" },
        { name: "API Documentation", href: "/api-docs" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press Kit", href: "/press" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Investment Guide", href: "/guide" },
        { name: "Market Insights", href: "/insights" },
        { name: "Webinars", href: "/webinars" },
        { name: "Calculator", href: "/calculator" }
      ]
    },
    legal: {
      title: "Legal & Compliance",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Risk Disclosure", href: "/risk-disclosure" },
        { name: "Grievance Policy", href: "/grievance" },
        { name: "Regulatory Info", href: "/regulatory" }
      ]
    }
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/sipbrewery", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/sipbrewery", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/sipbrewery", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/sipbrewery", label: "YouTube" }
  ];

  const certifications = [
    { icon: Shield, text: "SEBI Registered", subtext: "INA000012345" },
    { icon: Award, text: "AMFI Registered", subtext: "ARN-123456" },
    { icon: Building, text: "ISO 27001:2013", subtext: "Certified" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+91 80 4567 8900", href: "tel:+918045678900" },
    { icon: Mail, text: "support@sipbrewery.com", href: "mailto:support@sipbrewery.com" },
    { icon: MapPin, text: "Bangalore, Karnataka, India", href: "#" }
  ];

  return (
    <footer className="bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5 bg-grid" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center">
                  <span className="text-dark-900 font-bold text-xl">S</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">SIPBrewery</h3>
                  <p className="text-xs text-gray-400">Smart Investing Platform</p>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                India's leading AI-powered mutual fund investment platform. We help you build wealth 
                through intelligent, automated SIP strategies that adapt to market conditions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-accent-neon transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <contact.icon className="w-4 h-4 text-accent-neon" />
                    <span className="text-sm">{contact.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-neon/20 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-accent-neon transition-colors text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        {link.href.startsWith('http') && (
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Updated with Market Insights
              </h3>
              <p className="text-gray-400 text-sm">
                Get weekly market analysis, investment tips, and AI insights delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-800 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-accent-neon focus:ring-2 focus:ring-accent-neon/20 outline-none transition-all"
              />
              <motion.button
                className="btn-primary px-6 py-3 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-dark-800/50 rounded-xl px-4 py-3 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
              >
                <cert.icon className="w-5 h-5 text-accent-neon" />
                <div>
                  <div className="text-white text-sm font-semibold">{cert.text}</div>
                  <div className="text-gray-400 text-xs">{cert.subtext}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© 2024 SIPBrewery. All rights reserved.</p>
              <p className="mt-1">
                Made with ❤️ in India for smart investors worldwide.
              </p>
            </div>

            {/* Regulatory Info */}
            <div className="text-gray-500 text-xs text-center md:text-right">
              <p>SEBI Reg: INA000012345 | AMFI Reg: ARN-123456</p>
              <p className="mt-1">
                Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
