export const TOKEN_KEY = "@Token";
export const EXPIRATION_KEY = "@Token-Expiration";
export const USER = "@User";

export const isAuthenticated = () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const expiration = localStorage.getItem(EXPIRATION_KEY);
  
      if (!token || !expiration) return false;
  
      // Converte a data de expiração para um timestamp
      const expirationDate = new Date(expiration).getTime();
      console.log(Date.now() < expirationDate);
      return Date.now() < expirationDate;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  };

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, expires_in,user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expires_in);
  localStorage.setItem(USER,user)
};

export const logout = () => {
  console.log(isAuthenticated());
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
  localStorage.removeItem(USER);
  console.log(isAuthenticated());
};