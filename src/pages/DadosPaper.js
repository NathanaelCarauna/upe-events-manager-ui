import React,{ useState, useEffect } from 'react';
import { Box, Container, Typography,Grid,Paper } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DadosPaper() {
  const{paper_id} = useParams();
  const [evento, setEvento] = useState({
    nome: '',
    organizador: '',
    dataInicio: '',
    dataFim: '',
  });

  const [artigo, setArtigo] = useState({
    titulo: '',
    autores: '',
    resumo: '',
    anoDePublicacao: '',
    downloadLink: '',
    area: '',
    totalPaginas: 0
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

  const [resumo, setResumo] = useState('');

  const fetchPaper = async () => {
    try {
        //ROTA QUEBRADA
        //const paper = await api.get('/papers/' + paper_id);
        //const event = await api.get('/events/' + paper.data.event_id);

        //console.log(paper)
        //console.log(event)

      /*Pendencias:

      NÃO TEMOS:
        resumo
        ano de publicação


      VAMOS TER ESSAS ESTATÍSTICAS?

      */

      /*

        setEvento({
            nome: event.data.name,
            organizador: event.data.promoted_by,
            dataInicio: event.data.initial_date,
            dataFim: event.data.final_date,
         });

        setArtigo({
            titulo: paper.data.title,
            autores: paper.data.authors,
            downloadLink: paper.data.pdf_download_link,
            area: paper.data.area,
            totalPaginas : paper.data.total_pages,
        });
        
    */

      /* Melhorias futuras
      const dadosEstatisticas = await api.get('/estatisticas-evento');
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
    fetchPaper();
  }, []);

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <a href="/eventos" style={{display:"flex", marginBottom: "5%"}}>
          <ArrowBackIcon/> 
          <Typography>Voltar</Typography>
      </a>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" pb='16px'>Informações do Artigo</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Título do Artigo:</strong> {artigo.titulo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Autores:</strong> {artigo.autores}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Área:</strong> {artigo.area}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Evento:</strong> {evento.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Ano de publicação:</strong> {artigo.anoDePublicacao}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Link para download:</strong> {artigo.downloadLink}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Total de páginas:</strong> {artigo.totalPaginas}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Resumo</Typography>
            <Typography variant="body1">{resumo}</Typography>
          </Grid>
        </Grid>
      </Paper>


      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" pb='16px'>Estatísticas do Paper</Typography>
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

export default DadosPaper;