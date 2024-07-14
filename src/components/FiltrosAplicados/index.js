import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const FiltrosAplicados = ({ nome, promovidoPor, dataInicio, dataFim, limparFiltros }) => {
    const filters = [
        { label: 'Nome', value: nome, key: 'nome' },
        { label: 'Promovido Por', value: promovidoPor, key: 'promovidoPor' },
        { label: 'Data de Início', value: dataInicio, key: 'dataInicio' },
        { label: 'Data de Fim', value: dataFim, key: 'dataFim' }
    ];

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Filtros Aplicados:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                {filters.map(filter => (
                    filter.value && (
                        <Chip
                            key={filter.key}
                            label={`${filter.label}: ${filter.value}`}
                            onDelete={() => limparFiltros(filter.key)}
                            sx={{ m: 0.5 }}
                        />
                    )
                ))}
            </Box>
        </Box>
    );
};

export default FiltrosAplicados;