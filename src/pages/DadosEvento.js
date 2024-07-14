import React,{ useState, useEffect } from 'react';
import { Box, Container, Typography,Grid,Paper } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DadosEvento() {
  const {event_id} = useParams();
  const [evento, setEvento] = useState({
    nome: '',
    organizador: '',
    dataInicio: '',
    dataFim: '',
    infoSumario: '',
    nomeAnais: '',
    arquivoMescladoAnais: '',
    resumo: ''
  });

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

  const [marcos, setMarcos] = useState('');
  const [diretorio, setDiretorio] = useState('');

  const fetchEvent = async () => {
    try {
      const event = await api.get('/events/' + event_id);

      /*Pendencias:

      NÃO TEMOS:
        diretório de arquivos do evento
        informação do sumário
        nome do anal do evento
        nome do arquivo de anal após merge de papers
        resumo
        marcos
        quantitativo de artigos submetidos
        quantitativo de artigos aceitos
        quantiativo de autores aceitos


      TEMOS MAS SERIA BOM TER EM UMA ROTA:
        quantitativo de artigos por area de conhecimento
        quantitativo de páginas do anal do evento
        quantitativo médio de páginas do anal dos artigos
      
        organizadores do evento (promoted_by?)

      */

      setEvento({
        nome: event.data.name,
        organizador: event.data.promoted_by,
        dataInicio: event.data.initial_date,
        dataFim: event.data.final_date,
      });

      /* Melhorias futuras
      const dadosEstatisticas = await api.get('/estatisticas-evento');
      const respostaMarcos = await api.get('/events/marcos'); 
      const diretorio = await api.get('/diretorio');
      setMarcos(respostaMarcos.data);
      setDiretorio(diretorio.data.diretorio);
      setEstatisticas({
        artigosSubmetidos: dadosEstatisticas.data.artigosSubmetidos,
        artigosAceitos: dadosEstatisticas.data.artigosAceitos,
        artigosRejeitados: dadosEstatisticas.data.artigosRejeitados,
        organizadoresEvento: dadosEstatisticas.data.organizadoresEvento,
        autoresAceitos: dadosEstatisticas.data.autoresAceitos,
        artigosPorArea: dadosEstatisticas.data.artigosPorArea,
        totalPaginasAnais: dadosEstatisticas.data.totalPaginasAnais,
        mediaPaginasPorArtigo: dadosEstatisticas.data.mediaPaginasPorArtigo
      });
      */
    } catch (error) {
      console.error('Erro ao carregar informações do evento:', error);
    }
  };


  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <a href="/eventos" style={{display:"flex", justifyContent:"start",marginBottom: "2%"}}>
          <ArrowBackIcon/> 
          <Typography>Voltar</Typography>
      </a>
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
            <Typography variant="body1">{evento.resumo}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" pb='16px'>Informações dos Anais</Typography>
        <Typography variant="h6">Diretório de Arquivos do Evento (Somente Admin)</Typography>
        <Typography variant="body1">{diretorio}</Typography>
        <Typography variant="body1"><strong>Sumário</strong> {evento.infoSumario}</Typography>
        <Typography variant="body1"><strong>Nome:</strong> {evento.nomeAnais}</Typography>
        <Typography variant="body1"><strong>Nome do Arquivo de Anais após mescla de Artigos:</strong> {evento.arquivoMescladoAnais}</Typography>
      </Paper>

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
    </Container>
  );
};

export default DadosEvento;