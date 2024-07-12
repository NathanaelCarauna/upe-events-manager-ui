import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Select, Button, TextField,
    CircularProgress, Box,TableSortLabel, Modal, InputAdornment, MenuItem } from '@mui/material';
    import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../components/PapersList/index.module.css";
import Divider from '@mui/material/Divider';

function Eventos() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [open, setOpen] = React.useState(false);
    const [nome, setNome] = useState(null);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [promovidoPor, setPromovidoPor] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const eventDetailURL = (id) => {
        return "dados-eventos/" + id;
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
                    page: page,
                    page_size: 10,
                    sort_by: sortConfig.key,
                    sort_direction: sortConfig.direction
                }
            });
            setEvents(response.data.events);
            setTotalPages(response.data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const formatar_backend = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchEvents();
    }, [sortConfig, page]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Evita o comportamento padrão do Enter
          fetchEvents();
        }
      };

    return (
        <Box sx={{ pt: 5, pb: 2, pl: 10, pr: 10 }}>
            <Box component="form" sx={{ mb: 3, pb: 1}}>
                    <Grid container spacing={3} justifyContent="center" sx={{ pb: 1 }}>
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
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                    <Grid container spacing={3} justifyContent="center" sx={{ pb: 1 }}>
                        <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                            <TableSortLabel
                                active={sortConfig.key === 'name'}
                                direction={sortConfig.direction}
                                onClick={() => requestSort('name')}
                                sx={{ fontWeight: 'bold' }} 
                            >
                                Nome
                            </TableSortLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                            <TableSortLabel
                                active={sortConfig.key === 'promoted_by'}
                                direction={sortConfig.direction}
                                onClick={() => requestSort('promoted_by')}
                                sx={{ fontWeight: 'bold' }} 
                            >
                                Promovido Por
                            </TableSortLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                            <TableSortLabel
                                active={sortConfig.key === 'initial_date'}
                                direction={sortConfig.direction}
                                onClick={() => requestSort('initial_date')}
                                sx={{ fontWeight: 'bold' }} 
                            >
                                Data Inicial
                            </TableSortLabel>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} container justifyContent="center" alignItems="center">
                            <TableSortLabel
                                active={sortConfig.key === 'final_date'}
                                direction={sortConfig.direction}
                                onClick={() => requestSort('final_date')}
                                sx={{ fontWeight: 'bold' }}
                            >
                                Data Final
                            </TableSortLabel>
                        </Grid>
                    </Grid>
                </Box>
                </Modal>

                <TableContainer component={Box} sx={{ borderRadius: '8px'}}>
                    {loading && <CircularProgress />}
                    {error && <Typography color="error" align="center">Erro ao carregar dados: {error.message}</Typography>}
                    {!loading && !error && (
                        <Table>
                            <TableBody>
                                {events.map((event) => (
                                <StyledTableRow key={event.id}>
                                    <TableCell style={{ width: "5%", textAlign: 'center'}}><EditIcon/></TableCell>
                                    <TableCell style={{ width: "20%" }}>
                                    <Typography variant="h6">
                                        Nome:
                                    </Typography>
                                    <Typography>
                                        {event.name}
                                    </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "25%", textAlign: 'left' }}>
                                    <Typography variant="h6">
                                        Organizador:
                                    </Typography>
                                    <Typography>
                                        {event.promoted_by}
                                    </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "22%", textAlign: 'left' }}>
                                    <Typography variant="h6">
                                        Data inicial:
                                    </Typography>
                                    <Typography>
                                        {formatar_backend(event.initial_date)}
                                    </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "22%", textAlign: 'left' }}>
                                    <Typography variant="h6">
                                        Data final:
                                    </Typography>
                                    <Typography>
                                        {formatar_backend(event.final_date)}
                                    </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "3%", textAlign: 'center'}}>
                                        <a href={eventDetailURL(event.id)}>
                                            <VisibilityIcon/>
                                        </a>
                                    </TableCell>
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
}

export default Eventos;
