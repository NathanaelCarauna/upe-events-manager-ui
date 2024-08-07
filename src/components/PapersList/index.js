import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Select, Button, TextField,
   CircularProgress, Box, Tooltip,TableSortLabel, MenuItem, Modal, InputAdornment, 
   Tab} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import styles from "./index.module.css";
import Divider from '@mui/material/Divider';
import FiltrosAplicados from '../FiltrosAplicados';

function PapersList ({evento_id,paperDetail}) {
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState(null);
  const [area,setArea] = useState(null);
  const [eventId,setEventId] = useState(null);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [open, setOpen] = React.useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#D9D9D9',
    },
  }));

const paperDetailURL = (id) => {
    return "dados-paper/" + id;
};

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita o comportamento padrão do Enter
      fetchPapers();
    }
  };

  const fetchPapers = async () => {
    setLoading(true);
    let event_id = null;
    if(paperDetail){
      event_id = evento_id;      
    }else{
      event_id = eventId;
    }
    if (search || eventId || area){
      setFiltrosAplicados(true);
    } else{
        setFiltrosAplicados(false);
    }
    api.get('/papers',{ 
      params: {
        search,
        area,
        event_id,
        sort_by: sortConfig.key,
        sort_direction: sortConfig.direction,
        page: page,
        page_size: 10,
      }
    }).then((response) => {
      setPapers(response.data.papers);
      setLoading(false);
      console.log(response.data.papers)
      setTotalPages(response.data.total_pages);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    })
};


const fetchEvents = async () => {
  try {
      const response = await api.get('/events');
      setEvents(response.data.events);
  } catch (err) {
      setError(err);
  }
};

const fetchAreas = async () => {
  try {
      const response = await api.get('/papers/areas');
      setAreas(response.data.areas);
  } catch (err) {
      setError(err);
  }
};

const makeFilters = () => {
  console.log("teste foi aqui")
  return [
      { label: 'Pesquisa', value: search, key: 'search' },
      { label: 'Area', value: area, key: 'area' },
      { label: 'Evento', value: eventId, key: 'eventId' },
  ];
};

const clearSpecificFilter = (filterKey) => {
  switch (filterKey) {
      case 'search':
        setSearch('');
        setPage(1);
        setSortConfig({ key: 'id', direction: 'asc' });
        break;
      case 'area':
        setArea('');
        setPage(1);
        setSortConfig({ key: 'id', direction: 'asc' });
        break;
      case 'eventId':
        setEventId(null);
        setPage(1);
        setSortConfig({ key: 'id', direction: 'asc' });
          break;
      default:
          break;
  }
}


