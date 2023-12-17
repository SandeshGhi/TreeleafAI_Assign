import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/form.jsx';
import Table from './components/table.jsx';
import Profile from './components/profile.jsx';
import './App.css';

export const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form entries={entries} setEntries={setEntries} />} />
        <Route path="/table" element={<Table entries={entries} setEntries={setEntries} />} />
        <Route path="/profiles" element={<Profile entries={entries} setEntries={setEntries} />} />
      </Routes>
    </Router>
  )
}

export default App;