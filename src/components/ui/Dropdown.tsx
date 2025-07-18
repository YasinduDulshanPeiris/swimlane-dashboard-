'use client';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  leftIcon?: string;
  rightIcon?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  maxHeight?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value: controlledValue,
  onChange,
  placeholder = 'Select option',
  className = '',
  leftIcon,
  rightIcon,
  disabled = false,
  size = 'md',
  maxHeight = 'max-h-60'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find(option => option.value === value);

  const sizes = {
    sm: 'px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm',
    md: 'px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base',
    lg: 'px-4 py-2.5 text-base sm:px-5 sm:py-3 sm:text-lg'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(optionValue);
    }
    
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter': case' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full
          flex items-center justify-between
          ${leftIcon ? 'pl-10' : 'pl-3'}
          ${rightIcon ? 'pr-10' : 'pr-3'}
          ${sizes[size]}
          border border-border-secondary
          rounded-md sm:rounded-lg
          bg-bg-card
          text-left
          transition-all
          duration-200
          ease-in-out
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' :'hover:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer'
          }
          ${isOpen ? 'ring-2 ring-primary border-primary' : ''}
          font-poppins
        `.trim().replace(/\s+/g, ' ')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none">
            <img 
              src={leftIcon} 
              alt="" 
              className="w-4 h-4 opacity-60"
            />
          </div>
        )}

        {/* Selected Value or Placeholder */}
        <span className={`block truncate ${
          selectedOption ? 'text-text-primary' : 'text-text-muted'
        }`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Right Icon */}
        {rightIcon ? (
          <div className="absolute right-3 flex items-center pointer-events-none">
            <img 
              src={rightIcon} 
              alt="" 
              className={`w-4 h-4 opacity-60 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        ) : (
          <svg
            className={`w-4 h-4 opacity-60 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute z-50 w-full mt-1
          bg-bg-card
          border border-border-secondary
          rounded-md sm:rounded-lg
          shadow-lg
          ${maxHeight} overflow-auto
        `}>
          <ul role="listbox" className="py-1">
            {options.length === 0 ? (
              <li className="px-3 py-2 text-text-muted text-sm">
                No options available
              </li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  className={`
                    px-3 py-2 cursor-pointer transition-colors duration-150
                    ${option.disabled 
                      ? 'opacity-50 cursor-not-allowed' :'hover:bg-primary hover:text-primary-fg'
                    }
                    ${value === option.value 
                      ? 'bg-primary text-primary-fg' :'text-text-primary'
                    }
                    text-sm font-poppins
                  `.trim().replace(/\s+/g, ' ')}
                  onClick={() => !option.disabled && handleOptionSelect(option.value)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;