import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light-text';
  size?: number;
}

export default function Logo({
  className = '',
  variant = 'full',
  size = 48,
}: LogoProps) {
  const logoSrc = `${import.meta.env.BASE_URL}images/srh-logo.png`;
  const isLight = variant === 'light-text';

  if (variant === 'compact' || variant === 'light-text') {
    return (
      <div className={`flex items-center gap-3 ${className}`} id={`srh-logo-${variant}`}>
        <div
          className="relative shrink-0 rounded-full overflow-hidden bg-[#071201] border-2 border-[#FABC09]/70 shadow-lg ring-2 ring-[#071201]/10"
          style={{ width: size, height: size }}
        >
          <img
            src={logoSrc}
            alt="SRH SWASTH SEVA logo"
            className="w-full h-full object-contain p-[1px]"
            loading="eager"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span
            className={`font-heading font-extrabold text-[14px] xl:text-[15px] leading-tight tracking-tight uppercase ${
              isLight ? 'text-white' : 'text-[#0B1633]'
            }`}
          >
            SRH SWASTH SEVA
          </span>
          <span
            className={`font-sans font-semibold text-[10px] xl:text-[11px] tracking-wider uppercase ${
              isLight ? 'text-[#FABC09]' : 'text-[#475569]'
            }`}
          >
            HAR DIN SWASTH
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size * 2.1, height: size * 2.1 }}
      id="srh-logo-seal"
    >
      <img
        src={logoSrc}
        alt="SRH SWASTH SEVA Har Din Swasth logo"
        className="w-full h-full object-contain drop-shadow-lg"
        loading="eager"
      />
    </div>
  );
}
