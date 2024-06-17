import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/events');
            console.log(response.data.events);
            setEvents(response.data.events);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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
                    <TableCell>Nome</TableCell>
                    <TableCell>Promovido Por</TableCell>
                    <TableCell>Inicio</TableCell>
                    <TableCell>Fim</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {Array.isArray(events) && events.map((event) => (
                    <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.promoted_by}</TableCell>
                    <TableCell>{event.initial_date}</TableCell>
                    <TableCell>{event.final_date}</TableCell>
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