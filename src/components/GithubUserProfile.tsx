import { useState } from 'react';
import { GithubUser } from '../api/githubTypes'; // Import the GithubUser type

const GithubUserProfile = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const userData: GithubUser = await response.json();
      setUser(userData);
    } catch (err: any) {
      setUser(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>GitHub User Profile</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={fetchUserProfile}>View Profile</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h2>{user.name || user.login}</h2>
          <img src={user.avatar_url} alt={`${user.name || user.login}'s avatar`} width="150" />
          <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
          <p><strong>Location:</strong> {user.location || 'No location available'}</p>
          <p>
            <strong>GitHub Profile:</strong>{' '}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.html_url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GithubUserProfile;