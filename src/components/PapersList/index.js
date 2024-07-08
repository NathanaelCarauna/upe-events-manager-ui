import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Select, Button, TextField,
   CircularProgress, Box, TablePagination,TableSortLabel, MenuItem, Modal, InputAdornment, 
   Tab} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import styles from "./index.module.css";

function PapersList (props) {
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

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

  const clearParams = () => {
    setSearch(null);
    setArea(null);
    setEventId(null);
    setPage(1);
    setSortConfig({ key: 'id', direction: 'asc' });
  };


  const fetchPapers = async () => {
    setLoading(true);
    let event_id = null;
    if(props.eventModal){
      event_id = props.event_id;      
    }else{
      event_id = eventId;
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


useEffect (() => {
  fetchPapers();
},[page, sortConfig]);

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
            <Box component="form" sx={{ mb: 3, pb: 1 }}>
                <Grid container spacing={3} justifyContent="center" sx={{ pb: 1 ,position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1000,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,}}>
                  <Grid item lg={6} md={6} sm={12}>
                      <TextField
                              fullWidth
                              sx={{ backgroundColor: '#f0f0f0' }}
                              label="Busca"
                              variant="outlined"
                              InputLabelProps={{
                                  shrink: true
                              }}
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                          />
                    </Grid>
                      {
                        !props.eventModal && 
                        <Grid item lg={3} md={3} sm={6}>
                          <Select
                          sx={{ backgroundColor: '#f0f0f0' }}
                          variant="outlined"
                          fullWidth
                          defaultValue=""
                          value={eventId}
                          displayEmpty
                          onChange={(e) => setEventId(e.target.value)}
                          onOpen={fetchEvents}
                      >
                          <MenuItem value=""><em>Selecione um evento</em></MenuItem>
                          {events.map((event) => (
                            <MenuItem value={event.id} key={event.id}>
                              {event.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      }
                  <Grid item lg={props.eventModal? 6 : 3} md={props.eventModal? 6 : 3} sm={props.eventModal? 12 : 6}>
                    <Select
                        defaultValue=""
                        value={area}
                        variant="outlined"
                        fullWidth
                        sx={{ backgroundColor: '#f0f0f0' }}
                        onChange={(e) => setArea(e.target.value)}
                        onOpen={fetchAreas}
                      >
                        <MenuItem value=""><em>Selecione uma área</em></MenuItem>
                        {areas.map((area) => (
                          <MenuItem value={area} key={area}>
                            {area}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} container justifyContent="center" alignItems="center">
                    <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '95%',
                                height: '85%',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#0c78f3',
                                },
                            }}
                            onClick={fetchPapers}
                    >
                            Filtrar
                    </Button>
                 </Grid>
                <Grid item lg={6} md={6} sm={6} container justifyContent="center" alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                                width: '95%',
                                height: '85%',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#0c78f3',
                                },
                            }}
                        onClick={clearParams}
                    >
                        Limpar Filtros
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} container justifyContent="center" alignItems="center">
                                    <TableSortLabel
                                            active={sortConfig.key === 'id'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSortRequest('id')}
                                        >
                                        ID
                                        </TableSortLabel>
                                    <TableSortLabel
                                            active={sortConfig.key === 'title'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSortRequest('title')}
                                        >
                                        Título
                                        </TableSortLabel>
                                    <TableSortLabel
                                            active={sortConfig.key === 'authors'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSortRequest('authors')}
                                        >
                                        Autores
                                        </TableSortLabel>
                                    <TableSortLabel
                                            active={sortConfig.key === 'area'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSortRequest('area')}
                                        >
                                        Área
                                    </TableSortLabel>
                                    <TableSortLabel
                                            active={sortConfig.key === 'total_pages'}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSortRequest('total_pages')}
                                        >
                                        Total de Páginas
                                    </TableSortLabel>
                        </Grid>

                </Grid>
            </Box></Modal>
            <TableContainer component={Box} sx={{ borderRadius: '8px'}}>
                {loading && <CircularProgress />}
                {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                {!loading && !error && (
                    <Table>
                        <TableBody>
                            {Array.isArray(papers) && papers.map((paper) => (
                                <StyledTableRow key={paper.id}>
                                    <TableCell style={{ width: "5%", textAlign: 'center'}}><EditIcon/></TableCell>
                                    <TableCell style={{ width: "20%" }}>
                                      <Typography variant="h6">
                                        Evento:
                                      </Typography>
                                      <Typography>
                                        Evento Teste
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "25%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Área:
                                      </Typography>
                                      <Typography>
                                        {paper.area}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "22%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Título
                                      </Typography>
                                      <Typography>
                                        {paper.title}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "22%", textAlign: 'left' }}>
                                      <Typography variant="h6">
                                        Autor principal:
                                      </Typography>
                                      <Typography>
                                        {paper.authors}
                                      </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "3%", textAlign: 'center'}}><VisibilityIcon/></TableCell>
                                    <TableCell style={{ width: "3%", textAlign: 'center'}}><PrintIcon/></TableCell>
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