import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from '../../services/api';

const Dashboard = () => {
    const [quantidadeTrabalhos, setQuantidadeTrabalhos] = useState(0);
    const [quantidadeInscritos, setQuantidadeInscritos] = useState(0);
    const [quantidadeOuvintes, setQuantidadeOuvintes] = useState(0);
    const [quantidadeEventos, setQuantidadeEventos] = useState(0);
    const [quantidadeCH, setQuantidadeCH] = useState(0);

    useEffect(() => {
        const buscarQuantidadeTrabalhos = async () => {
            try {
                const response = await api.get('/dashboard');
                console.log(response.data); 
                setQuantidadeTrabalhos(response.data.total_papers);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };   

        const buscarQuantidadeInscritos = async () => {
            try {
                const response = await api.get('/dashboard'); 
                setQuantidadeInscritos(response.data.total_subscribers);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };

        const buscarQuantidadeOuvintes = async () => {
            try {
                const response = await api.get('/dashboard'); 
                setQuantidadeOuvintes(response.data.total_listeners);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };
        
        const buscarQuantidadeEventos = async () => {
            try {
                const response = await api.get('/dashboard'); 
                setQuantidadeEventos(response.data.total_events);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };

        const buscarQuantidadeCH = async () => {
            try {
                const response = await api.get('/dashboard'); 
                setQuantidadeCH(response.data.average_listeners_workload);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };

        buscarQuantidadeInscritos();
        buscarQuantidadeTrabalhos();
        buscarQuantidadeOuvintes();
        buscarQuantidadeEventos()
        buscarQuantidadeCH();
        
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total de Eventos</Typography>
                            <Typography variant="h3">{quantidadeEventos}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total de Trabalhos</Typography>
                            <Typography variant="h3">{quantidadeTrabalhos}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total de Inscritos</Typography>
                            <Typography variant="h3">{quantidadeInscritos}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total de Ouvintes</Typography>
                            <Typography variant="h3">{quantidadeOuvintes}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Média de Carga Horária</Typography>
                            <Typography variant="h3">{quantidadeCH}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;