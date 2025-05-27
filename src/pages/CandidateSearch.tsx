import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { useSavedCandidates } from '../context/SavedCandidatesContext';
import type { GithubUser } from '../api/githubTypes';

const CandidateSearch = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { addCandidate } = useSavedCandidates(); // Access the addCandidate function

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  const fetchRandomUsers = async () => {
    setLoading(true);
    try {
      const data = await searchGithub(12); // Fetch 12 random GitHub users
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={user.name || user.login} width="50" />
            <p>Name: {user.name || user.login}</p>
            <p>Location: {user.location || 'N/A'}</p>
            <button onClick={() => addCandidate({ id: user.id, name: user.name || user.login, username: user.login })}>Save Candidate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;