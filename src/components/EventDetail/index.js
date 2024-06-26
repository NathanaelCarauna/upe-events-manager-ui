import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import PapersList from '../PapersList';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Alert, CircularProgress, Box } from '@mui/material';

const EventDetail = (props) => {
  const { event_id } = props;
  const [error,setError] = useState(null);
  const [event,setEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [init,setInit] = useState(false);
  const [eventError,setEventError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCsvFile(null);
    setZipFile(null);
    setError(null);
  };

  const handleCsvFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleZipFileChange = (event) => {
    setZipFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (!csvFile || !zipFile) {
      console.error('Ambos os arquivos CSV e ZIP são necessários.');
      setError('Ambos os arquivos CSV e ZIP são necessários.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('zipFile', zipFile);
    console.log(formData);

    try {
      const response = await api.post('/papers/'+event_id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Importação bem-sucedida:', response.data);
      handleClose();
    } catch (error) {
      console.error('Erro ao importar os trabalhos:', error);
      setError('Erro ao importar trabalhos. Por favor, verifique os arquivos e tente novamente.');
    }
  };

  const fetchEvent = async () => {
    try {
        const response = await api.get('/events/' + event_id);
        setEvent(response.data);
        setInit(true);
        console.log(response.data)
        console.log(eventError)
        console.log(init)
    } catch (err) {
        setEventError(err);
    }
  };

  useEffect (() => {
    fetchEvent();
  },[]);

  return (

    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <PapersList event_id={event_id} eventModal={true} />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          style={{ marginBottom: '20px' }}
        >
          Importar Trabalhos em Lote
        </Button>
      </Box>
      

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Importar Trabalhos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione os arquivos CSV e ZIP para importar os trabalhos em lote.
          </DialogContentText>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="dense"
            type="file"
            fullWidth
            onChange={handleCsvFileChange}
            helperText="Selecione o arquivo CSV"
            inputProps={{ accept: '.csv' }} // Filtra para arquivos CSV
          />
          <TextField
            margin="dense"
            type="file"
            fullWidth
            onChange={handleZipFileChange}
            helperText="Selecione o arquivo ZIP"
            inputProps={{ accept: '.zip' }} // Filtra para arquivos ZIP
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleImport} color="primary">
            Importar
          </Button>
        </DialogActions>
      </Dialog>
    </>


  );
};

export default EventDetail;
