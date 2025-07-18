'use client';
import React from 'react';
import Button from '../ui/Button';
import SearchView from '../ui/SearchView';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-global-9 border-b border-[#e5e8eb] p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mx-2">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img 
            src="/images/img_frame.svg" 
            alt="Board App Logo" 
            className="w-6 h-6"
          />
          <div className="text-xs font-semibold font-poppins leading-[18px] text-left">
            <span className="text-global-3">Board </span>
            <span className="text-global-4">App</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Create Button */}
          <Button
            variant="primary"
            size="sm"
            className="bg-[#3772ff] text-white rounded-md px-3 py-3 sm:px-9 sm:py-3 flex items-center gap-3 text-xs font-semibold font-poppins leading-[18px] w-full sm:w-auto justify-center"
          >
            Create new board
            <img 
              src="/images/img_icons_plus_2.svg" 
              alt="Plus icon" 
              className="w-6 h-6"
            />
          </Button>

          {/* Search and Profile Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Search */}
            <div className="w-full sm:w-auto">
              <SearchView
                placeholder="Search tasks ..."
                className="bg-[#f4f5f6] rounded-lg px-3 py-3 pl-10 text-xs font-normal font-poppins leading-[18px] text-[#b0b4c3] w-full sm:w-64"
                leftIcon="/images/img_icons_search.svg"
              />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/images/img_icons_settings.svg" 
                alt="Settings" 
                className="w-6 h-6 cursor-pointer"
              />
              
              <div className="relative">
                <img 
                  src="/images/img_group.svg" 
                  alt="Notifications" 
                  className="w-6 h-6 cursor-pointer"
                />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#ff5b00] rounded-full"></div>
              </div>
              
              <div className="bg-[#353945] border border-white rounded-[14px] p-2">
                <img 
                  src="/images/img_user_profile.svg" 
                  alt="User Profile" 
                  className="w-[30px] h-[30px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;