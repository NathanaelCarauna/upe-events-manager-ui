import React, { useEffect, useState } from 'react';
import { Box, Chip } from '@mui/material';

const FiltrosAplicados = ({ filters, clearFilters }) => {
    const [filtros, setFiltros] = useState([]);


    useEffect(() => {
        setFiltros(filters);
    });

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                {filtros.map(filtro => (
                    filtro.value && (
                        <Chip
                            key={filtro.key}
                            label={`${filtro.label}: ${filtro.value}`}
                            onDelete={() => clearFilters(filtro.key)}
                            sx={{ m: 0.5 }}
                        />
                    )
                ))}
            </Box>
        </Box>
    );
};

export default FiltrosAplicados;