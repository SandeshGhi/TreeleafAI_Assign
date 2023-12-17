import React, { useState, useEffect } from 'react';
import ProfileList from './profileList';

const Profile = ({ entries, setEntries }) => {
  useEffect(() => {
    console.log('Entries in Profile component:', entries);
  }, [entries]);
  
  // const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const editEntry = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
    setEditIndex(null);
    updateLocalStorage(updatedEntries);
  };  

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
    updateLocalStorage(updatedEntries);
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem('entries', JSON.stringify(data));
  };

  return (
    <div>
      <ProfileList entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />
    </div>
  );
};

export default Profile;
