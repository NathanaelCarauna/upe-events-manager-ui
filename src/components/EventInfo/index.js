import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import api from '../../services/api';

const EventInfo = ({ event_id }) => {
  const [evento, setEvento] = useState({
    nome: '',
    organizador: '',
    dataInicio: '',
    dataFim: ''
  });
  const [marcos, setMarcos] = useState('');
  const [resumo, setResumo] = useState('');

  useEffect(() => {
    const buscarInformacoesEvento = async () => {
      try {
        const resposta = await api.get('/events/' + event_id);

        setEvento({
          nome: resposta.data.name,
          organizador: resposta.data.promoted_by,
          dataInicio: resposta.data.initial_date,
          dataFim: resposta.data.final_date
        });

        /* Melhorias futuras
        const respostaMarcos = await api.get('/events/marcos'); 
        const respostaResumo = await api.get('/events/resumo');
        setMarcos(respostaMarcos.data);
        setResumo(respostaResumo.data); 
        */
      } catch (error) {
        console.error('Erro ao carregar informações do evento:', error);
      }
    };

    buscarInformacoesEvento();
  }, []);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" pb='16px'>Informações do Evento</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Nome do Evento:</strong> {evento.nome}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Instituição Organizadora:</strong> {evento.organizador}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Data de Início:</strong> {evento.dataInicio.substring(0, 10)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Data de Fim:</strong> {evento.dataFim.substring(0, 10)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Marcos do Evento</Typography>
          <Typography variant="body1">{marcos}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Resumo</Typography>
          <Typography variant="body1">{resumo}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventInfo;