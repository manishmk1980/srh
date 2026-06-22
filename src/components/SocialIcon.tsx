import React from 'react';

type SocialName = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

interface SocialIconProps {
  name: SocialName;
  className?: string;
}

const paths: Record<SocialName, JSX.Element> = {
  facebook: (
    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.56v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
  ),
  instagram: (
    <>
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Z" />
      <path d="M12 7.3A4.7 4.7 0 1 1 12 16.7 4.7 4.7 0 0 1 12 7.3Zm0 2A2.7 2.7 0 1 0 12 14.7 2.7 2.7 0 0 0 12 9.3Z" />
      <path d="M17.1 6.55a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6.94 8.98H3.65V20h3.29V8.98ZM5.3 4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z" />
      <path d="M9.05 8.98V20h3.28v-5.45c0-1.44.27-2.83 2.05-2.83 1.75 0 1.77 1.64 1.77 2.92V20h3.28v-6.04c0-2.97-.64-5.25-4.11-5.25-1.67 0-2.79.92-3.25 1.79h-.05V8.98H9.05Z" />
    </>
  ),
  youtube: (
    <path d="M21.58 7.2a2.75 2.75 0 0 0-1.94-1.95C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45A2.75 2.75 0 0 0 2.42 7.2C2 8.92 2 12.5 2 12.5s0 3.58.42 5.3a2.75 2.75 0 0 0 1.94 1.95c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.95c.42-1.72.42-5.3.42-5.3s0-3.58-.42-5.3ZM10 15.7V9.3l5.2 3.2L10 15.7Z" />
  ),
};

export default function SocialIcon({ name, className = 'w-4 h-4' }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
