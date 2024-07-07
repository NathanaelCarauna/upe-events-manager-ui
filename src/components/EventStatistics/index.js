import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import api from '../../services/api';

const EventStatistics = ({ event_id }) => {
  const [estatisticas, setEstatisticas] = useState({
    artigosSubmetidos: 0,
    artigosAceitos: 0,
    artigosRejeitados: 0,
    organizadoresEvento: '',
    autoresAceitos: 0,
    artigosPorArea: '',
    totalPaginasAnais: 0,
    mediaPaginasPorArtigo: 0
  });

  useEffect(() => {
    const buscarEstatisticasEvento = async () => {
      try {
        const resposta = await api.get('/estatisticas-evento');
        const dadosEstatisticas = resposta.data;

        setEstatisticas({
          artigosSubmetidos: dadosEstatisticas.artigosSubmetidos,
          artigosAceitos: dadosEstatisticas.artigosAceitos,
          artigosRejeitados: dadosEstatisticas.artigosRejeitados,
          organizadoresEvento: dadosEstatisticas.organizadoresEvento,
          autoresAceitos: dadosEstatisticas.autoresAceitos,
          artigosPorArea: dadosEstatisticas.artigosPorArea,
          totalPaginasAnais: dadosEstatisticas.totalPaginasAnais,
          mediaPaginasPorArtigo: dadosEstatisticas.mediaPaginasPorArtigo
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas do evento:', error);
      }
    };

    buscarEstatisticasEvento();
  }, []);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" pb='16px'>Estatísticas do Evento</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Artigos Submetidos:</strong> {estatisticas.artigosSubmetidos}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Artigos Aceitos:</strong> {estatisticas.artigosAceitos}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Artigos Rejeitados:</strong> {estatisticas.artigosRejeitados}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Organizadores do Evento:</strong> {estatisticas.organizadoresEvento}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Autores Aceitos:</strong> {estatisticas.autoresAceitos}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Artigos por Área de Conhecimento:</strong> {estatisticas.artigosPorArea}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Total de Páginas dos Anais:</strong> {estatisticas.totalPaginasAnais}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Média de Páginas por Artigo:</strong> {estatisticas.mediaPaginasPorArtigo}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventStatistics;