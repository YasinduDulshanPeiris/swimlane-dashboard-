'use client';
import React, { useState } from 'react';

interface SearchViewProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  leftIcon?: string;
  rightIcon?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SearchView: React.FC<SearchViewProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  className = '',
  leftIcon,
  rightIcon,
  disabled = false,
  size = 'md'
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  const sizes = {
    sm: 'px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm',
    md: 'px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base',
    lg: 'px-4 py-2.5 text-base sm:px-5 sm:py-3 sm:text-lg'
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 z-10 flex items-center pointer-events-none">
          <img 
            src={leftIcon} 
            alt="Search" 
            className="w-4 h-4 opacity-60"
          />
        </div>
      )}

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          ${leftIcon ? 'pl-10' : 'pl-3'}
          ${rightIcon ? 'pr-10' : 'pr-3'}
          ${sizes[size]}
          border border-border-secondary
          rounded-md sm:rounded-lg
          bg-bg-card
          text-text-primary
          placeholder-text-muted
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:border-primary
          transition-all
          duration-200
          ease-in-out
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-border-dark'}
          font-poppins
        `.trim().replace(/\s+/g, ' ')}
        aria-label={placeholder}
      />

      {/* Right Icon */}
      {rightIcon && (
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={disabled}
          className="absolute right-3 z-10 flex items-center hover:opacity-80 transition-opacity"
          aria-label="Search"
        >
          <img 
            src={rightIcon} 
            alt="Search" 
            className="w-4 h-4 opacity-60"
          />
        </button>
      )}
    </div>
  );
};

export default SearchView;