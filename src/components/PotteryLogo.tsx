import React from 'react';

interface PotteryLogoProps {
  className?: string;
  size?: number;
}

export const PotteryLogo: React.FC<PotteryLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      {/* Outer subtle guide ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="#FAF5F0"
        stroke="#B8582B"
        strokeWidth="1.8"
        strokeDasharray="3 2"
        opacity="0.85"
      />
      <circle cx="50" cy="50" r="41" fill="#F4EFEA" />

      {/* Terracotta Vessel Body */}
      <path
        d="M36 28 C42 27 58 27 64 28 C66 31 62 34 59 35 C68 42 74 52 72 65 C70 76 58 80 50 80 C42 80 30 76 28 65 C26 52 32 42 41 35 C38 34 34 31 36 28 Z"
        fill="#B8582B"
      />

      {/* Incised decorative slip lines */}
      <path
        d="M33 55 C40 58 60 58 67 55"
        stroke="#FAF5F0"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M35 62 C42 65 58 65 65 62"
        stroke="#FAF5F0"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M42 48 C46 50 54 50 58 48"
        stroke="#FAF5F0"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Vessel Rim Opening */}
      <ellipse cx="50" cy="29" rx="13" ry="2.6" fill="#FAF5F0" opacity="0.95" />

      {/* Wheel-thrown clay reflection highlight */}
      <path
        d="M35 44 C31 52 31 63 36 71"
        stroke="#E6C8B5"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
};
