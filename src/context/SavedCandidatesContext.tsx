import { createContext, useContext, useState, ReactNode } from 'react';

interface Candidate {
  id: number;
  name: string;
  username: string;
}

interface SavedCandidatesContextType {
  savedCandidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: number) => void;
}

const SavedCandidatesContext = createContext<SavedCandidatesContextType | undefined>(undefined);

export const SavedCandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const addCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) =>
      prev.some((c) => c.id === candidate.id) ? prev : [...prev, candidate]
    );
  };

  const removeCandidate = (id: number) => {
    setSavedCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
  };

  return (
    <SavedCandidatesContext.Provider value={{ savedCandidates, addCandidate, removeCandidate }}>
      {children}
    </SavedCandidatesContext.Provider>
  );
};

export const useSavedCandidates = () => {
  const context = useContext(SavedCandidatesContext);
  if (!context) {
    throw new Error('useSavedCandidates must be used within a SavedCandidatesProvider');
  }
  return context;
};