import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/create-survey" className="App-link btn btn-primary">
          Create Survey
        </Link>
      </header>
    </div>
  );
}

export default App;
