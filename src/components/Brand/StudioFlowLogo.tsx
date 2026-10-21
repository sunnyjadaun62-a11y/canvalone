import React from 'react';

interface StudioFlowLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const StudioFlowLogo: React.FC<StudioFlowLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-slate-900',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Sleek Modern Geometric Icon of Overlapping Translucent Creative Layers */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="sf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="sf-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Bottom Creative Layer */}
          <rect
            x="4"
            y="9"
            width="22"
            height="22"
            rx="6"
            transform="rotate(-12 15 20)"
            fill="url(#sf-grad-1)"
            opacity="0.9"
          />

          {/* Top Creative Layer */}
          <rect
            x="14"
            y="9"
            width="22"
            height="22"
            rx="6"
            transform="rotate(12 25 20)"
            fill="url(#sf-grad-2)"
            opacity="0.95"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Intersecting Dynamic Core Flow Node */}
          <circle
            cx="20"
            cy="20"
            r="4.5"
            fill="#FFFFFF"
            className="filter drop-shadow-sm"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSizes[size]} ${textColor} flex items-center`}>
            <span>Studio</span>
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent ml-0.5">
              Flow
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
