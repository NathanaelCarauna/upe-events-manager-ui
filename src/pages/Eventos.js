import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box, TableSortLabel } from '@mui/material';
import ModalPapers from '../components/ModalPapers';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/events', {
                params: {
                    sort_by: sortConfig.key,
                    sort_direction: sortConfig.direction
                }
            });
            console.log(response)
            setEvents(response.data.events);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [sortConfig]); // Fetch events whenever sortConfig changes

    const sortedEvents = React.useMemo(() => {
        let sortableEvents = [...events];
        if (sortConfig !== null) {
            sortableEvents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableEvents;
    }, [events, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom component="div" align="center" fontSize={'40px'} style={{ padding: '20px' }}>
                Listagem de Eventos
            </Typography>
            <TableContainer component={Paper}>
                {loading && <CircularProgress />}
                {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                {!loading && !error && (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortConfig.key === 'name'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('name')}
                                        >
                                            Nome
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortConfig.key === 'promoted_by'}
                                            direction={sortConfig.direction}
                                            onClick={() => requestSort('promoted_by')}
                                        >
                                            Promovido Por
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Informações do evento</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(sortedEvents) && sortedEvents.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{event.promoted_by}</TableCell>
                                        <TableCell><ModalPapers event_id={event.id}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
            </TableContainer>
        </Box>
    );
}

export default Eventos;