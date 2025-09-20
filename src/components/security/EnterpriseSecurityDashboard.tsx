'use client';

import { useState, useEffect } from 'react';

interface SecurityMetric {
  name: string;
  status: 'secure' | 'warning' | 'critical';
  value: string;
  description: string;
  lastUpdated: number;
}

interface ThreatAlert {
  id: string;
  type: 'phishing' | 'malware' | 'suspicious_login' | 'data_breach' | 'ddos';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  source: string;
  status: 'active' | 'investigating' | 'resolved';
}

interface ComplianceStatus {
  regulation: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  score: number;
  lastAudit: number;
  nextAudit: number;
}

export default function EnterpriseSecurityDashboard() {
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [threatAlerts, setThreatAlerts] = useState<ThreatAlert[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus[]>([]);
  const [securityScore, setSecurityScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const generateSecurityData = () => {
      // Generate security metrics
      const metrics: SecurityMetric[] = [
        {
          name: 'SSL/TLS Encryption',
          status: 'secure',
          value: 'TLS 1.3 Active',
          description: 'End-to-end encryption with 256-bit AES',
          lastUpdated: Date.now() - 300000
        },
        {
          name: 'Multi-Factor Authentication',
          status: 'secure',
          value: '99.8% Coverage',
          description: 'TOTP + Biometric verification enabled',
          lastUpdated: Date.now() - 600000
        },
        {
          name: 'API Security',
          status: 'secure',
          value: 'Rate Limited',
          description: 'OAuth 2.0 + JWT with refresh tokens',
          lastUpdated: Date.now() - 900000
        },
        {
          name: 'Data Encryption',
          status: 'secure',
          value: 'AES-256-GCM',
          description: 'Database and file encryption at rest',
          lastUpdated: Date.now() - 1200000
        },
        {
          name: 'Session Management',
          status: 'warning',
          value: '2 Long Sessions',
          description: 'Some sessions exceed recommended duration',
          lastUpdated: Date.now() - 180000
        },
        {
          name: 'Vulnerability Scan',
          status: 'secure',
          value: '0 Critical Issues',
          description: 'Last scan completed successfully',
          lastUpdated: Date.now() - 3600000
        }
      ];

      // Generate threat alerts
      const alerts: ThreatAlert[] = [
        {
          id: 'alert-1',
          type: 'suspicious_login',
          severity: 'medium',
          message: 'Multiple failed login attempts from IP 192.168.1.100',
          timestamp: Date.now() - 1800000,
          source: 'Authentication System',
          status: 'investigating'
        },
        {
          id: 'alert-2',
          type: 'phishing',
          severity: 'high',
          message: 'Phishing attempt detected in user email communications',
          timestamp: Date.now() - 3600000,
          source: 'Email Security Gateway',
          status: 'resolved'
        },
        {
          id: 'alert-3',
          type: 'ddos',
          severity: 'low',
          message: 'Minor DDoS attempt blocked by WAF',
          timestamp: Date.now() - 7200000,
          source: 'Web Application Firewall',
          status: 'resolved'
        }
      ];

      // Generate compliance status
      const compliance: ComplianceStatus[] = [
        {
          regulation: 'SEBI Guidelines',
          status: 'compliant',
          score: 98,
          lastAudit: Date.now() - 2592000000, // 30 days ago
          nextAudit: Date.now() + 7776000000  // 90 days from now
        },
        {
          regulation: 'RBI Cybersecurity Framework',
          status: 'compliant',
          score: 95,
          lastAudit: Date.now() - 1296000000, // 15 days ago
          nextAudit: Date.now() + 10368000000 // 120 days from now
        },
        {
          regulation: 'ISO 27001',
          status: 'compliant',
          score: 97,
          lastAudit: Date.now() - 5184000000, // 60 days ago
          nextAudit: Date.now() + 26784000000 // 310 days from now
        },
        {
          regulation: 'PCI DSS',
          status: 'partial',
          score: 87,
          lastAudit: Date.now() - 1728000000, // 20 days ago
          nextAudit: Date.now() + 7776000000  // 90 days from now
        },
        {
          regulation: 'GDPR Compliance',
          status: 'compliant',
          score: 94,
          lastAudit: Date.now() - 3888000000, // 45 days ago
          nextAudit: Date.now() + 15552000000 // 180 days from now
        }
      ];

      // Calculate overall security score
      const avgScore = compliance.reduce((sum, c) => sum + c.score, 0) / compliance.length;
      const secureMetrics = metrics.filter(m => m.status === 'secure').length;
      const totalMetrics = metrics.length;
      const metricsScore = (secureMetrics / totalMetrics) * 100;
      
      const overallScore = Math.round((avgScore + metricsScore) / 2);

      setSecurityMetrics(metrics);
      setThreatAlerts(alerts);
      setComplianceStatus(compliance);
      setSecurityScore(overallScore);
    };

    generateSecurityData();
    const interval = setInterval(generateSecurityData, 30000);
    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '3rem',
        textAlign: 'center',
        margin: '4rem 0',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ opacity: 0.6 }}>Loading Enterprise Security Dashboard...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'compliant':
        return '#39ff14';
      case 'warning':
      case 'partial':
        return '#ff8000';
      case 'critical':
      case 'non_compliant':
        return '#ff4757';
      default:
        return '#ffffff';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return '#39ff14';
      case 'medium':
        return '#ff8000';
      case 'high':
        return '#ff4757';
      case 'critical':
        return '#ff0000';
      default:
        return '#ffffff';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return '#39ff14';
    if (score >= 85) return '#ff8000';
    return '#ff4757';
  };

  return (
    <div style={{ margin: '4rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ff4757, #ff8000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🛡️ Enterprise Security Dashboard
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Military-grade security monitoring and compliance management
          </p>
        </div>
        
        {/* Security Score */}
        <div style={{
          background: `linear-gradient(135deg, ${getScoreColor(securityScore)}20 0%, rgba(0,0,0,0.3) 100%)`,
          border: `2px solid ${getScoreColor(securityScore)}`,
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          minWidth: '200px'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
            Overall Security Score
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: getScoreColor(securityScore),
            marginBottom: '0.5rem'
          }}>
            {securityScore}
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: getScoreColor(securityScore),
            fontWeight: 600
          }}>
            {securityScore >= 95 ? 'EXCELLENT' : securityScore >= 85 ? 'GOOD' : 'NEEDS ATTENTION'}
          </div>
        </div>
      </div>

      {/* Security Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {securityMetrics.map((metric, index) => (
          <div
            key={index}
            style={{
              background: `linear-gradient(135deg, ${getStatusColor(metric.status)}10 0%, rgba(0,0,0,0.3) 100%)`,
              border: `1px solid ${getStatusColor(metric.status)}40`,
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 15px 40px ${getStatusColor(metric.status)}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {metric.name}
              </h3>
              <div style={{
                background: getStatusColor(metric.status),
                color: '#000000',
                padding: '0.3rem 0.8rem',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {metric.status}
              </div>
            </div>
            
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: getStatusColor(metric.status),
              marginBottom: '1rem'
            }}>
              {metric.value}
            </div>
            
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.8,
              lineHeight: 1.5,
              marginBottom: '1rem'
            }}>
              {metric.description}
            </p>
            
            <div style={{
              fontSize: '0.8rem',
              opacity: 0.6
            }}>
              Last updated: {new Date(metric.lastUpdated).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Threat Alerts and Compliance */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Threat Alerts */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#ff4757'
          }}>
            🚨 Security Alerts
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {threatAlerts.map(alert => (
              <div
                key={alert.id}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      background: getSeverityColor(alert.severity),
                      color: '#000000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {alert.severity}
                    </div>
                    <div style={{
                      background: alert.status === 'resolved' ? '#39ff14' : 
                                 alert.status === 'investigating' ? '#ff8000' : '#ff4757',
                      color: '#000000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {alert.status}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  textTransform: 'capitalize'
                }}>
                  {alert.type.replace('_', ' ')} Alert
                </h4>
                
                <p style={{
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  lineHeight: 1.5,
                  marginBottom: '0.5rem'
                }}>
                  {alert.message}
                </p>
                
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.6
                }}>
                  Source: {alert.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(20px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#39ff14'
          }}>
            📋 Compliance Status
          </h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {complianceStatus.map((compliance, index) => (
              <div
                key={index}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  border: `1px solid ${getStatusColor(compliance.status)}40`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}>
                    {compliance.regulation}
                  </h4>
                  <div style={{
                    background: getStatusColor(compliance.status),
                    color: '#000000',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {compliance.status}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Score: </span>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: getScoreColor(compliance.score)
                    }}>
                      {compliance.score}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    width: '120px',
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${compliance.score}%`,
                      height: '100%',
                      background: getScoreColor(compliance.score),
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.8rem',
                  opacity: 0.7
                }}>
                  <div>
                    Last Audit: {new Date(compliance.lastAudit).toLocaleDateString()}
                  </div>
                  <div>
                    Next Audit: {new Date(compliance.nextAudit).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Actions */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,71,87,0.1) 0%, rgba(255,128,0,0.1) 100%)',
        border: '1px solid rgba(255,71,87,0.3)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: '#ff4757'
        }}>
          🔒 Security Actions
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { label: '🔍 Run Security Scan', color: '#00f9ff' },
            { label: '📊 Generate Report', color: '#39ff14' },
            { label: '⚙️ Update Policies', color: '#8000ff' },
            { label: '🚨 Emergency Protocol', color: '#ff4757' }
          ].map((action, index) => (
            <button
              key={index}
              style={{
                background: `linear-gradient(45deg, ${action.color}, ${action.color}80)`,
                color: action.color === '#39ff14' || action.color === '#00f9ff' ? '#000000' : '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 16px ${action.color}30`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 8px 32px ${action.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${action.color}30`;
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
