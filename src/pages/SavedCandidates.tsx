import { useSavedCandidates } from '../context/SavedCandidatesContext';

const SavedCandidates: React.FC = () => {
  const { savedCandidates, removeCandidate } = useSavedCandidates(); // Access savedCandidates and removeCandidate

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet. Start adding some!</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img
                src={candidate.avatar_url}
                alt={candidate.name || candidate.username}
                width="50"
              />
              <p>Name: {candidate.name || candidate.username}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  View GitHub Profile
                </a>
              </p>
              <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;