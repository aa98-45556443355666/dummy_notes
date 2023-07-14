import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('https://api.gyanibooks.com/library/get_dummy_notes/')
      .then((res) => {
        setNotes(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, []);



  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Notes
      </Typography>
      <Grid container spacing={2}>
        {notes.map((note) => {
          // const innerNotes = JSON.parse(note.notes || "{}");

          const date = note.date_created;
          const dateObj = new Date(date);
          const year = dateObj.getFullYear();
          const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
          const day = dateObj.getDate().toString().padStart(2, '0');
          const hours = dateObj.getHours().toString().padStart(2, '0');
          const minutes = dateObj.getMinutes().toString().padStart(2, '0');
          const seconds = dateObj.getSeconds().toString().padStart(2, '0');

          const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return (
            <Grid item xs={12} key={note.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {note.title.toUpperCase()}
                  </Typography>
                  <Typography variant="subtitle1">
                    ID: {note.id}
                  </Typography>
                  <Typography variant="subtitle1">
                    User: {note.user}
                  </Typography>
                  <Typography variant="subtitle1">
                    UUID: {note.uuid}
                  </Typography>
                  <Typography variant="subtitle1">
                    Category: {note.category}
                  </Typography>
                  <Typography variant='subtitle1'>
                    Notes: {note.notes}
                  </Typography>
                  <Typography variant='subtitle2'>
                    Date Created: {readableDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
