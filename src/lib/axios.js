import axios from 'axios'

const instance = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api', // URL base de tu API

  withCredentials: true, // Esto permite enviar cookies (útil para autenticación)
});

export default instance;
