'use client';

import React from 'react';
import type { SeasonCardProps } from '@/types/giada';

/**
 * SeasonCard Component
 * 
 * Displays a fashion season collection with:
 * - Season title
 * - Auto-playing muted video (16:9 aspect ratio)
 * - Long-form description text
 * 
 * Video autoplay works because muted attribute is set (no user gesture required).
 * All styling applied via CSS classes from giada-archive.css
 */
export function SeasonCard({
  title,
  videoUrl,
  description,
}: SeasonCardProps): React.ReactElement {
  return (
    <article className="giada-season-card">
      <h2 className="giada-season-title">{title}</h2>

      <div className="giada-video-container">
        <video autoPlay loop muted controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <p className="giada-season-description">{description}</p>
    </article>
  );
}
