import React, { useState, useEffect } from 'react';
import Table from './table';

const Form = ({ addEntry }) => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [address, setAddress] = useState({
    city: '',
    district: '',
    province: 'Select',
    country: 'Nepal',
  });
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dobError, setDOBError] = useState('');
  const [cityError, setCityError] = useState('');
  const [districtError, setDistrictError] = useState('');

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      setNameError('Name is required.');
      return;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.length < 7) {
      setPhoneNumberError('Phone Number must be at least 7 characters.');
      return;
    }

    if (!dob.trim()) {
      setDOBError('Date of Birth is required.');
      return;
    }

    if (!address.city.trim()) {
      setCityError('City is required.');
      return;
    }
  
    if (!address.district.trim()) {
      setDistrictError('District is required.');
      return;
    }

    setNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setDOBError('');
    setCityError('');
    setDistrictError('');

    // Add entry to local storage
    const newEntry = { name, email, phoneNumber, dob, address: { ...address, province: String(address.province) }, };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);

    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    setName('');
    setEmail('');
    setPhoneNumber('');
    setDOB('');
    setAddress({
      city: '',
      district: '',
      province: 'Select Any one',
      country: 'Nepal',
    });
  };

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
      <form onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold text-center mt-4 lg:w-full w-[390px]'>Add New Entries</h1>
        <div className='lg:flex md:flex lg:flex-1 lg:justify-evenly bg-lime-300 mt-8 lg:w-full w-[390px]'>
          <div className="grid gap-y-6 mt-16 lg:pl-16 pl-6 lg:mb-16">
            <div className='grid mt-2'>
                <label className='text-black font-bold'>Name: </label>
                <input
                  className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 px-2 rounded-lg bg-pink-100 placeholder-black ${
                    nameError ? 'border-red-500' : ''
                  }`}
                  type="text"
                  value={name}
                  placeholder='Enter Your Name'
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
            </div>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Email:</label>
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 placeholder-black px-2 ${
                  emailError ? 'border-red-500' : ''
                }`}
                type="email"
                value={email}
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </div>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Phone Number:</label>
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 placeholder-black placeholder:pl-2 ${
                  phoneNumberError ? 'border-red-500' : ''
                }`}
                type="tel"
                value={phoneNumber}
                placeholder='Enter Your Phone Number'
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, '').slice(0, 10))}
              />
              {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
            </div>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Date Of Birth:</label>
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 px-2 ${
                  dobError ? 'border-red-500' : ''
                }`}
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
              {dobError && <p style={{ color: 'red' }}>{dobError}</p>}
            </div>
          </div>
          <div className='grid gap-y-6 lg:mt-16 mt-4 lg:pl-16 pl-6 mb-16'>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Address:</label>
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 placeholder-black px-2 ${
                  cityError ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder='City'
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
              />
              {cityError && <p style={{ color: 'red' }}>{cityError}</p>}
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 px-2 placeholder-black ${
                  districtError ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder='District'
                value={address.district}
                onChange={(e) => setAddress({...address, district: e.target.value})}
              />
              {districtError && <p style={{ color: 'red' }}>{districtError}</p>}
            </div>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Province:</label>
              <select
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100`}
                value={address.province}
                onChange={(e) => setAddress({...address, province: e.target.value})}
              >
                {["Select Any one", 1, 2, 3, 4, 5, 6, 7].map((province) => (
                  <option key={province} value={String(province)}>
                    Province {province}
                  </option>
                ))}
              </select>
            </div>
            <div className='grid mt-2'>
              <label className='text-black font-bold'>Country:</label>
              <input
                className={`border border-1 border-black lg:w-[400px] w-[350px] h-10 rounded-lg bg-pink-100 pl-2 lg:mb-0 mb-6`}
                type="text"
                value={address.country}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className='lg:text-center lg:pl-0 pl-6 mt-16 lg:w-full w-[350px]'>
          <button className='border border-1 border-black rounded-lg lg:w-[400px] w-[350px] text-center h-10 bg-green-800 font-bold text-white' type="submit">Add Entry</button>
        </div>
      </form>
      <Table entries={entries} deleteEntry={deleteEntry} editEntry={editEntry} />
    </div>
  );
};

export default Form;

