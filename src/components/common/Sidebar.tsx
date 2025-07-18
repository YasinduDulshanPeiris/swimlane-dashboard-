'use client';
import React, { useState } from 'react';
import Dropdown from '../ui/Dropdown';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isBoardsExpanded, setBoardsExpanded] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      icon: '/images/img_icons_grid.svg',
      label: 'Dashboard',
      textColor: 'text-global-5'
    },
    {
      icon: '/images/img_icons_message.svg',
      label: 'Messages',
      textColor: 'text-global-5',
      badge: '3'
    },
    {
      icon: '/images/img_icons_calendar.svg',
      label: 'Calendar',
      textColor: 'text-global-5'
    },
    {
      icon: '/images/img_icons_user.svg',
      label: 'Team members',
      textColor: 'text-global-5'
    }
  ];

  const boardItems = [
    { label: 'Create routes', textColor: 'text-global-6', icon: '/images/img_icons_arrow_right.svg' },
    { label: 'Delepment React App', textColor: 'text-global-6', icon: '/images/img_icons_arrow_right.svg' },
    { label: 'Sport Xi Project', textColor: 'text-global-4', icon: '/images/img_icons_arrow_right_blue_a400.svg', active: true },
    { label: 'Wordpress theme', textColor: 'text-global-6', icon: '/images/img_icons_arrow_right.svg' }
  ];

  const bottomMenuItems = [
    {
      icon: '/images/img_icons_info_circle.svg',
      label: 'Support',
      textColor: 'text-global-5'
    },
    {
      icon: '/images/img_icons_sign_out.svg',
      label: 'Logout',
      textColor: 'text-global-5'
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block
        fixed lg:relative
        top-0 left-0
        w-64 lg:w-80
        h-full lg:h-auto
        bg-global-9 
        border-r border-[#e5e8eb] 
        pt-6 lg:pt-6 
        px-6 lg:px-6
        z-40
        overflow-y-auto
        ${className}
      `}>
        {/* Workspace Dropdown */}
        <div className="mb-6">
          <Dropdown
            placeholder="Root folder"
            options={[
              { value: 'root', label: 'Root folder' },
              { value: 'workspace1', label: 'Workspace 1' },
              { value: 'workspace2', label: 'Workspace 2' }
            ]}
            leftIcon="/images/img_user_profile.svg"
            rightIcon="/images/img_icons_arrow_down.svg"
            className="w-full border-2 border-[#f4f5f6] rounded-lg px-4 py-5 text-base font-medium font-poppins leading-6 text-global-3"
          />
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-4 mb-8">
          {/* Dashboard */}
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <img src="/images/img_icons_grid.svg" alt="Dashboard" className="w-6 h-6" />
            <span className="ml-5 text-base font-medium font-poppins leading-6 text-global-5">Dashboard</span>
          </div>

          {/* Boards Section */}
          <div className="space-y-4">
            {/* Boards Header */}
            <div 
              className="flex items-center justify-between p-3 border-2 border-[#f4f5f6] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setBoardsExpanded(!isBoardsExpanded)}
            >
              <div className="flex items-center">
                <img src="/images/img_icons_folder.svg" alt="Boards" className="w-6 h-6" />
                <span className="ml-5 text-base font-medium font-poppins leading-6 text-global-4">Boards</span>
              </div>
              <img 
                src={isBoardsExpanded ? "/images/img_icons_arrow_up.svg" : "/images/img_icons_arrow_down.svg"} 
                alt="Toggle" 
                className="w-6 h-6"
              />
            </div>

            {/* Board Items */}
            {isBoardsExpanded && (
              <div className="ml-4 space-y-4">
                {boardItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                      item.active ? 'bg-blue-50' : ''
                    }`}
                  >
                    <img src={item.icon} alt="" className="w-6 h-6" />
                    <span className={`ml-2.5 text-sm font-normal font-poppins leading-[21px] ${item.textColor} ${
                      item.active ? 'font-medium' : ''
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <span className={`ml-5 text-base font-medium font-poppins leading-6 ${item.textColor}`}>
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <div className="bg-[#ff5b00] text-white text-xs font-medium font-poppins leading-[18px] text-center rounded-[10px] px-2 py-1 min-w-[24px]">
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="mt-auto pt-8 space-y-4">
          {bottomMenuItems.map((item, index) => (
            <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <span className={`ml-5 text-base font-medium font-poppins leading-6 ${item.textColor}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;