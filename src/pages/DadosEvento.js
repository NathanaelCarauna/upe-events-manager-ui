import React from 'react';
import { Box, Container } from '@mui/material';
import EventInfo from '../components/EventInfo';
import AnaisInfo from '../components/AnaisInfo';
import EventStatistics from '../components/EventStatistics';
import { useParams } from 'react-router-dom';

function DadosEvento() {
  const {event_id} = useParams();

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <EventInfo event_id={event_id}/>
      <AnaisInfo event_id={event_id}/>
      <EventStatistics event_id={event_id}/>
    </Container>
  );
};

export default DadosEvento;