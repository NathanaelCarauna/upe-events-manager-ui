import React,{ useState, useEffect } from 'react';
import { Container, Typography,Grid,Accordion,AccordionDetails,AccordionSummary } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DadosPaper() {
  const{paper_id} = useParams();
  const [evento, setEvento] = useState({
    nome: 'Evento',
    organizador: 'Universidade de Pernambuco',
    dataInicio: '04/05/2024',
    dataFim: '07/05/2024',
  });

  const [artigo, setArtigo] = useState({
    titulo: 'Artigo',
    autores: 'Autor',
    resumo: 'Resumo do artigo',
    anoDePublicacao: '2024',
    downloadLink: 'www.downloadlink.com/artigo',
    area: 'Área',
    totalPaginas: 10
  });

  const [estatisticas, setEstatisticas] = useState({
    artigosSubmetidos: 1,
    artigosAceitos: 1,
    artigosRejeitados: 0,
    organizadoresEvento: 'Organizadores',
    autoresAceitos: 1,
    artigosPorArea: '1',
    totalPaginasAnais: 11,
    mediaPaginasPorArtigo: 10
  });

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
      <a href="/papers" style={{display:"flex", justifyContent:"start",marginBottom: "2%"}}>
          <ArrowBackIcon/> 
          <Typography>Voltar</Typography>
      </a>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h5">Informações do paper</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
              <Typography variant="body1">{artigo.resumo}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h5">Estatísticas do Paper</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default DadosPaper;