// src/api/API.tsx
import type { GithubUser } from './githubTypes';

// Ensure that the GithubUser type is used in the function return types

const API_BASE_URL = 'https://api.github.com';
const API_VERSION = '2022-11-28'; // Example version, update as needed
// Replace 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN' with a valid token or load it securely from environment variables
const token = import.meta.env.VITE_GITHUB_TOKEN || ''; 

if (!token) {
  console.warn('GitHub token is missing. Please set REACT_APP_GITHUB_TOKEN in your environment variables.');
}

// Removed the local declaration of GithubUser to resolve the conflict

/**
 * Helper function to make authenticated requests to the GitHub API.
 */
const fetchWithAuth = async <T extends unknown>(endpoint: string): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': API_VERSION,
      },
    });
  } catch (networkError) {
    if (networkError instanceof Error) {
      throw new Error(`Network error occurred: ${networkError.message}`);
    }
    throw new Error('An unknown network error occurred.');
  }

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(
      `GitHub API Error (${response.status}): ${errorData.message}`
    );
  }

  return response.json();
};

/**
 * Fetches random GitHub users.
 * @param count Number of users to fetch (default is 30).
 * @returns A list of GitHub users.
 */
export const searchGithub = async (count: number = 30): Promise<GithubUser[]> => {
  try {
    const since = Math.floor(Math.random() * 1000000);
    return await fetchWithAuth<GithubUser[]>(
      `/users?since=${since}&per_page=${count}`
    );
  } catch (error) {
    console.error('Error fetching GitHub users:', error);
    throw error;
  }
};

/**
 * Fetches detailed information about a specific GitHub user.
 * @param username The username of the GitHub user.
 * @returns The detailed profile of the GitHub user.
 */
export const searchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    return await fetchWithAuth<GithubUser>(`/users/${username}`);
  } catch (error) {
    console.error(`Error fetching GitHub user (${username}):`, error);
    throw error;
  }
};