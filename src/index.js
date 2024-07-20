import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import CreateSurvey from './components/CreateSurvey';
import EditSurvey from './components/EditSurvey';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/edit-survey/:id" element={<EditSurvey />} />
      </Routes>
    </Router>
  </Provider>
);
