// Imperial CMS - Headless Content Management System
import { analytics } from './analytics';

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'code' | 'skill' | 'project' | 'testimonial' | '3d-model';
  content: any;
  metadata: {
    created: string;
    updated: string;
    author: string;
    published: boolean;
    seoTitle?: string;
    seoDescription?: string;
    tags: string[];
  };
  styling: {
    theme: 'imperial' | 'rebel' | 'jedi' | 'custom';
    animations: boolean;
    layout: 'default' | 'centered' | 'wide' | 'split';
  };
}

export interface SiteConfiguration {
  general: {
    siteName: string;
    tagline: string;
    description: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
  };
  navigation: {
    items: Array<{
      id: string;
      label: string;
      href: string;
      icon?: string;
      order: number;
      visible: boolean;
    }>;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    discord?: string;
    youtube?: string;
  };
  analytics: {
    googleAnalytics?: string;
    microsoftClarity?: string;
    facebookPixel?: string;
    customTracking: boolean;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    openGraphImage: string;
    twitterCard: 'summary' | 'summary_large_image';
    sitemap: boolean;
    robots: boolean;
  };
  performance: {
    lazyLoading: boolean;
    imageOptimization: boolean;
    caching: boolean;
    compression: boolean;
    preloading: boolean;
  };
}

class ImperialCMS {
  private static instance: ImperialCMS;
  private content: Map<string, ContentBlock> = new Map();
  private config: SiteConfiguration;
  private apiEndpoint = '/api/cms';

  constructor() {
    this.config = this.getDefaultConfig();
    this.loadFromLocalStorage();
  }

  static getInstance(): ImperialCMS {
    if (!ImperialCMS.instance) {
      ImperialCMS.instance = new ImperialCMS();
    }
    return ImperialCMS.instance;
  }

  // Content Management
  async createContent(type: ContentBlock['type'], content: any, metadata?: Partial<ContentBlock['metadata']>): Promise<string> {
    const id = this.generateId();
    const block: ContentBlock = {
      id,
      type,
      content,
      metadata: {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        author: 'Darth Lisan',
        published: false,
        tags: [],
        ...metadata,
      },
      styling: {
        theme: 'imperial',
        animations: true,
        layout: 'default',
      },
    };

    this.content.set(id, block);
    await this.saveToStorage();
    
    analytics.trackEvent('content_created', {
      content_type: type,
      content_id: id,
      category: 'cms'
    });

    return id;
  }

  async updateContent(id: string, updates: Partial<ContentBlock>): Promise<boolean> {
    const existing = this.content.get(id);
    if (!existing) return false;

    const updated: ContentBlock = {
      ...existing,
      ...updates,
      metadata: {
        ...existing.metadata,
        ...updates.metadata,
        updated: new Date().toISOString(),
      },
    };

    this.content.set(id, updated);
    await this.saveToStorage();
    
    analytics.trackEvent('content_updated', {
      content_type: existing.type,
      content_id: id,
      category: 'cms'
    });

    return true;
  }

  async deleteContent(id: string): Promise<boolean> {
    const content = this.content.get(id);
    if (!content) return false;

    this.content.delete(id);
    await this.saveToStorage();
    
    analytics.trackEvent('content_deleted', {
      content_type: content.type,
      content_id: id,
      category: 'cms'
    });

    return true;
  }

  getContent(id: string): ContentBlock | undefined {
    return this.content.get(id);
  }

  getAllContent(type?: ContentBlock['type'], published?: boolean): ContentBlock[] {
    let content = Array.from(this.content.values());
    
    if (type) {
      content = content.filter(block => block.type === type);
    }
    
    if (published !== undefined) {
      content = content.filter(block => block.metadata.published === published);
    }
    
    return content.sort((a, b) => 
      new Date(b.metadata.updated).getTime() - new Date(a.metadata.updated).getTime()
    );
  }

  // Configuration Management
  updateConfig(updates: Partial<SiteConfiguration>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfigToStorage();
    
    analytics.trackEvent('config_updated', {
      category: 'cms',
      config_sections: Object.keys(updates)
    });
  }

  getConfig(): SiteConfiguration {
    return { ...this.config };
  }

  // Theme Management
  async switchTheme(theme: 'imperial' | 'rebel' | 'jedi' | 'custom'): Promise<void> {
    const themeConfig = this.getThemeConfig(theme);
    this.updateConfig({
      general: {
        ...this.config.general,
        ...themeConfig,
      },
    });
    
    analytics.trackEvent('theme_switched', {
      new_theme: theme,
      category: 'customization'
    });
  }

  private getThemeConfig(theme: string) {
    const themes = {
      imperial: {
        primaryColor: '#dc2626', // Imperial Red
        secondaryColor: '#000000', // Imperial Black
        accentColor: '#fbbf24', // Imperial Gold
      },
      rebel: {
        primaryColor: '#f97316', // Rebel Orange
        secondaryColor: '#1e293b', // Space Gray
        accentColor: '#10b981', // Rebel Green
      },
      jedi: {
        primaryColor: '#3b82f6', // Jedi Blue
        secondaryColor: '#1e293b', // Space Gray
        accentColor: '#10b981', // Force Green
      },
      custom: {
        primaryColor: '#6366f1', // Custom Purple
        secondaryColor: '#1e293b', // Space Gray
        accentColor: '#f59e0b', // Custom Amber
      },
    };
    return themes[theme as keyof typeof themes] || themes.imperial;
  }

