import { useSavedCandidates } from '../context/SavedCandidatesContext';

const SavedCandidates: React.FC = () => {
  const { savedCandidates, removeCandidate } = useSavedCandidates();

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet. Start adding some!</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id} style={{ marginBottom: '1rem' }}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name || candidate.username}'s avatar`}
                width="50"
                style={{ borderRadius: '50%' }}
              />
              <div>
                <strong>Name:</strong> {candidate.name || 'N/A'}
              </div>
              <div>
                <strong>Username:</strong> {candidate.username}
              </div>
              <div>
                <strong>Location:</strong> {candidate.location || 'N/A'}
              </div>
              <div>
                <strong>Email:</strong> {candidate.email || 'N/A'}
              </div>
              <div>
                <strong>Company:</strong> {candidate.company || 'N/A'}
              </div>
              <div>
                <strong>GitHub Profile:</strong>{' '}
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  {candidate.html_url}
                </a>
              </div>
              <button onClick={() => removeCandidate(candidate.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;