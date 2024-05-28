import {Route, Routes} from "react-router-dom";
import TechHome from './pages/labTech/Tech-Home';
import TechAsset from './pages/labTech/Tech-Asset';
import {useState, useEffect, React} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import config from "./config";


function App() {

  const navigate = useNavigate();

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${config.API}/login`, { email, password });
        console.log(response)
        const { token } = response.data;
        localStorage.setItem('token', token); // Store token in local storage
        navigate('/dashboard'); // Redirect to dashboard upon successful login
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error (e.g., display error message)
      }
    };

    return (
      <div>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };

  // const Users = () => {
  //   const [users, setUsers] = useState([]);

  //   const fetchUsers = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Retrieve token from local storage
  //       const response = await axios.get('http://localhost:5000/users', { headers: { Authorization: token } });
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error('Fetch users error:', error);
  //       // Handle fetch users error (e.g., redirect to login page)
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  //   return (
  //     <div>
  //       <h2>Users</h2>
  //       <ul>
  //         {users.map(user => (
  //           <li key={user.id}>{user.name}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  return(
    <>
      <Routes>
        <Route path="/dashboard" element={<TechHome />} /> {/* Define the dashboard route */}
        <Route path="/asset" element={<TechAsset />} />
        <Route path="/" element={<Login />} /> {/* Define the login route */}
      </Routes>
    </>
  );
}

export default App;

const errorRouteHandling = () =>{
  return (<h1>404 ERROR Routing APP</h1>)
}

