'use client';

import React from 'react';
import { navigationMenu, megaMenuSections, NavigationItem, DropdownItem, MegaMenuSection } from '../config/navigationConfig';

interface CompleteMegaMenuProps {
  activeDropdown: number | null;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function CompleteMegaMenu({ 
  activeDropdown, 
  isHovering, 
  onMouseEnter, 
  onMouseLeave 
}: CompleteMegaMenuProps) {
  if (activeDropdown === null || !navigationMenu[activeDropdown]?.dropdown) {
    return null;
  }

  const currentMenu = navigationMenu[activeDropdown];
  const sections = megaMenuSections[currentMenu.name as keyof typeof megaMenuSections];

  if (!sections) return null;

  return (
    <div 
      className="fixed left-0 right-0 z-40 transition-all duration-300"
      style={{
        top: '79px', // Perfect alignment with tab bottom
        marginTop: '0px', // No additional margin needed
        background: 'white', // PayTM Money style: clean white background
        border: '1px solid #e5e7eb', // Light gray border like PayTM
        borderTop: 'none', // Remove top border for seamless connection like PayTM
        borderRadius: '0 0 8px 8px', // Subtle rounded corners like PayTM
        boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // PayTM style shadow
        overflow: 'hidden'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="grid grid-cols-4 gap-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              {/* Section Header - PayTM Style */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  <span className={`bg-gradient-to-r ${section.borderGradient} bg-clip-text text-transparent`}>
                    {section.title}
                  </span>
                </h3>
              </div>

              {/* Section Items */}
              <div className="space-y-3">
                {/* PayTM Money Style Menu Items */}
                {section.items && currentMenu.dropdown?.slice(section.items[0], section.items[1] + 1).map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    className="group flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {section.description}
                      </div>
                    </div>
                  </a>
                ))}

                {/* Custom items (like SIP Calculator, Learning Center) */}
                {section.customItems?.map((item: DropdownItem, i: number) => (
                  <a 
                    key={`custom-${i}`} 
                    href={item.href} 
                    className="group relative flex items-center px-6 py-4 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                    style={{
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, ${section.itemGradient} 50%, rgba(255,255,255,0.06) 100%)`,
                      border: `1px solid ${section.borderColor}`,
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `
                        0 8px 32px rgba(0,0,0,0.4),
                        0 0 40px ${section.borderColor.replace('0.15', '0.3')},
                        0 0 80px ${section.borderColor.replace('0.15', '0.1')},
                        inset 0 1px 0 rgba(255,255,255,0.15)
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${section.gradient.replace('/10', '/20')} rounded-xl flex items-center justify-center mr-4 group-hover:${section.gradient.replace('/20', '/30')} transition-all duration-300 shadow-lg`}>
                      <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                    </div>
                    <div className="relative flex-1">
                      <div className={`font-semibold text-white text-base group-hover:${section.hoverColor} transition-colors duration-300`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                        {section.description}
                      </div>
                    </div>
                    <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-6 h-6 bg-gradient-to-r ${section.buttonGradient} rounded-full flex items-center justify-center`}>
                        <span className="text-black text-xs font-bold">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
