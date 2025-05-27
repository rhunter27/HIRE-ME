export const searchGithub = async (query: string) => {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    return data.items.map((user: GithubUser) => ({
      id: user.id,
      name: user.login, // GitHub API uses 'login' as the username
      username: user.login,
    }));
  };
  
  export const searchGithubUser = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const since = Math.floor(Math.random() * 1000000);
    const user: GithubUser = await response.json();
    return {
      id: user.id,
      name: user.name,
      bio: user.bio,
      location: user.location,
    };
  }
  
// Define and export the GithubUser type

export interface GithubUser {
    id: number;
    name: string | null;
    login: string;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    location: string | null;
    email: string | null; // Add email field
  }