'use client';

import React from 'react';
import { StickyHeaderProps, NavLink } from '@/types/giada';
import { headerNavLinks } from '@/lib/giada-seasons-data';

/**
 * StickyHeader Component
 * 
 * Displays a sticky navigation header with links to different sections.
 * The header remains fixed at the top of the page during scrolling.
 * 
 * @component
 * @example
 * <StickyHeader />
 * 
 * @param {StickyHeaderProps} props - Component props
 * @returns {JSX.Element} The rendered sticky header
 */
export default function StickyHeader({ navLinks = headerNavLinks }: StickyHeaderProps) {
  return (
    <header className="giada-header">
      <nav className="giada-nav">
        {navLinks.map((link: NavLink) => (
          <a
            key={link.href}
            href={link.href}
            className={`giada-nav-link ${link.isActive ? 'active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
