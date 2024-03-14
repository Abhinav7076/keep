// CreateNote.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CreateNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    subject: ''
  });

  const subjects = ['Economics', 'Geography', 'Polity']; // Example subjects

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submission logic here (e.g., API call)
    console.log(note);

    try {
        const response = await fetch('https://keep-production.up.railway.app/keep', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log('Note created:', jsonResponse);
          // Handle success - maybe clear form or give user feedback
        } else {
          // Handle HTTP errors
          console.error('Failed to create note', response);
        }
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
      }

      
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px' }}>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        value={note.title}
        onChange={handleChange}
      />
      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={4}
        name="content"
        value={note.content}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel>Subject</InputLabel>
        <Select
          value={note.subject}
          label="Subject"
          onChange={handleChange}
          name="subject"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subjects.map((subject, index) => (
            <MenuItem key={index} value={subject}>{subject}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Create Note
      </Button>
    </form>
  );
};

export default CreateNote;
