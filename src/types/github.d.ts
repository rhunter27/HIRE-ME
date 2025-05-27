// src/types/github.d.ts
export interface GithubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url?: string;
    name?: string;
    public_repos?: number;
    followers?: number;
    // Add other GitHub API properties as needed
  }