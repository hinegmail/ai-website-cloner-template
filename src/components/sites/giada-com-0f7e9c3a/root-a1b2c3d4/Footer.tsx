'use client';

import React, { useState } from 'react';
import type { FooterProps, FooterSection } from '@/types/giada';
import {
  footerSections,
  languageOptions,
  footerCopyright,
} from '@/lib/giada-seasons-data';

/**
 * Footer Component
 *
 * Displays the footer with collapsible sections, language selector, and copyright info.
 * Features click-driven collapse/expand functionality for service and policy sections.
 *
 * @component
 * @example
 * <Footer />
 *
 * @param {FooterProps} props - Component props
 * @param {FooterSection[]} [props.sections] - Footer sections with collapsible content
 * @param {string} [props.copyrightText] - Copyright holder text
 * @param {number} [props.copyrightYear] - Copyright year
 * @param {Array} [props.languageOptions] - Available language options
 * @returns {React.ReactElement} The rendered footer
 */
export default function Footer({
  sections = footerSections,
  copyrightText = footerCopyright.text,
  copyrightYear = footerCopyright.year,
  languageOptions: langs = languageOptions,
}: FooterProps): React.ReactElement {
  // State to track which sections are collapsed
  const [collapsedSections, setCollapsedSections] = useState<{
    [key: string]: boolean;
  }>({
    service: true,
    policy: true,
  });

  /**
   * Toggle collapse state for a section
   */
  const toggleSection = (sectionId: string): void => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <footer className="giada-footer">
      {/* Service Section (collapsible) */}
      {sections.map((section: FooterSection) => (
        <div key={section.id} className="giada-collapse-item">
          <div
            role="button"
            onClick={() => toggleSection(section.id)}
            className="giada-collapse-header giada-footer-section-title"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(section.id);
              }
            }}
          >
            {section.title}
          </div>
          <div
            className={`giada-collapse-body ${
              collapsedSections[section.id] ? 'collapsed' : ''
            }`}
          >
            {section.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="giada-footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Language Selector */}
      <div className="giada-language-selector">
        <span>语言:</span>{' '}
        {langs.map((lang, index) => (
          <span key={lang.code}>
            <a
              href={lang.href}
              className={lang.isActive ? 'active giada-footer-link' : 'giada-footer-link'}
              style={{ textDecoration: 'none' }}
            >
              {lang.label}
            </a>
            {index < langs.length - 1 && <span> | </span>}
          </span>
        ))}
      </div>

      {/* Copyright */}
      <div className="giada-copyright">
        <span>©{copyrightYear} {copyrightText}</span>
        <br />
        <a
          href={footerCopyright.icpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="giada-copyright-link"
        >
          {footerCopyright.icpNumber}
        </a>
      </div>
    </footer>
  );
}
