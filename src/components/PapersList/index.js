import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Select, Button, TextField,
   CircularProgress, Box, TablePagination,TableSortLabel, MenuItem } from '@mui/material';

function PapersList (props) {
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search,setSearch] = useState(null);
  const [area,setArea] = useState(null);
  const [eventId,setEventId] = useState(null);
  const [page,setPage] = useState(0);
  const [rowsPerPage,setRowsPerPage] = useState(10);
  const [papersCount,setPapersCount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const handleRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  }

  const handleSearch = () => {
    const filters = {};

    filters.page = 1;
    filters.page_size = rowsPerPage;

    if (eventId) filters.event_id = eventId;
    if (area) filters.area = area;
    if (search) filters.search = search;

    if(props.eventModal) filters.event_id = props.event_id;

    fetchPapers(filters);
};

const clearParams = () => {
  setSearch(null);
  setArea(null);
  setEventId(null);

  const filters = {};
  filters.page = 1;
  filters.page_size = rowsPerPage;

  fetchPapers(filters);
};


  const fetchPapers = async (filters = {}) => {
    console.log(filters);
    setLoading(true);
    api.get('/papers',{ 
      params: {
        ...filters,
        sort_by: sortConfig.key,
        sort_direction: sortConfig.direction
      }
    }).then((response) => {
      setPapers(response.data.papers);
      setLoading(false);
      setPapersCount(response.data.total_papers)
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
  const filters = {};
  filters.page = page + 1;
  filters.page_size = rowsPerPage;
  if(props.eventModal) filters.event_id = props.event_id;
  fetchPapers(filters);
},[page]);


  useEffect (() => {  
    console.log("useEffect");
    const filters = {};
    filters.page = 1;
    filters.page_size = rowsPerPage;
    if(props.eventModal) filters.event_id = props.event_id;
    fetchPapers(filters);
  },[rowsPerPage]);

  useEffect (() => {  
    console.log("useEffect");
    const filters = {};

    filters.page = page + 1;
    filters.page_size = rowsPerPage;

    if(props.eventModal) filters.event_id = props.event_id;

    if (eventId) filters.event_id = eventId;
    if (area) filters.area = area;
    if (search) filters.search = search;
    fetchPapers(filters);
  },[sortConfig]);

  const sortedPapers = React.useMemo(() => {
    let sortablePapers = [...papers];
    if (sortConfig !== null) {
        sortablePapers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    return sortablePapers;
  }, [,rowsPerPage, papers, sortConfig]);

  const handleSortRequest = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
      }
      setSortConfig({ key, direction });
  };

  return (
        <Box sx={{ pt: 5, pb: 2, pl: 10, pr: 10 }}>
          <Box sx={{ backgroundColor: '#fff', borderRadius: '20px', p: 3, mb: 3 }}>
            <Box component="form" sx={{ mb: 3, pb: 1 }}>
                <Grid container spacing={3} justifyContent="center" sx={{ pb: 1 }}>
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
                            onClick={handleSearch}
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
                </Grid>
            </Box>
            <TableContainer component={Box} sx={{ borderRadius: '8px', border: '1px solid #CFCECE' }}>
                {loading && <CircularProgress />}
                {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                {!loading && !error && (
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                                <TableCell style={{ borderRight: '1px solid #CFCECE', width: '10%', fontWeight: 'bold', paddingLeft: '20px' }}>
                                <TableSortLabel
                                      active={sortConfig.key === "id"}
                                      direction={sortConfig.direction}
                                      onClick={() => handleSortRequest("id")}
                                >
                                      ID
                                </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid #CFCECE', width: '30%', textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortConfig.key === "title"}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSortRequest("title")}
                                >
                                    Título
                                </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid #CFCECE', width: '30%', textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortConfig.key === "authors"}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSortRequest("authors")}
                                >
                                    Autores
                                </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortConfig.key === "area"}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSortRequest("area")}
                                >
                                    Área
                                </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortConfig.key === "total_pages"}
                                    direction={sortConfig.direction}
                                    onClick={() => handleSortRequest("total_pages")}
                                >
                                    Total de Páginas
                                </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(sortedPapers) && sortedPapers.map((paper) => (
                                <TableRow key={paper.id}>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', paddingLeft: '20px' }}>{paper.id}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{paper.title}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{paper.authors}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{paper.area}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{paper.total_pages}</TableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <TablePagination
              page={page}
              rowsPerPage={rowsPerPage}
              component="div"
              onPageChange={handleChangePage}
              count={papersCount}
              labelRowsPerPage="Colunas por página:"
              rowsPerPageOptions={[5,10,20]}
              onRowsPerPageChange={handleRowsPerPage}
              >
            </TablePagination>
        </Box>
    </Box>
  );
};

export default PapersList;