import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, TextField, Button, Grid } from '@mui/material';
import ModalPapers from '../components/ModalPapers';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [promovidoPor, setPromovidoPor] = useState('');

    const fetchEvents = async (filters = {}) => {
        setLoading(true);
        try {
            const response = await api.get('/events', { params: filters });
            setEvents(response.data.events);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filters = {};

        if (nome) filters.name = nome;
        if (promovidoPor) filters.promoted_by = promovidoPor;
        if (dataInicio) filters.initial_date = formatar_backend(dataInicio);
        if (dataFim) filters.final_date = formatar_backend(dataFim);

        fetchEvents(filters);
    };

    const clear_fields = () => {
        setNome('');
        setPromovidoPor('');
        setDataInicio('');
        setDataFim('');
        fetchEvents(); // Refetch para mostrar todos os eventos novamente
    };

    const formatar_backend = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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
                                onClick={handleSearch}
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
                                onClick={clear_fields}
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
                                        Nome
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '25%', textAlign: 'center', fontWeight: 'bold' }}>
                                        Promovido Por
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                        Data Inicial
                                    </TableCell>
                                    <TableCell style={{ borderRight: '1px solid #CFCECE', width: '15%', textAlign: 'center', fontWeight: 'bold' }}>
                                        Data Final
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
                                        <TableCell style={{ textAlign: 'center' }}><ModalPapers /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Box>
        </Box>
    );
}

export default Eventos;
