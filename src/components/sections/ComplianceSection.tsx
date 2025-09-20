'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Lock, FileCheck, Eye, Users, Building, CheckCircle } from 'lucide-react';

const ComplianceSection = () => {
  const certifications = [
    {
      id: 1,
      title: "SEBI Registered",
      subtitle: "Investment Advisor",
      number: "INA000012345",
      icon: Shield,
      description: "Fully registered with Securities and Exchange Board of India as an Investment Advisor",
      color: "from-blue-500 to-indigo-500",
      verified: true
    },
    {
      id: 2,
      title: "AMFI Registered",
      subtitle: "Mutual Fund Distributor",
      number: "ARN-123456",
      icon: Award,
      description: "Authorized by Association of Mutual Funds in India for mutual fund distribution",
      color: "from-green-500 to-emerald-500",
      verified: true
    },
    {
      id: 3,
      title: "ISO 27001:2013",
      subtitle: "Information Security",
      number: "ISO/IEC 27001",
      icon: Lock,
      description: "International standard for information security management systems",
      color: "from-purple-500 to-pink-500",
      verified: true
    },
    {
      id: 4,
      title: "RBI Guidelines",
      subtitle: "Payment Systems",
      number: "PSO-2021",
      icon: Building,
      description: "Compliant with Reserve Bank of India payment system guidelines",
      color: "from-orange-500 to-red-500",
      verified: true
    }
  ];

  const complianceFeatures = [
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "256-bit SSL encryption, multi-factor authentication, and secure data storage",
      points: ["End-to-end encryption", "Secure API endpoints", "Regular security audits", "PCI DSS compliance"]
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Full disclosure of fees, risks, and investment processes with regular reporting",
      points: ["Real-time portfolio tracking", "Detailed transaction history", "Risk disclosure", "Performance reporting"]
    },
    {
      icon: Users,
      title: "Investor Protection",
      description: "Comprehensive investor protection measures and grievance redressal mechanisms",
      points: ["Investor grievance portal", "Ombudsman support", "Insurance coverage", "Dispute resolution"]
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance",
      description: "Strict adherence to all regulatory requirements and regular compliance monitoring",
      points: ["SEBI compliance monitoring", "Regular audits", "KYC/AML procedures", "Risk management"]
    }
  ];

  const trustMetrics = [
    { label: "Regulatory Compliance Score", value: "100%", color: "text-green-500" },
    { label: "Security Rating", value: "A+", color: "text-blue-500" },
    { label: "Transparency Index", value: "98.5%", color: "text-purple-500" },
    { label: "Customer Satisfaction", value: "4.9/5", color: "text-orange-500" }
  ];

  return (
    <section id="compliance" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-grid" />
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
            className="display-title text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Trust & <span className="text-gradient">Compliance</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your trust is our foundation. We maintain the highest standards of regulatory compliance, security, and transparency in everything we do.
          </motion.p>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-dark-800/50 rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 249, 255, 0.3)' }}
            >
              <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Regulatory Certifications & Compliance
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are proud to be fully compliant with all regulatory requirements and hold certifications from leading financial authorities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="group relative bg-dark-800/30 rounded-3xl p-6 border border-white/10 hover:border-accent-neon/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${cert.color} rounded-2xl flex items-center justify-center mb-4 relative`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <cert.icon className="w-8 h-8 text-white" />
                    
                    {/* Verified Badge */}
                    {cert.verified && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-2">
                    {cert.title}
                  </h4>
                  
                  <p className="text-accent-neon text-sm font-semibold mb-2">
                    {cert.subtitle}
                  </p>
                  
                  <p className="text-gray-400 text-xs mb-4 font-mono">
                    {cert.number}
                  </p>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-20 blur-xl pointer-events-none`}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              How We Protect Your Interests
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive protection measures ensure your investments are safe, secure, and compliant with all regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-dark-800/30 rounded-3xl p-8 border border-white/10"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: 'rgba(0, 249, 255, 0.3)', scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-neon rounded-2xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6 text-dark-900" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.points.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          className="flex items-center space-x-2 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: pointIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-accent-green rounded-full flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Disclosure */}
        <motion.div
          className="text-center bg-dark-800/30 rounded-3xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Important Regulatory Disclosure
          </h3>
          
          <div className="max-w-4xl mx-auto text-sm text-gray-400 leading-relaxed space-y-4">
            <p>
              <strong className="text-white">SEBI Registration:</strong> SIPBrewery is registered with the Securities and Exchange Board of India (SEBI) as an Investment Advisor under registration number INA000012345. This registration does not guarantee performance or returns.
            </p>
            
            <p>
              <strong className="text-white">Risk Disclosure:</strong> Mutual fund investments are subject to market risks. Past performance is not indicative of future results. Please read all scheme-related documents carefully before investing.
            </p>
            
            <p>
              <strong className="text-white">Investor Protection:</strong> All investor grievances are handled through our dedicated grievance redressal mechanism. For unresolved complaints, investors can approach the SEBI Investor Grievance Portal or the Ombudsman.
            </p>
            
            <p>
              <strong className="text-white">Data Protection:</strong> We are committed to protecting your personal and financial data in accordance with applicable data protection laws and regulations.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>SEBI Reg: INA000012345</span>
            <span>|</span>
            <span>AMFI Reg: ARN-123456</span>
            <span>|</span>
            <span>ISO 27001:2013 Certified</span>
            <span>|</span>
            <span>RBI Compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
