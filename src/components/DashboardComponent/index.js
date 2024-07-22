import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const DashboardComponent = ({title,info}) => {

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h3">{info}</Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardComponent;