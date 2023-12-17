import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Table = ({ entries, setEntries, deleteEntry, editEntry }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    console.log('Entries in Profile component:', entries);
  }, [entries]);

  const toggleSortOrder = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const getSortingIndicator = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '\u25B2' : '\u25BC'; // Up and down arrows
    }
    return null;
  };

  const sortedEntries = entries.slice().sort((a, b) => {
    const columnA = a[sortColumn].toLowerCase();
    const columnB = b[sortColumn].toLowerCase();

    if (sortOrder === 'asc') {
      return columnA.localeCompare(columnB);
    } else {
      return columnB.localeCompare(columnA);
    }
  });

  const handleEdit = (index, entry) => {
    setEditIndex(index);
    setEditedEntry({ ...entry });
  };

  const handleSave = (index) => {
    setEditIndex(null);
    editEntry(index, editedEntry);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="mt-16 lg:text-center lg:pl-0 pl-6 font-bold">
      <h2 className="text-2xl font-semibold mb-4 lg:w-full w-[350px]">User Entries</h2>
        <div className='lg:invisible visible text-center text-yellow-400 bg-black font-bold text-2xl mt-4 lg:h-0 lg:w-0 w-[350px]'>
          <h1 className='animate-pulse'>Only Large Screen Supports Table Content to be displayed!!!</h1>
        </div>
      <table className='lg:mx-32 mx-2 lg:block hidden'>
        <thead className="bg-red-100 border border-gray-300 shadow-md">
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => toggleSortOrder('name')}>Name {getSortingIndicator('name')}</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">DOB</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">District</th>
            <th className="py-2 px-4 border-b">Province</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="border border-gray-300 shadow-md mx-2">
          {sortedEntries.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[130px]'
                    type="text"
                    value={editedEntry.name}
                    onChange={(e) => setEditedEntry({ ...editedEntry, name: e.target.value })}
                  />
                ) : (
                  entry.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[200px]'
                    type="text"
                    value={editedEntry.email}
                    onChange={(e) => setEditedEntry({ ...editedEntry, email: e.target.value })}
                  />
                ) : (
                  entry.email
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[120px]'
                    type="text"
                    value={editedEntry.phoneNumber}
                    onChange={(e) => setEditedEntry({ ...editedEntry, phoneNumber: e.target.value })}
                  />
                ) : (
                  entry.phoneNumber
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[120px]'
                    type="date"
                    value={editedEntry.dob}
                    onChange={(e) => setEditedEntry({ ...editedEntry, dob: e.target.value })}
                  />
                ) : (
                  entry.dob
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[200px]'
                    type="text"
                    value={editedEntry.address.city}
                    onChange={(e) => setEditedEntry({ ...editedEntry, address: { ...editedEntry.address, city: e.target.value } })}
                  />
                ) : (
                  entry.address.city
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[100px]'
                    type="text"
                    value={editedEntry.address.district}
                    onChange={(e) => setEditedEntry({ ...editedEntry, address: { ...editedEntry.address, district: e.target.value } })}
                  />
                ) : (
                  entry.address.district
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-10'
                    type="text"
                    value={editedEntry.address.province}
                    onChange={(e) => setEditedEntry({ ...editedEntry, address: { ...editedEntry.address, province: e.target.value } })}
                  />
                ) : (
                  entry.address.province
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editIndex === index ? (
                  <input
                    className='w-[80px]'
                    type="text"
                    value={editedEntry.address.country}
                    onChange={(e) => setEditedEntry({ ...editedEntry, address: { ...editedEntry.address, country: e.target.value } })}
                  />
                ) : (
                  entry.address.country
                )}
              </td>
              <td className="grid text-start border-b">
                {editIndex === index ? (
                  <>
                    <button
                      onClick={() => handleSave(index)}
                      className="text-green-500 hover:underline focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 hover:underline focus:outline-none"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(index, entry)}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteEntry(index)}
                  className="text-red-500 hover:underline focus:outline-none ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='lg:text-center mb-16 lg:w-full w-[350px]'>
        <Link to="/profiles">
          <button className='mt-8 border border-1 border-black rounded-lg lg:w-[400px] w-[350px] text-center h-10 bg-green-800 font-bold text-white'>Show All</button>
        </Link>
      </div>
    </div>
  );
};

export default Table;
