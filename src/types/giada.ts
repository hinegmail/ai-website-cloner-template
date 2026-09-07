/**
 * GIADA Archive Clone - TypeScript Types
 * All types for the GIADA fashion archive page
 */

/**
 * Individual season collection data
 */
export interface SeasonCollection {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  year: number;
  season: "FW" | "SS"; // Fall-Winter or Spring-Summer
}

/**
 * All season collections (8 total)
 */
export interface SeasonsData {
  collections: SeasonCollection[];
  totalCount: number;
}

/**
 * Navigation link structure
 */
export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

/**
 * Footer section (collapsible)
 */
export interface FooterSection {
  id: string;
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
  isCollapsed?: boolean;
}

/**
 * Complete page data structure
 */
export interface GiadaArchivePage {
  header: {
    navLinks: NavLink[];
  };
  mainContent: {
    seasons: SeasonCollection[];
  };
  footer: {
    sections: FooterSection[];
    copyright: {
      text: string;
      year: number;
    };
    languageOptions: Array<{
      code: string;
      label: string;
      isActive: boolean;
      href: string;
    }>;
  };
}

/**
 * Component Props - StickyHeader
 */
export interface StickyHeaderProps {
  navLinks?: NavLink[];
}

/**
 * Component Props - SeasonCard
 */
export interface SeasonCardProps {
  title: string;
  videoUrl: string;
  description: string;
}

/**
 * Component Props - Footer
 */
export interface FooterProps {
  sections?: FooterSection[];
  copyrightText?: string;
  copyrightYear?: number;
  languageOptions?: Array<{
    code: string;
    label: string;
    isActive: boolean;
    href: string;
  }>;
}

/**
 * API Response types (for future backend integration)
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface SeasonCollectionResponse extends ApiResponse<SeasonCollection[]> {}
