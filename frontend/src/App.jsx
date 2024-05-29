import { Route, Routes, useNavigate } from "react-router-dom";
import TechHome from './pages/labTech/Tech-Home';
import TechAsset from './pages/labTech/Tech-Asset';
import { useState, useEffect, React } from "react";
import axios from "axios";
import config from "./config";
import '../src/css/Login.css';


function App() {
  const navigate = useNavigate();

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${config.API}/login`, { email, password });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return (
      <div className="login-container">
        <div className="login-form">
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    axios.interceptors.request.use(async (config) => {
      let token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${config.API}/token`, { token: refreshToken });
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<TechHome />} />
        <Route path="/asset" element={<TechAsset />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

const errorRouteHandling = () => {
  return (<h1>404 ERROR Routing APP</h1>)
}
