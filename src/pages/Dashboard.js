import React from 'react';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ErrorService from "../services/errorService";
import Graph from '../components/DashboardGraph';
import { Box } from '@mui/material';

function Dashboard() {

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
    <>
    <Box sx={{ pt: 2, pb: 2, pl: 5, pr: 5 }}>
      <a href="/eventos">
          <Button>
            <Paper square={false}>
              <EventIcon />
              <p>Eventos</p>
            </Paper>
          </Button>
        </a>

        <a href="/papers">
          <Button>
            <Paper square={false}>
              <FormatListNumberedIcon />
              <p>Papers</p>
            </Paper>
          </Button>
        </a>

        <button onClick={handleSomeAction}>Clique para acionar erro</button>
        
        <Graph/>
    </Box>
    </>
  );
}

export default Dashboard;
