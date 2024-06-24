import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, Button, TextField,
   CircularProgress, TablePagination,MenuItem} from '@mui/material';

function Papers () {
  const [papers, setPapers] = useState([]);
  const [events, setEvents] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPapers, setShowPapers] = useState(false);
  const [search,setSearch] = useState(null);
  const [area,setArea] = useState(null);
  const [eventId,setEventId] = useState(null);
  const [page,setPage] = useState(0);
  const [rowsPerPage,setRowsPerPage] = useState(10);
  const [papersCount,setPapersCount] = useState(0);

  const handleSelectEventChange = (event) => {
    setEventId(event.target.value);
  };

  const handleSelectAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  }

  const handleSearch = () => {
    const filters = {};

    filters.page = page + 1;
    filters.page_size = rowsPerPage;

    if (eventId) filters.event_id = eventId;
    if (area) filters.area = area;
    if (search) filters.search = search;

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
    setLoading(true);
    setLoading(true);
    api.get('/papers',{ params: filters}).then((response) => {
      setPapers(response.data.papers);
      setLoading(false);
      setShowPapers(true);
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
    filters.page = 1;
    filters.page_size = rowsPerPage;
    fetchPapers(filters);
    setPapersCount(papers.length || 0);
  },[,rowsPerPage,page]);


  return (
    <Paper sx={{width: '90%', marginLeft:'5%', marginTop:'5%'}}>
      <Typography variant="h6" gutterBottom component="div" align="center" fontSize={'40px'} style={{ padding: '20px' }}>
        Listagem de Artigos
      </Typography>
      <Select
          defaultValue=""
          value={eventId}
          label="Evento"
          onChange={handleSelectEventChange}
          onOpen={fetchEvents}
        >
          {events.map((event) => (
            <MenuItem value={event.id} key={event.id}>
              {event.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          defaultValue=""
          value={area}
          label="Area"
          onChange={handleSelectAreaChange}
          onOpen={fetchAreas}
        >
          {areas.map((area) => (
            <MenuItem value={area} key={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
        <TextField
            label="Busca"
            defaultValue=""
            variant="outlined"
            InputLabelProps={{ 
              shrink: true
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Filtrar</Button>
        <Button onClick={clearParams}>Limpar filtros</Button>
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
                    <TableCell>{paper.total_pages}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
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
    </Paper>
  );
};

export default Papers;

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, CircularProgress, Box, TableSortLabel } from '@mui/material';

function Papers() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [showPapers, setShowPapers] = useState(false);

    const fetchPapers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/papers', {
                params: {
                    sort_by: sortConfig.key,
                    sort_direction: sortConfig.direction
                }
            });
            console.log(response)
            setPapers(response.data.papers);
            setLoading(false);
            setShowPapers(true);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPapers();
    }, [sortConfig]); // Load papers on initial render

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
    }, [papers, sortConfig]);

    const handleSortRequest = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom component="div" align="center" fontSize={'40px'} style={{ padding: '20px' }}>
                Listagem de Artigos
            </Typography>
            <TableContainer component={Paper}>
                {loading && <Box display="flex" justifyContent="center" padding="20px"><CircularProgress /></Box>}
                {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                {showPapers && !loading && !error && (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {['id', 'title', 'authors', 'area', 'is_ignored', 'total_pages', 'event_id'].map((column) => (
                                        <TableCell key={column}>
                                            <TableSortLabel
                                                active={sortConfig.key === column}
                                                direction={sortConfig.direction}
                                                onClick={() => handleSortRequest(column)}
                                            >
                                                {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(sortedPapers) && sortedPapers.map((paper) => (
                                    <TableRow key={paper.id}>
                                        <TableCell>{paper.id}</TableCell>
                                        <TableCell>{paper.title}</TableCell>
                                        <TableCell>{paper.authors}</TableCell>
                                        <TableCell>{paper.area}</TableCell>
                                        <TableCell>{paper.is_ignored ? "Sim" : "Não"}</TableCell>
                                        <TableCell>{paper.total_pages}</TableCell>
                                        <TableCell>{paper.event_id}</TableCell>
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
            <Box display="flex" justifyContent="center" style={{ margin: '16px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { setShowPapers(true); fetchPapers(); }}
                >
                    Carregar Anais
                </Button>
            </Box>
        </Box>
    );
}

export default Papers;

