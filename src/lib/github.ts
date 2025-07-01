import { Project, GitHubUser } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'LisanHsn'; // Replace with actual GitHub username

// GitHub API helper function
async function fetchGitHub(endpoint: string) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      // Add GitHub token if needed for higher rate limits
      // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

// Fetch user profile
export async function fetchGitHubUser(): Promise<GitHubUser> {
  try {
    return await fetchGitHub(`/users/${GITHUB_USERNAME}`);
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    // Return fallback data
    return {
      login: GITHUB_USERNAME,
      id: 0,
      avatar_url: '/imperial-avatar.jpg',
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      name: 'Lisan Hsn',
      company: 'Dark Side Development',
      blog: '',
      location: 'Death Star',
      email: '',
      bio: 'Self-taught developer who has mastered the dark side of coding',
      public_repos: 42,
      followers: 1337,
      following: 66,
      created_at: '2020-01-01T00:00:00Z'
    };
  }
}

// Fetch repositories
export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const repos = await fetchGitHub(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`);
    
    // Filter and transform repositories
    return repos
      .filter((repo: any) => !repo.fork && !repo.archived) // Exclude forks and archived repos
      .map((repo: any): Project => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || 'Imperial classified project',
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language || 'Unknown',
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url
      }))
      .sort((a: Project, b: Project) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return fallback projects
    return [
      {
        id: 1,
        name: 'death-star-plans',
        full_name: `${GITHUB_USERNAME}/death-star-plans`,
        description: 'Ultimate weapon construction blueprints and technical specifications',
        html_url: `https://github.com/${GITHUB_USERNAME}/death-star-plans`,
        homepage: 'https://deathstar.imperial.gov',
        language: 'TypeScript',
        stargazers_count: 9999,
        forks_count: 666,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        topics: ['imperial', 'weapon', 'construction', 'typescript'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/death-star-plans.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/death-star-plans.git`
      },
      {
        id: 2,
        name: 'imperial-fleet-manager',
        full_name: `${GITHUB_USERNAME}/imperial-fleet-manager`,
        description: 'React Native app for managing Imperial Star Destroyer fleets across the galaxy',
        html_url: `https://github.com/${GITHUB_USERNAME}/imperial-fleet-manager`,
        homepage: 'https://fleet.imperial.gov',
        language: 'JavaScript',
        stargazers_count: 1337,
        forks_count: 234,
        created_at: '2023-02-01T00:00:00Z',
        updated_at: '2023-11-15T00:00:00Z',
        topics: ['react-native', 'mobile', 'fleet-management', 'imperial'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/imperial-fleet-manager.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/imperial-fleet-manager.git`
      },
      {
        id: 3,
        name: 'sith-academy-portal',
        full_name: `${GITHUB_USERNAME}/sith-academy-portal`,
        description: 'Next.js web application for Sith training programs and dark side education',
        html_url: `https://github.com/${GITHUB_USERNAME}/sith-academy-portal`,
        homepage: 'https://academy.sith.gov',
        language: 'TypeScript',
        stargazers_count: 800,
        forks_count: 156,
        created_at: '2023-03-01T00:00:00Z',
        updated_at: '2023-10-20T00:00:00Z',
        topics: ['nextjs', 'education', 'sith', 'dark-side', 'typescript'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/sith-academy-portal.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/sith-academy-portal.git`
      },
      {
        id: 4,
        name: 'force-sensitive-detector',
        full_name: `${GITHUB_USERNAME}/force-sensitive-detector`,
        description: 'Python machine learning model to identify Force-sensitive individuals',
        html_url: `https://github.com/${GITHUB_USERNAME}/force-sensitive-detector`,
        language: 'Python',
        stargazers_count: 555,
        forks_count: 89,
        created_at: '2023-04-01T00:00:00Z',
        updated_at: '2023-09-30T00:00:00Z',
        topics: ['python', 'machine-learning', 'force', 'detection', 'ai'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/force-sensitive-detector.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/force-sensitive-detector.git`
      },
      {
        id: 5,
        name: 'imperial-communication-hub',
        full_name: `${GITHUB_USERNAME}/imperial-communication-hub`,
        description: 'Real-time messaging system for Imperial forces using Node.js and WebSockets',
        html_url: `https://github.com/${GITHUB_USERNAME}/imperial-communication-hub`,
        language: 'JavaScript',
        stargazers_count: 420,
        forks_count: 67,
        created_at: '2023-05-01T00:00:00Z',
        updated_at: '2023-08-15T00:00:00Z',
        topics: ['nodejs', 'websockets', 'real-time', 'communication', 'imperial'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/imperial-communication-hub.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/imperial-communication-hub.git`
      },
      {
        id: 6,
        name: 'dark-side-analytics',
        full_name: `${GITHUB_USERNAME}/dark-side-analytics`,
        description: 'React dashboard for tracking galactic domination metrics and rebel activities',
        html_url: `https://github.com/${GITHUB_USERNAME}/dark-side-analytics`,
        language: 'TypeScript',
        stargazers_count: 333,
        forks_count: 45,
        created_at: '2023-06-01T00:00:00Z',
        updated_at: '2023-07-20T00:00:00Z',
        topics: ['react', 'dashboard', 'analytics', 'dark-side', 'typescript'],
        clone_url: `https://github.com/${GITHUB_USERNAME}/dark-side-analytics.git`,
        ssh_url: `git@github.com:${GITHUB_USERNAME}/dark-side-analytics.git`
      }
    ];
  }
}

// Get featured projects (top starred or manually curated)
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await fetchGitHubRepos();
  
  // Return top 6 projects by stars, or all if less than 6
  return allProjects
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

// Get project statistics
export async function getProjectStats() {
  try {
    const projects = await fetchGitHubRepos();
    const user = await fetchGitHubUser();
    
    return {
      totalProjects: projects.length,
      totalStars: projects.reduce((sum, project) => sum + project.stargazers_count, 0),
      totalForks: projects.reduce((sum, project) => sum + project.forks_count, 0),
      languages: Array.from(new Set(projects.map(p => p.language).filter(Boolean))),
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following
    };
  } catch (error) {
    console.error('Error getting project stats:', error);
    return {
      totalProjects: 42,
      totalStars: 9999,
      totalForks: 1337,
      languages: ['TypeScript', 'JavaScript', 'Python', 'React', 'Next.js'],
      publicRepos: 42,
      followers: 1337,
      following: 66
    };
  }
}

// Format relative time for display
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Get language color for display
export function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'React': '#61DAFB',
    'Vue': '#4FC08D',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'Java': '#ED8B00',
    'C++': '#00599C',
    'C#': '#239120',
    'Go': '#00ADD8',
    'Rust': '#000000',
    'Swift': '#FA7343',
    'Kotlin': '#0095D5',
    'PHP': '#777BB4',
    'Ruby': '#CC342D',
    'Shell': '#89E051',
    'Dockerfile': '#384D54'
  };
  
  return colors[language] || '#FF0000'; // Default to Imperial Red
} 