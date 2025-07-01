// Imperial E-commerce System - Digital Products & Services
import { analytics } from './analytics';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'digital' | 'service' | 'course' | 'template';
  category: string;
  images: string[];
  downloadUrl?: string;
  metadata: {
    created: string;
    updated: string;
    published: boolean;
    featured: boolean;
    tags: string[];
  };
}

export interface Order {
  id: string;
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  created: string;
  completed?: string;
}

class ImperialEcommerce {
  private static instance: ImperialEcommerce;
  private products: Map<string, Product> = new Map();
  private orders: Map<string, Order> = new Map();

  static getInstance(): ImperialEcommerce {
    if (!ImperialEcommerce.instance) {
      ImperialEcommerce.instance = new ImperialEcommerce();
    }
    return ImperialEcommerce.instance;
  }

  constructor() {
    this.initializeDefaultProducts();
  }

  // Product Management
  async createProduct(productData: Omit<Product, 'id' | 'metadata'>): Promise<string> {
    const id = this.generateId();
    const product: Product = {
      ...productData,
      id,
      metadata: {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        published: false,
        featured: false,
        tags: [],
      },
    };

    this.products.set(id, product);
    
    analytics.trackEvent('product_created', {
      product_id: id,
      product_type: product.type,
      price: product.price,
      category: 'ecommerce'
    });

    return id;
  }

  getAllProducts(published?: boolean): Product[] {
    let products = Array.from(this.products.values());
    
    if (published !== undefined) {
      products = products.filter(p => p.metadata.published === published);
    }
    
    return products;
  }

  // Initialize with premium products
  private initializeDefaultProducts(): void {
    const defaultProducts = [
      {
        name: 'Imperial Portfolio Template Pro',
        description: 'Complete Star Wars themed portfolio with CMS, analytics, and e-commerce ready',
        price: 299,
        currency: 'USD',
        type: 'template' as const,
        category: 'templates',
        images: ['/products/imperial-pro.jpg'],
        downloadUrl: '/downloads/imperial-pro.zip',
      },
      {
        name: 'Custom Development Service',
        description: 'Full-stack development service for custom applications',
        price: 5000,
        currency: 'USD',
        type: 'service' as const,
        category: 'development',
        images: ['/products/custom-dev.jpg'],
      },
      {
        name: 'Web Development Mastery Course',
        description: 'Complete course on modern web development with React, Next.js, and advanced techniques',
        price: 497,
        currency: 'USD',
        type: 'course' as const,
        category: 'education',
        images: ['/products/course.jpg'],
      },
    ];

    defaultProducts.forEach(async (productData) => {
      const id = await this.createProduct(productData);
      const product = this.products.get(id);
      if (product) {
        product.metadata.published = true;
        product.metadata.featured = true;
      }
    });
  }

  private generateId(): string {
    return `imp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const ecommerce = ImperialEcommerce.getInstance(); 