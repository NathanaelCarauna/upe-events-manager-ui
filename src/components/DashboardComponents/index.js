import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import api from '../../services/api';

const Dashboard = () => {
    const [quantidadeTrabalhos, setQuantidadeTrabalhos] = useState(0);
    const [quantidadeInscritos, setQuantidadeInscritos] = useState(0);
    const [quantidadeOuvintes, setQuantidadeOuvintes] = useState(0);

    useEffect(() => {
        const buscarQuantidadeTrabalhos = async () => {
            try {
                const response = await api.get('/events'); 
                setQuantidadeTrabalhos(response.data.total_events);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };   

        const buscarQuantidadeInscritos = async () => {
            try {
                //const response = await api.get(`/endpoint-inscritos`); 
                //const {totalInscritos} = response.data;
                //setQuantidadeInscritos(totalInscritos);
                setQuantidadeInscritos(442);
            } catch (error) {
                console.error('Erro ao buscar o número de inscritos:', error);
            }
        };

        const buscarQuantidadeOuvintes = async () => {
            try {
                //const response = await api.get(`/endpoint-ouvintes`);
                //const {totalOuvintes} = response.data;
                //setQuantidadeOuvintes(totalOuvintes);
                setQuantidadeOuvintes(256);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de ouvintes:', erro);
            }
        };

        buscarQuantidadeInscritos();
        buscarQuantidadeTrabalhos();
        buscarQuantidadeOuvintes();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
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
            </Grid>
        </Box>
    );
};

export default Dashboard;