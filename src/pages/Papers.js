import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Alert, CircularProgress, Box } from '@mui/material';

function Papers () {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPapers, setShowPapers] = useState(false);

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
      <Button
                variant="contained"
                color="primary"
                onClick={fetchPapers}
            >
            Carregar Anais
            </Button>
    </Box>
  );
};

export default Papers;
