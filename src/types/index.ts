import { ReactNode } from 'react';

export interface Project {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  clone_url: string;
  ssh_url: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'database';
  icon?: string;
  color?: string;
  description?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  transmission_type: 'urgent' | 'standard' | 'encrypted';
}

export interface ImperialStats {
  rank: string;
  powerLevel: number;
  projectsCompleted: number;
  enemiesDefeated: number;
  forceCapacity: number;
}

export interface SithQuote {
  text: string;
  author: string;
  context?: string;
}

export interface ThreeJSProps {
  children?: ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface AnimationProps {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
} 