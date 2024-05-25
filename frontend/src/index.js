import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './css/indexcss.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);



if(sessionStorage.getItem('account') === null){
  sessionStorage.setItem('account' ,'null');
}


/*<BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/app' element={<App />}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter> */
