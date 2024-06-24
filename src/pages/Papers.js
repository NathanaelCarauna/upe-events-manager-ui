import React, { useState, useEffect } from 'react';
import api from '../services/api';
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

