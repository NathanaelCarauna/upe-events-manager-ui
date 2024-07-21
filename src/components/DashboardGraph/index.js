import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import api from '../../services/api';

function Graph() {
    const [papersPerEvent, setPapersPerEvent] = useState([]);
    const [papersPerArea, setPapersPerArea] = useState([]);
    const [participantsProfile, setParticipantsProfile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/dashboard');
                const { papers_per_event, papers_per_area, participants_profile } = response.data;

                if (Object.keys(papers_per_event).length === 0) {
                    setPapersPerEvent([{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }]);
                } else {
                    const eventColors = ['#1A2D57', '#3257a9 ', '#2a498d', '#495464', '#bbbfca'];
                    const eventData = Object.keys(papers_per_event).map((event, index) => ({
                        id: index + 1,
                        label: event,
                        value: papers_per_event[event],
                        color: eventColors[index % eventColors.length],
                    }));
                    setPapersPerEvent(eventData);
                }

                if (Object.keys(papers_per_area).length === 0) {
                    setPapersPerArea([{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }]);
                } else {
                    const areaCounts = papers_per_area;
                    const sortedAreas = Object.keys(areaCounts).sort((a, b) => areaCounts[b] - areaCounts[a]);
                    const topAreas = sortedAreas.slice(0, 5);
                    const otherCount = sortedAreas.slice(5).reduce((sum, area) => sum + areaCounts[area], 0);
                    const areaColors = ['#1A2D57', '#3257a9 ', '#2a498d', '#495464', '#bbbfca'];

                    const areaData = topAreas.map((area, index) => ({
                        id: index + 1,
                        label: area,
                        value: areaCounts[area],
                        color: areaColors[index],
                    }));

                    if (otherCount > 0) {
                        areaData.push({
                            id: areaData.length + 1,
                            label: 'Outros',
                            value: otherCount,
                            color: `#045ab0`,
                        });
                    }
                    setPapersPerArea(areaData);
                }

                const { subscribers, listeners, abseentes } = participants_profile;
                if (subscribers === 0 && listeners === 0 && abseentes === 0) {
                    setParticipantsProfile([{ id: 1, label: 'Não há dados', value: 1, color: '#1A2D57' }]);
                } else {
                    const profileData = [
                        { id: 1, label: 'Inscritos', value: subscribers, color: '#1A2D57' },
                        { id: 2, label: 'Ouvintes', value: listeners, color: '#3257a9' },
                        { id: 3, label: 'Ausentes', value: abseentes, color: '#2a498d' },
                    ];
                    setParticipantsProfile(profileData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={2} sx={{ pb: 3 }}>
            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', mb: 2 }}>
                    <Box sx={{ backgroundColor: '#1A2D57', borderRadius: '10px', p: 1.5, width: '75%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ margin: 0, textAlign: 'center', color: '#fff' }}>
                            Trabalhos por Evento
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 400 }}>
                        <PieChart
                            slotProps={{
                                legend: {
                                  direction: 'row',
                                  position: { vertical: 'bottom' },
                                  padding: 0,
                                },
                              }}
                            series={[
                                {
                                    data: papersPerEvent.length > 0 ? papersPerEvent : [{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }],
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                        />
                    </Box>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', mb: 2 }}>
                    <Box sx={{ backgroundColor: '#1A2D57', borderRadius: '10px', p: 1.5, width: '75%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ margin: 0, textAlign: 'center', color: '#fff' }}>
                            Trabalhos por Área
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 400 }}>
                        <PieChart
                            width={300}
                            slotProps={{
                                legend: {
                                  direction: 'row',
                                  position: { vertical: 'bottom' },
                                  padding: 0,
                                },
                              }}
                            series={[
                                {
                                    data: papersPerArea.length > 0 ? papersPerArea : [{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }],
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                        />
                    </Box>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', mb: 2 }}>
                    <Box sx={{ backgroundColor: '#1A2D57', borderRadius: '10px', p: 1.5, width: '75%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ margin: 0, textAlign: 'center', color: '#fff' }}>
                            Perfil dos Participantes
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 400 }}>
                        <PieChart
                            width={300}
                            slotProps={{
                                legend: {
                                  direction: 'row',
                                  position: { vertical: 'bottom' },
                                  padding: 0,
                                },
                              }}
                            series={[
                                {
                                    data: participantsProfile.length > 0 ? participantsProfile : [{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }],
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                        />
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Graph;
