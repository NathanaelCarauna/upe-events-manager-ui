import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import api from '../../services/api';

const AnaisInfo = ({ event_id }) => {
  const [resumo, setResumo] = useState({
    infoSumario: '',
    nomeAnais: '',
    arquivoMescladoAnais: ''
  });
  const [diretorio, setDiretorio] = useState('');

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const respostaResumo = await api.get('/events/');
        const respostaDiretorio = await api.get('/diretorio');
  
        setResumo({
          infoSumario: respostaResumo.data.infoSumario,
          nomeAnais: respostaResumo.data.name,
          arquivoMescladoAnais: respostaResumo.data.arquivoMescladoAnais
        });
  
        setDiretorio(respostaDiretorio.data.diretorio);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    // Dados mockados
    setResumo({
      infoSumario: '',
      nomeAnais: 'A ARGUMENTAÇÃO E O FÓRUM DE DISCUSSÃO VIRTUAL: UMA QUESTÃO DE LETRAMENTO',
      arquivoMescladoAnais: 'A ARGUMENTAÇÃO E O FÓRUM DEDISCUSSÃO VIRTUAL: UMA QUESTÃO DE LETRAMENTO'
    });

    buscarDados();
  }, []);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" pb='16px'>Informações dos Anais</Typography>
      {/* <Typography variant="h6">Diretório de Arquivos do Evento (Somente Admin)</Typography> */}
      <Typography variant="body1">{diretorio}</Typography>
      <Typography variant="body1"><strong>Sumário</strong> {resumo.infoSumario}</Typography>
      <Typography variant="body1"><strong>Nome:</strong> {resumo.nomeAnais}</Typography>
      <Typography variant="body1"><strong>Nome do Arquivo de Anais Após Mescla de Artigos:</strong> {resumo.arquivoMescladoAnais}</Typography>
    </Paper>
  );
};

export default AnaisInfo;