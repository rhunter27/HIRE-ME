import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import './index.css';  // Corrected path (same directory)
import './styles/global.css';  // Corrected path

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>HIRE-ME</h1>
        <p>Find your next potential candidate!</p>
      </header>
      <div className="content">
        <main>
          <Outlet />
        </main>
        <Nav />
      </div>
    </div>
  );
};

export default App;