  // Template Management
  createTemplate(name: string, blocks: ContentBlock[]): void {
    const template = {
      id: this.generateId(),
      name,
      blocks,
      created: new Date().toISOString(),
    };
    
    const templates = this.getTemplates();
    templates.push(template);
    localStorage.setItem('imperial_templates', JSON.stringify(templates));
    
    analytics.trackEvent('template_created', {
      template_name: name,
      blocks_count: blocks.length,
      category: 'cms'
    });
  }

  getTemplates(): Array<{id: string; name: string; blocks: ContentBlock[]; created: string}> {
    const stored = localStorage.getItem('imperial_templates');
    return stored ? JSON.parse(stored) : [];
  }

  applyTemplate(templateId: string): void {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      template.blocks.forEach(block => {
        const newId = this.generateId();
        this.content.set(newId, {
          ...block,
          id: newId,
          metadata: {
            ...block.metadata,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
          },
        });
      });
      
      this.saveToStorage();
      
      analytics.trackEvent('template_applied', {
        template_id: templateId,
        template_name: template.name,
        category: 'cms'
      });
    }
  }

  // Backup and Export
  exportData(): string {
    const exportData = {
      content: Array.from(this.content.entries()),
      config: this.config,
      templates: this.getTemplates(),
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    analytics.trackEvent('data_exported', {
      content_count: this.content.size,
      category: 'cms'
    });
    
    return JSON.stringify(exportData, null, 2);
  }

  async importData(data: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.content) {
        this.content.clear();
        parsed.content.forEach(([id, block]: [string, ContentBlock]) => {
          this.content.set(id, block);
        });
      }
      
      if (parsed.config) {
        this.config = parsed.config;
        this.saveConfigToStorage();
      }
      
      if (parsed.templates) {
        localStorage.setItem('imperial_templates', JSON.stringify(parsed.templates));
      }
      
      await this.saveToStorage();
      
      analytics.trackEvent('data_imported', {
        content_count: this.content.size,
        category: 'cms'
      });
      
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // SEO Helpers
  generateSitemap(): string {
    const baseUrl = this.config.general.siteName || 'https://darth-lisan.dev';
    const publishedContent = this.getAllContent(undefined, true);
    
    const urls = [
      { loc: baseUrl, changefreq: 'weekly', priority: '1.0' },
      ...publishedContent.map(content => ({
        loc: `${baseUrl}/${content.type}/${content.id}`,
        changefreq: 'monthly',
        priority: '0.8',
        lastmod: content.metadata.updated,
      })),
    ];
    
    return this.generateSitemapXML(urls);
  }

  private generateSitemapXML(urls: Array<{loc: string; changefreq: string; priority: string; lastmod?: string}>): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
  }

  // Utility Methods
  private generateId(): string {
    return `imp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async saveToStorage(): Promise<void> {
    try {
      const data = JSON.stringify(Array.from(this.content.entries()));
      localStorage.setItem('imperial_cms_content', data);
      
      // Also save to server if available
      if (typeof window !== 'undefined') {
        await this.syncToServer();
      }
    } catch (error) {
      console.warn('Failed to save to storage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem('imperial_cms_content');
      if (stored) {
        const data = JSON.parse(stored);
        this.content = new Map(data);
      }
      
      const configStored = localStorage.getItem('imperial_cms_config');
      if (configStored) {
        this.config = { ...this.config, ...JSON.parse(configStored) };
      }
    } catch (error) {
      console.warn('Failed to load from storage:', error);
    }
  }

  private saveConfigToStorage(): void {
    try {
      localStorage.setItem('imperial_cms_config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save config:', error);
    }
  }

  private async syncToServer(): Promise<void> {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync',
          content: Array.from(this.content.entries()),
          config: this.config,
        }),
      });
    } catch (error) {
      console.warn('Failed to sync to server:', error);
    }
  }

  private getDefaultConfig(): SiteConfiguration {
    return {
      general: {
        siteName: 'Darth Lisan - Imperial Portfolio',
        tagline: 'Dark Side Developer',
        description: 'Join the Empire. Discover the portfolio of a powerful developer who has mastered the dark side of coding.',
        logo: '/logo.png',
        favicon: '/favicon.ico',
        primaryColor: '#dc2626',
        secondaryColor: '#000000',
        accentColor: '#fbbf24',
        darkMode: true,
      },
      navigation: {
        items: [
          { id: 'hero', label: 'Command Center', href: '#hero', order: 1, visible: true },
          { id: 'about', label: 'Origin Story', href: '#about', order: 2, visible: true },
          { id: 'skills', label: 'Force Powers', href: '#skills', order: 3, visible: true },
          { id: 'projects', label: 'Imperial Archives', href: '#projects', order: 4, visible: true },
          { id: 'contact', label: 'Transmission', href: '#contact', order: 5, visible: true },
        ],
      },
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        email: 'contact@darth-lisan.dev',
      },
      analytics: {
        customTracking: true,
      },
      seo: {
        defaultTitle: 'Darth Lisan - Dark Side Developer | Imperial Portfolio',
        defaultDescription: 'Join the Empire. Discover the portfolio of Lisan Hsn, a powerful developer who has mastered the dark side of coding.',
        keywords: ['developer', 'portfolio', 'star wars', 'imperial', 'web development'],
        openGraphImage: '/og-image.jpg',
        twitterCard: 'summary_large_image',
        sitemap: true,
        robots: true,
      },
      performance: {
        lazyLoading: true,
        imageOptimization: true,
        caching: true,
        compression: true,
        preloading: true,
      },
    };
  }
}

// Export singleton instance
export const cms = ImperialCMS.getInstance(); 