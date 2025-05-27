import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import About from './pages/About'; // Import the About page
import { SavedCandidatesProvider } from './context/SavedCandidatesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CandidateSearch /> },
      { path: 'saved-candidates', element: <SavedCandidates /> },
      { path: 'about', element: <About /> }, // Add the About route
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <SavedCandidatesProvider>
      <RouterProvider router={router} />
    </SavedCandidatesProvider>
  </React.StrictMode>
);