useEffect (() => {
  fetchPapers();
},[page, sortConfig,eventId,area,search]);

  const handleSortRequest = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
      }
      setSortConfig({ key, direction });
      setPage(1);
  };

  return (
        <Box sx={{ pt: 5, pb: 2, pl: 10, pr: 10 }}>
          {!paperDetail && 
          <Box component="form" sx={{ mb: 3, pb: 1 }}>
                <Grid container spacing={3} justifyContent="center" sx={{ pb: 1}}>
                  <Grid item xs={12} sm={6} md={11.3} sx={{pl: 2}}>
                    <TextField
                                  fullWidth
                                  placeholder="Pesquisar..."
                                  sx={{
                                      backgroundColor: '#D9D9D9',
                                      borderRadius: '20px',
                                      boxShadow: 5,
                                      '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '& input': {
                                            '&::placeholder': {
                                                color: '#4A4747',
                                                opacity: 1,
                                            },
                                        },
                                    },
                                  }}
                                  variant="outlined"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <SearchIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                  onKeyDown={handleKeyDown}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6} md={0.5} container justifyContent="center" alignItems="center">
                    <Button
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: 'auto',
                                boxShadow: 5,
                                backgroundColor: '#D9D9D9',
                                '&:hover': {
                                    backgroundColor: '#BFBFBF',
                                },
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '8px',
                            }}
                            onClick={handleOpen}
                        >
                            <FilterAltIcon sx={{ color: '#1C3C78' }} />
                        </Button>
                 </Grid>
                </Grid>
          </Box>        
          }
          {filtrosAplicados && !paperDetail && (
            <FiltrosAplicados
                filters={makeFilters}
                clearFilters={clearSpecificFilter}
            />
          )} 
          <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
            <Box
            component="form"
            sx={{
                mb: 3,
                pb: 1,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1000,
                bgcolor: '#D9D9D9',
                border: '2px solid #323232',
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
                borderRadius: 5,
            }}
        >
            <Typography variant="h6" sx={{ color: '#1C3C78', pb: 2 }}>
                Filtros
            </Typography>
            <Divider sx={{ mb: 2, bgcolor: '#1C3C78' }} />

            <Grid container spacing={3} justifyContent="center" sx={{ pb: 2 }}>
                <Grid item lg={6} md={6} sm={6}>
                  <Select
                  sx={{ backgroundColor: '#D9D9D9' }}
                  variant="outlined"
                  fullWidth
                  defaultValue=""
                  value={eventId}
                  displayEmpty
                  onChange={(e) => setEventId(e.target.value)}
                  onOpen={fetchEvents}
                  label="Evento"
              >
                  {events.map((event) => (
                    <MenuItem value={event.id} key={event.id}>
                      {event.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item lg={6} md={6} sm={6}>
                <Select
                    defaultValue=""
                    value={area}
                    variant="outlined"
                    fullWidth
                    sx={{ backgroundColor: '#D9D9D9' }}
                    onChange={(e) => setArea(e.target.value)}
                    onOpen={fetchAreas}
                    label="Área"
                  >
                    {areas.map((area) => (
                      <MenuItem value={area} key={area}>
                        {area}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center" sx={{ pb: 1 }}>
                <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                    <TableSortLabel
                        active={sortConfig.key === 'title'}
                        direction={sortConfig.direction}
                        onClick={() => handleSortRequest('title')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Título
                    </TableSortLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                    <TableSortLabel
                        active={sortConfig.key === 'authors'}
                        direction={sortConfig.direction}
                        onClick={() => handleSortRequest('authors')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Autores
                    </TableSortLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                    <TableSortLabel
                        active={sortConfig.key === 'area'}
                        direction={sortConfig.direction}
                        onClick={() => handleSortRequest('area')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Área
                    </TableSortLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                    <TableSortLabel
                        active={sortConfig.key === 'total_pages'}
                        direction={sortConfig.direction}
                        onClick={() => handleSortRequest('total_pages')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Páginas
                    </TableSortLabel>
                </Grid>
              </Grid>
            </Box>
            </Modal>
            <TableContainer component={Box} sx={{ borderRadius: '8px'}}>
                {loading && <CircularProgress />}
                {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                {!loading && !error && (
                    <Table sx = {{borderCollapse: 'separate', borderSpacing: '0px 15px'}}>
                        <TableBody>
                            {Array.isArray(papers) && papers.map((paper) => (
                                <StyledTableRow key={paper.id} sx = {{backgroundColor: '#EDEDED'}}>
                                    <TableCell style={{ width: "5%", textAlign: 'center'}}>
                                      <Tooltip title="Editar artigo" arrow>
                                        <a href="#">
                                          <EditIcon/>
                                        </a>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell style={{ width: "20%" }}>
                                      <Typography variant="h6" className= {styles.textStyle}>
                                        Título
                                      </Typography>
                                      <Typography>
                                        {paper.title}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "25%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Autor principal:
                                      </Typography>
                                      <Typography>
                                        {paper.authors}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "22%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Evento:
                                      </Typography>
                                      <Typography>
                                        {paper.event_name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "20%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Área:
                                      </Typography>
                                      <Typography>
                                        {paper.area}
                                      </Typography>
                                    </TableCell>
                                    {!paperDetail &&
                                    <TableCell style={{ width: "3%", textAlign: 'center'}}>
                                      <Tooltip title="Informações do artigo" arrow>
                                        <a href={paperDetailURL(paper.id)}>
                                          <VisibilityIcon/>
                                        </a>
                                      </Tooltip>
                                    </TableCell>
                                    }
                                    <TableCell style={{ width: "3%", textAlign: 'center'}}>
                                      <Tooltip title="Baixar artigo" arrow>
                                        <a href={paper.pdf_download_link} target="_blank" rel="noopener noreferrer" download>
                                          <DownloadIcon/>
                                        </a>
                                      </Tooltip>
                                    </TableCell>
                                  </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Stack spacing={2} sx={{ pt: 5, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                    <Pagination
                        variant="outlined"
                        siblingCount={1} 
                        boundaryCount={1}
                        color="secondary"
                        page={page}
                        count={totalPages}
                        onChange={handleChangePage}
                        shape='rounded'
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: '#253555',
                                backgroundColor: '#D9D9D9',
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#253555 !important',
                                color: '#FFFFFF !important',
                            },
                            '& .MuiPaginationItem-page': {
                                '&:hover': {
                                    backgroundColor: '#253555',
                                    color: '#FFFFFF',
                                }
                            },
                            pt: 2,
                            pr: 1,
                        }}
                    />
                    <Select
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'select page' }}
                        sx={{
                            height: '36px',
                            backgroundColor: '#D9D9D9',
                        }}
                    >
                        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                            <MenuItem key={pageNumber} value={pageNumber + 1}>
                                {pageNumber + 1}/ página
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
    </Box>
  );
};

export default PapersList;