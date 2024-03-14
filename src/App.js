// App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import NoteList from './NoteList'; // Import NoteList
import CreateNote from './CreateNote';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [selectedMenuOption, setSelectedMenuOption] = useState('Economics');
  const [selectedMenu2Option, setSelectedMenu2Option] = useState('All');
  const [searchText, setSearchText] = useState('');

  const handleMenuSelect = (option) => {
    setSelectedMenuOption(option);
  };

  const handleMenu2Select = (option) => {
    setSelectedMenu2Option(option);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <Router>
      <Navbar onMenuSelect={handleMenuSelect} onMenu2Select={handleMenu2Select} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<NoteList selectedOption={selectedMenuOption} selectedMenu2Option={selectedMenu2Option} searchText={searchText} />} /> {/* Use NoteList here */}
        <Route path="/create" element={<CreateNote />} />
        {/* Future routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
