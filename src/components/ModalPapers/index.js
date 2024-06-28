import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PapersList from '../PapersList';
import {Button,Box,TextField,Dialog,DialogTitle,IconButton,CircularProgress,Typography} from '@mui/material';

export default function ModalPapers(props) {
  const { event_id } = props;
  const [open, setOpen] = useState(false);
  const [event,setEvent] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  const fetchEvent = async () => {
    setLoading(true);
    try {
        const response = await api.get('/events/' + event_id);
        setEvent(response.data);
        setLoading(false);
    } catch (err) {
        setError(err);
        setLoading(false);
    }
  };

  useEffect (() => {
    fetchEvent();
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>Informações do evento</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Detalhes do evento
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        />
        {loading && <CircularProgress />}
        {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
        {!loading && !error && (
          <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                disabled
                label="Nome do evento"
                defaultValue={event.name}
              />
              <TextField
                disabled
                label="Promovido por"
                defaultValue={event.promoted_by}
              />
              <TextField
                disabled
                label="Data inicial"
                defaultValue={event.initial_date}
              />
              <TextField
                disabled
                label="Data final"
                defaultValue={event.final_date}
              />
            <PapersList event_id={event_id} eventModal={true} />
          </Box>
        )};
      </Dialog>
    </React.Fragment>
  );
}