import React from 'react';

interface BookOrnamentProps {
  className?: string;
  variant?: 'vertical' | 'horizontal' | 'small';
}

export const BookOrnament: React.FC<BookOrnamentProps> = ({ className = '', variant = 'horizontal' }) => {
  if (variant === 'vertical') {
    return (
      <div className={`flex justify-center my-8 select-none pointer-events-none opacity-80 ${className}`}>
        <img
          src="/images/ornaments/book-ornament.png"
          alt=""
          role="presentation"
          className="w-4 h-auto max-h-36 object-contain filter contrast-125"
        />
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className={`flex items-center justify-center space-x-3 my-6 text-rule select-none pointer-events-none ${className}`}>
        <span className="w-8 h-px bg-rule"></span>
        <span className="text-burgundy text-xs font-serif italic">§</span>
        <span className="w-8 h-px bg-rule"></span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center space-x-4 my-12 text-rule select-none pointer-events-none ${className}`}>
      <span className="w-16 sm:w-28 h-px bg-rule"></span>
      <div className="flex items-center space-x-2 text-burgundy opacity-75">
        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40"></span>
        <span className="text-sm font-serif italic">❦</span>
        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/40"></span>
      </div>
      <span className="w-16 sm:w-28 h-px bg-rule"></span>
    </div>
  );
};
