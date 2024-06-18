import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Alert, CircularProgress, Box } from '@mui/material';

const EventDetail = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPapers, setShowPapers] = useState(false);
  const [open, setOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/papers');
      setPapers(response.data.papers);
      setLoading(false);
      setShowPapers(true);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

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

    try {
      const response = await api.post('/{event_id}', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Importação bem-sucedida:', response.data);
      fetchPapers(); 
      handleClose();
    } catch (error) {
      console.error('Erro ao importar os trabalhos:', error);
      setError('Erro ao importar trabalhos. Por favor, verifique os arquivos e tente novamente.');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div" align="center" fontSize={'40px'} style={{ padding: '20px' }}>
        Listagem de Artigos
      </Typography>
      <TableContainer component={Paper}>
        {loading && <CircularProgress />}
        {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
        {showPapers && !loading && !error && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Autores</TableCell>
                  <TableCell>Área</TableCell>
                  <TableCell>Ignorar</TableCell>
                  <TableCell>Total de Páginas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(papers) && papers.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>{paper.id}</TableCell>
                    <TableCell>{paper.title}</TableCell>
                    <TableCell>{paper.authors}</TableCell>
                    <TableCell>{paper.area}</TableCell>
                    <TableCell>{paper.is_ignored ? "Sim" : "Não"}</TableCell>
                    <TableCell>{paper.total_pages}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {papers.length > 0 && papers[0].event && (
              <Box display="flex" justifyContent="center" style={{ margin: '16px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={`https://s3.amazonaws.com/${papers[0].event.s3_folder_name}/${papers[0].event.anal_filename}`}
                  target="_blank"
                >
                  Gerar Anais
                </Button>
              </Box>
            )}
          </>
        )}
      </TableContainer>

      <Box display="flex" flexDirection="column" alignItems="center" style={{ marginTop: '64px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          style={{ marginBottom: '20px' }}
        >
          Importar Trabalhos em Lote
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchPapers}
        >
          Carregar Anais
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
    </Box>
  );
};

export default EventDetail;
