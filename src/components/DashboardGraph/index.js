import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import api from '../../services/api';

function Graph() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/papers?page_size=100');
                const papers = response.data.papers;

                console.log(papers)

                if (papers.length === 0) {
                    setData([{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }]);
                } else {
                    const areaCounts = {};
                    papers.forEach(paper => {
                        if (paper.area in areaCounts) {
                            areaCounts[paper.area] += 1;
                        } else {
                            areaCounts[paper.area] = 1;
                        }
                    });

                    const sortedAreas = Object.keys(areaCounts).sort((a, b) => areaCounts[b] - areaCounts[a]);
                    const topAreas = sortedAreas.slice(0, 5);
                    const otherCount = sortedAreas.slice(5).reduce((sum, area) => sum + areaCounts[area], 0);
                    const colors = ['#0e69c4', '#1976d2', '#448cd4', '#5ea8f2', '#7fb7f0'];

                    const chartData = topAreas.map((area, index) => ({
                        id: index + 1,
                        label: area,
                        value: areaCounts[area],
                        color: colors[index % colors.length],
                    }));

                    if (otherCount > 0) {
                        chartData.push({
                            id: chartData.length + 1,
                            label: 'Outros',
                            value: otherCount,
                            color: `#045ab0`,
                        });
                    }

                    setData(chartData);
                }
            } catch (error) {
                console.error('Error fetching paper data:', error);
            }
        };

        fetchData();
    }, []);

    const chartCx = data.length > 1 ? '20%' : '32%';

    return (
        <Box
            sx={{
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '20px',
                p: 3,
                boxShadow: 3,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    borderRadius: '10px',
                    p: 1.5,
                    textAlign: 'left',
                    width: '80%',
                    maxWidth: 600,
                }}
            >
                <h3 style={{ margin: 0, textAlign: 'center', color: '#fff' }}>Distribuição das Áreas dos Papers</h3>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <PieChart
                    width={400}
                    height={400}
                    series={[
                        {
                            data: data.length > 0 ? data : [{ id: 1, label: 'Não há dados', value: 1, color: '#1976d2' }],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -272,
                            endAngle: 90,
                            cx: chartCx,
                        },
                    ]}
                />
            </Box>
        </Box>
    );
}

export default Graph;
