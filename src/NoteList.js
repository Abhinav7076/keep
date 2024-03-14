// NoteList.js
import React, { useEffect, useState } from 'react';
import Notes from './Notes'; // Assuming you have a Note component
import { Stack } from '@mui/material';

const NoteList = ({ selectedOption, selectedMenu2Option, searchText }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Placeholder: Replace with your actual API URL
      if(searchText.length > 0){
        console.log("as")
        var response = await fetch('https://keep-production.up.railway.app/keep/search/'+selectedOption.toLowerCase()+'/'+searchText);
      }
      else {
        if(selectedMenu2Option === 'All'){
            console.log("all")
            var response = await fetch('https://keep-production.up.railway.app/keep/'+selectedOption.toLowerCase())    
        }
        else {
            console.log("A")
            var response = await fetch('https://keep-production.up.railway.app/keep/'+selectedOption.toLowerCase()+'/'+selectedMenu2Option)
        }
      }
      const data = await response.json();
        console.log(data)
        setNotes(data);
    };
    console.log(selectedOption, selectedMenu2Option, searchText)

    fetchData(selectedOption, selectedMenu2Option, searchText);
  }, [selectedOption, selectedMenu2Option, searchText]);

  return (
    <Stack container spacing={2}>
      {notes.map((note) => (
        <Stack item key={note.id} xs={12} md={6} lg={4}>
          <Notes title={note.title} subject={note.subject} content={note.content} />
        </Stack>
      ))}
    </Stack>
  );
};

export default NoteList;
