'use client';

import React from 'react';
import { COMPLIANCE_CONSTANTS, getDisclaimerForContent } from '../../utils/complianceConstants';

interface ComplianceDisclaimerProps {
  contentType?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'inline';
  showAMFI?: boolean;
  showBusinessModel?: boolean;
  customDisclaimer?: string;
  className?: string;
}

const ComplianceDisclaimer: React.FC<ComplianceDisclaimerProps> = ({
  contentType = 'general',
  size = 'medium',
  position = 'bottom',
  showAMFI = false,
  showBusinessModel = false,
  customDisclaimer,
  className = ''
}) => {
  const disclaimers = customDisclaimer 
    ? [customDisclaimer] 
    : getDisclaimerForContent(contentType);

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-2',
    large: 'text-base px-4 py-3'
  };

  const positionClasses = {
    top: 'mb-4',
    bottom: 'mt-4',
    inline: 'my-2'
  };

  return (
    <div className={`
      bg-yellow-500/10 border border-yellow-500/30 rounded-lg 
      ${sizeClasses[size]} ${positionClasses[position]} ${className}
    `}>
      {/* AMFI Registration */}
      {showAMFI && (
        <div className="flex items-center justify-center mb-2 pb-2 border-b border-yellow-500/20">
          <div className="text-center">
            <p className="text-yellow-300 font-semibold text-xs">
              AMFI Registered Mutual Fund Distributor
            </p>
            <p className="text-yellow-400 text-xs">
              ARN: {COMPLIANCE_CONSTANTS.AMFI.REGISTRATION_NUMBER} | 
              Valid till: {COMPLIANCE_CONSTANTS.AMFI.VALIDITY}
            </p>
          </div>
        </div>
      )}

      {/* Business Model Clarification */}
      {showBusinessModel && (
        <div className="mb-2 pb-2 border-b border-yellow-500/20">
          <p className="text-yellow-300 font-semibold text-center text-xs">
            {COMPLIANCE_CONSTANTS.BUSINESS_MODEL.DESCRIPTION} | {COMPLIANCE_CONSTANTS.BUSINESS_MODEL.NOT_ADVISOR}
          </p>
        </div>
      )}

      {/* Disclaimers */}
      <div className="space-y-1">
        {disclaimers.map((disclaimer, index) => (
          <p key={index} className="text-yellow-200 text-xs leading-relaxed">
            ⚠️ {disclaimer}
          </p>
        ))}
      </div>

      {/* Additional Risk Warnings for Investment Content */}
      {(contentType === 'fund-analysis' || contentType === 'portfolio-suggestion') && (
        <div className="mt-2 pt-2 border-t border-yellow-500/20">
          <p className="text-red-300 text-xs font-semibold">
            🚨 {COMPLIANCE_CONSTANTS.RISK_WARNINGS.PRINCIPAL_RISK}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComplianceDisclaimer;
