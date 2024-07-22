import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Certifique-se de ajustar o caminho para o arquivo
import { login, isAuthenticated, getToken} from '../services/auth'; // Ajuste o caminho conforme necessário
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Login() {

  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    console.log(isAuthenticated());
    if (isAuthenticated()) {
      navigate('/'); 
      console.log("SADFSDFSDF")
    }
  }, [navigate]);
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataform = new FormData(event.currentTarget);
    try {
        const data = {
            username: dataform.get('username'),
            password: dataform.get('password'),
          };
          
          const formData = new URLSearchParams(data).toString();
          console.log(formData);
      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const { access_token, expires_in, user } = response.data;
      login(access_token, expires_in,user.id);

      navigate('/');
    } catch (error) {
      console.error('Erro de login:', error);
    }
  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
