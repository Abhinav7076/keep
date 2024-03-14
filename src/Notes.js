import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Note = ({ title, subject, content }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p" style={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Note;
