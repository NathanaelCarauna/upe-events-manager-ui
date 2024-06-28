import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Select, Button, TextField,
    CircularProgress, Box, TablePagination,TableSortLabel, MenuItem } from '@mui/material';
import ModalPapers from '../components/ModalPapers';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    const [nome, setNome] = useState(null);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [promovidoPor, setPromovidoPor] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [eventsCount, setEventsCount] = useState(0);

    const handleRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const fetchEvents = async () => {
        setLoading(true);
        var initial_date = null;
        var final_date = null;
        if (dataInicio) initial_date = formatar_backend(dataInicio);
        if (dataFim) final_date = formatar_backend(dataFim);
        try {
            const response = await api.get('/events', {
                params: {
                    name: nome,
                    promoted_by: promovidoPor,
                    initial_date,
                    final_date,
                    page: page + 1,
                    page_size: rowsPerPage,
                    sort_by: sortConfig.key,
                    sort_direction: sortConfig.direction
                }
            });
            setEvents(response.data.events);
            setEventsCount(response.data.total_events);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const clearFields = () => {
        setNome(null);
        setPromovidoPor(null);
        setDataInicio(null);
        setDataFim(null);
        setPage(0);
        setSortConfig({ key: 'id', direction: 'asc' });
    };

    const formatar_backend = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchEvents();
    }, [sortConfig, page, rowsPerPage]);

    const requestSort = (key) => {
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
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                sx={{ backgroundColor: '#f0f0f0' }}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                sx={{ backgroundColor: '#f0f0f0' }}
                                label="Promovido Por"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={promovidoPor}
                                onChange={(e) => setPromovidoPor(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                sx={{ backgroundColor: '#f0f0f0' }}
                                label="Data de Início"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                sx={{ backgroundColor: '#f0f0f0' }}
                                label="Data de Fim"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} container justifyContent="center" alignItems="center">
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
                                onClick={fetchEvents}
                            >
                                Filtrar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} container justifyContent="center" alignItems="center">
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
                                onClick={clearFields}
                            >
                                Limpar Filtros
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '0.80rem' }}>
                        * Para filtrar por data, informe tanto a data de início como a de fim do evento *
                    </Typography>
                </Box>

                <TableContainer component={Box} sx={{ borderRadius: '8px', border: '1px solid #CFCECE' }}>
                    {loading && <CircularProgress />}
                    {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                    {!loading && !error && (
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '25%', fontWeight: 'bold', paddingLeft: '20px' }}>
                                    <TableSortLabel
                                            active={sortConfig.key === 'name'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('name')}
                                        >
                                        Nome
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '25%', textAlign: 'center', fontWeight: 'bold' }}>
                                    <TableSortLabel
                                            active={sortConfig.key === 'promoted_by'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('promoted_by')}
                                        >
                                        Promovido Por
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                    <TableSortLabel
                                            active={sortConfig.key === 'initial_date'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('initial_date')}
                                        >
                                        Data Inicial
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                    <TableSortLabel
                                            active={sortConfig.key === 'final_date'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('final_date')}
                                        >
                                        Data Final
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell style={{ width: '20%', textAlign: 'center', fontWeight: 'bold' }}>
                                        Informações do evento
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell style={{ borderRight: '1px solid #CFCECE', paddingLeft: '20px' }}>{event.name}</TableCell>
                                        <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{event.promoted_by}</TableCell>
                                        <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{event.initial_date}</TableCell>
                                        <TableCell style={{ borderRight: '1px solid #CFCECE', textAlign: 'center' }}>{event.final_date}</TableCell>
                                        <TableCell><ModalPapers event_id={event.id}/></TableCell>
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
                    count={eventsCount}
                    labelRowsPerPage="Colunas por página:"
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowsPerPageChange={handleRowsPerPage}
                >
                </TablePagination>
            </Box>
        </Box>
    );
}

export default Eventos;
