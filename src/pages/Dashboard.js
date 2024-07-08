import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Grid } from '@mui/material';
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ErrorService from "../services/errorService";
import Graph from '../components/DashboardGraph';
import DashboardComponents from '../components/DashboardComponents';
import api from '../services/api';

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
    <Box sx={{ pt: 2, pb: 2, pl: 5, pr: 5 }}>
      <Box sx={{ mt: 5 }}>
        <DashboardComponents/>
      </Box>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Graph />
      </Box>
    </Box>
  );
};

export default Dashboard;
