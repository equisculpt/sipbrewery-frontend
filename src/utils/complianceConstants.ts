/**
 * AMFI & SEBI COMPLIANCE CONSTANTS
 * Mandatory disclaimers and legal text for mutual fund distributor
 */

export const COMPLIANCE_CONSTANTS = {
  // AMFI Registration Details
  AMFI: {
    REGISTRATION_NUMBER: "ARN-12345", // TODO: Replace with actual AMFI registration number
    REGISTRATION_NAME: "SIP Brewery Financial Services Pvt Ltd",
    REGISTRATION_DATE: "2024-01-01", // TODO: Replace with actual registration date
    VALIDITY: "2027-01-01", // TODO: Replace with actual validity date
    LOGO_URL: "/images/amfi-logo.png"
  },

  // Business Model Identification
  BUSINESS_MODEL: {
    TYPE: "MUTUAL_FUND_DISTRIBUTOR",
    DESCRIPTION: "Mutual Fund Distributor",
    NOT_ADVISOR: "We are NOT Investment Advisors",
    ROLE: "We facilitate mutual fund investments and provide educational content only"
  },

  // Mandatory SEBI Disclaimers
  SEBI_DISCLAIMERS: {
    MARKET_RISK: "Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
    PAST_PERFORMANCE: "Past performance does not guarantee future returns.",
    RISK_FACTORS: "Please read the risk factors carefully before investing.",
    SCHEME_DOCUMENTS: "Read all scheme related documents carefully before investing.",
    INVESTMENT_DECISION: "Investment decisions should be made independently after careful consideration of the scheme information document.",
    CONSULT_ADVISOR: "Please consult your financial advisor if required."
  },

  // Risk Warnings
  RISK_WARNINGS: {
    MARKET_VOLATILITY: "Mutual fund investments are subject to market volatility and there is no assurance that the scheme's objective will be achieved.",
    PRINCIPAL_RISK: "There is no guarantee that the principal amount invested will be preserved.",
    LIQUIDITY_RISK: "The scheme may face liquidity constraints in certain market conditions.",
    CREDIT_RISK: "Credit risk refers to the risk of default by the issuer of the securities.",
    INTEREST_RATE_RISK: "Interest rate risk refers to the possibility of a decline in the value of securities due to increase in interest rates.",
    INFLATION_RISK: "Inflation risk refers to the possibility that the returns from the investment may not keep pace with inflation."
  },

  // Educational Content Disclaimers
  EDUCATIONAL_DISCLAIMERS: {
    NOT_ADVICE: "This is educational content only and not investment advice.",
    INDEPENDENT_DECISION: "Please make independent investment decisions based on your financial goals and risk appetite.",
    THIRD_PARTY_RESEARCH: "Analysis is based on third-party research and publicly available information.",
    NO_GUARANTEE: "No guarantee is provided on the accuracy of analysis or future performance.",
    DISTRIBUTOR_ROLE: "We act as distributors and do not provide investment advisory services."
  },

  // AI/Technology Disclaimers
  AI_DISCLAIMERS: {
    EDUCATIONAL_TOOL: "AI analysis is an educational tool based on historical data and statistical models.",
    NOT_RECOMMENDATION: "AI insights are not investment recommendations or advice.",
    HISTORICAL_BASIS: "Analysis is based on historical data which may not predict future performance.",
    USER_DISCRETION: "Users should exercise their own discretion and judgment.",
    NO_LIABILITY: "We do not accept liability for investment decisions based on AI analysis."
  },

  // Community Features Disclaimers
  COMMUNITY_DISCLAIMERS: {
    USER_CONTENT: "Community discussions represent individual user opinions and not our recommendations.",
    NO_ADVICE: "Community content should not be considered as investment advice.",
    INDEPENDENT_RESEARCH: "Please conduct independent research before making investment decisions.",
    RISK_WARNING: "Discussions about investments carry inherent risks and past performance may not repeat.",
    MODERATION: "We moderate content but do not endorse individual investment opinions."
  },

  // Legal Footer Text
  LEGAL_FOOTER: {
    COPYRIGHT: "© 2024 SIP Brewery Financial Services Pvt Ltd. All rights reserved.",
    AMFI_REGISTRATION: "AMFI Registered Mutual Fund Distributor",
    SEBI_COMPLIANCE: "SEBI Compliant Platform",
    TERMS_CONDITIONS: "Subject to Terms & Conditions",
    PRIVACY_POLICY: "Privacy Policy applies",
    GRIEVANCE: "For grievances, contact: grievance@sipbrewery.com"
  },

  // Mandatory Display Requirements
  DISPLAY_REQUIREMENTS: {
    DISCLAIMER_PROMINENCE: "Disclaimers must be prominently displayed",
    FONT_SIZE_MINIMUM: "12px minimum font size for disclaimers",
    COLOR_CONTRAST: "High contrast colors for readability",
    POSITION: "Above the fold for critical disclaimers",
    FREQUENCY: "Repeat disclaimers on every relevant page"
  },

  // Compliance Colors (for consistent styling)
  COMPLIANCE_COLORS: {
    WARNING: "#FFA500", // Orange for warnings
    CRITICAL: "#FF0000", // Red for critical disclaimers
    INFO: "#0066CC", // Blue for information
    SUCCESS: "#008000", // Green for compliant status
    NEUTRAL: "#666666" // Gray for general text
  }
};

