import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, TextField, Button, Grid } from '@mui/material';
import ModalPapers from '../components/ModalPapers';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        tempName: '',
        tempPromotedBy: '',
        tempInitialDate: '',
        tempFinalDate: '',
        name: '',
        promotedBy: '',
        initialDate: '',
        finalDate: ''
    });
    const [showTable, setShowTable] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/events');
            setEvents(response.data.events);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleFilter = () => {
        setFilters({
            ...filters,
            name: filters.tempName,
            promotedBy: filters.tempPromotedBy,
            initialDate: filters.tempInitialDate,
            finalDate: filters.tempFinalDate
        });
        setShowTable(true);
    };

    const format_date = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
    };

    const filteredEvents = events.filter(event => {
        const initialDate = event.initial_date ? format_date(event.initial_date) : '';
        const finalDate = event.final_date ? format_date(event.final_date) : '';
        return (
            event.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            event.promoted_by.toLowerCase().includes(filters.promotedBy.toLowerCase()) &&
            (filters.initialDate === '' || initialDate === filters.initialDate) &&
            (filters.finalDate === '' || finalDate === filters.finalDate)
        );
    });

    return (
        <Box sx={{ pt: 5, pb: 4, pl: 10, pr: 10 }}>
            <Box sx={{ backgroundColor: '#fff', borderRadius: '20px', p: 3, mb: 3 }}>
                <Box component="form" sx={{ mb: 3, pb: 3 }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={filters.tempName}
                                onChange={(e) => setFilters({ ...filters, tempName: e.target.value })}
                                sx={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Promovido Por"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={filters.tempPromotedBy}
                                onChange={(e) => setFilters({ ...filters, tempPromotedBy: e.target.value })}
                                sx={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Data de Início"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={filters.tempInitialDate}
                                onChange={(e) => setFilters({ ...filters, tempInitialDate: e.target.value })}
                                sx={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Data de Fim"
                                variant="outlined"
                                type="date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={filters.tempFinalDate}
                                onChange={(e) => setFilters({ ...filters, tempFinalDate: e.target.value })}
                                sx={{ backgroundColor: '#f0f0f0' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} container justifyContent="center" alignItems="center">
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
                                onClick={handleFilter}
                            >
                                Carregar Eventos
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                {showTable && (
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
                                    {filteredEvents.map((event) => (
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
                )}
            </Box>
        </Box>
    );
}

export default Eventos;
