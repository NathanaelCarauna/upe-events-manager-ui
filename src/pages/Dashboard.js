import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Grid } from '@mui/material';
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ErrorService from "../services/errorService";
import Graph from '../components/DashboardGraph';
import DashboardComponents from '../components/DashboardComponents';
import api from '../services/api';

function Dashboard() {
  // Teste provisório
  const [data, setData] = useState({
    totalTrabalhos: 0,
    totalInscritos: 0,
    totalOuvintes: 0
  });

  const handleSomeAction = async () => {
    const error = {
      response: {
        status: 500,
        data: {
          message: "Erro interno do servidor",
        },
      },
    };
    ErrorService.handleError(error);
  };

  return (
    <Box sx={{ pt: 2, pb: 2, pl: 5, pr: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <a href="/eventos">
            <Button variant="contained" color="primary">
              <EventIcon />
              <p>Eventos</p>
            </Button>
          </a>
        </Grid>
        <Grid item>
          <a href="/papers">
            <Button variant="contained" color="secondary">
              <FormatListNumberedIcon />
              <p>Papers</p>
            </Button>
          </a>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleSomeAction}>
            Clique para acionar erro
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <DashboardComponents data={data} />
      </Box>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Graph />
      </Box>
    </Box>
  );
};

export default Dashboard;
