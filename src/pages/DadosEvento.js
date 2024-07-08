import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import EventInfo from '../components/EventInfo';
import AnaisInfo from '../components/AnaisInfo';
import EventStatistics from '../components/EventStatistics';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DadosEvento() {
  const {event_id} = useParams();

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <a href="/eventos" style={{display:"flex", marginBottom: "5%"}}>
          <ArrowBackIcon/> 
          <Typography>Voltar</Typography>
      </a>
      <EventInfo event_id={event_id}/>
      <AnaisInfo event_id={event_id}/>
      <EventStatistics event_id={event_id}/>
    </Container>
  );
};

export default DadosEvento;