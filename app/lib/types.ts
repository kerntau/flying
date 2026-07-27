export interface Post {
  slug: string;
  title: string;
  description?: string;
  pubDate: string; // ISO string
  updatedDate?: string;
  cover?: string;
  category: string;
  tags: string[];
  author: string;
  content: string;
}

export interface Photo {
  slug: string;
  title: string;
  url: string;
  description?: string;
  group: string;
  date: string;
}

export interface Moment {
  slug: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Author {
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  website: string;
}

export interface Link {
  title: string;
  href: string;
  avatar: string;
  description: string;
  group: string;
}

export interface SiteConfig {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  author: string;
  logo: string;
}
