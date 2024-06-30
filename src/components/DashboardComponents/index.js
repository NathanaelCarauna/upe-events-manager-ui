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
                const response = await api.get(`/endpoint-trabalhos`); 
                const {totalTrabalhos} = response.data; 
                setQuantidadeTrabalhos(totalTrabalhos);
            } catch (erro) {
                console.error('Erro ao buscar a quantidade de trabalhos:', erro);
            }
        };   

        const buscarQuantidadeInscritos = async () => {
            try {
                const response = await api.get(`/endpoint-inscritos`); 
                const {totalInscritos} = response.data;
                setQuantidadeInscritos(totalInscritos);
            } catch (error) {
                console.error('Erro ao buscar o número de inscritos:', error);
            }
        };

        const buscarQuantidadeOuvintes = async () => {
            try {
                const response = await api.get(`/endpoint-ouvintes`); // Substitua pelo endpoint da API para ouvintes
                const {totalOuvintes} = response.data; // Supondo que a resposta da API tenha um campo totalOuvintes
                setQuantidadeOuvintes(totalOuvintes); // Atualiza o estado com os dados obtidos
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