// Helper function to get formatted disclaimer text
export const getFormattedDisclaimer = (type: keyof typeof COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS): string => {
  return `⚠️ ${COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS[type]}`;
};

// Helper function to get AMFI registration display text
export const getAMFIRegistrationText = (): string => {
  return `AMFI Registered Mutual Fund Distributor | ARN: ${COMPLIANCE_CONSTANTS.AMFI.REGISTRATION_NUMBER}`;
};

// Helper function to get business model disclaimer
export const getBusinessModelDisclaimer = (): string => {
  return `${COMPLIANCE_CONSTANTS.BUSINESS_MODEL.DESCRIPTION} | ${COMPLIANCE_CONSTANTS.BUSINESS_MODEL.NOT_ADVISOR}`;
};

// Helper function to check if content needs disclaimer
export const needsDisclaimer = (contentType: string): boolean => {
  const requiresDisclaimer = [
    'fund-analysis',
    'portfolio-suggestion',
    'performance-data',
    'market-analysis',
    'ai-insights',
    'community-content',
    'educational-content'
  ];
  
  return requiresDisclaimer.includes(contentType);
};

// Helper function to get appropriate disclaimer for content type
export const getDisclaimerForContent = (contentType: string): string[] => {
  const disclaimers: string[] = [];
  
  switch (contentType) {
    case 'fund-analysis':
      disclaimers.push(COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.MARKET_RISK);
      disclaimers.push(COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.PAST_PERFORMANCE);
      disclaimers.push(COMPLIANCE_CONSTANTS.EDUCATIONAL_DISCLAIMERS.NOT_ADVICE);
      break;
      
    case 'ai-insights':
      disclaimers.push(COMPLIANCE_CONSTANTS.AI_DISCLAIMERS.EDUCATIONAL_TOOL);
      disclaimers.push(COMPLIANCE_CONSTANTS.AI_DISCLAIMERS.NOT_RECOMMENDATION);
      disclaimers.push(COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.MARKET_RISK);
      break;
      
    case 'community-content':
      disclaimers.push(COMPLIANCE_CONSTANTS.COMMUNITY_DISCLAIMERS.USER_CONTENT);
      disclaimers.push(COMPLIANCE_CONSTANTS.COMMUNITY_DISCLAIMERS.NO_ADVICE);
      disclaimers.push(COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.MARKET_RISK);
      break;
      
    default:
      disclaimers.push(COMPLIANCE_CONSTANTS.SEBI_DISCLAIMERS.MARKET_RISK);
      disclaimers.push(COMPLIANCE_CONSTANTS.EDUCATIONAL_DISCLAIMERS.NOT_ADVICE);
  }
  
  return disclaimers;
};
