import React, { useState } from 'react'
import Navigationbar from './component/Navigationbar'
import { useEffect } from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import { Heading } from '@chakra-ui/react';
import './css/homepage-style.css'


import TechHome from './pages/labTech/Tech-Home';
import TechAsset from './pages/labTech/Tech-Asset';
import TechRequest from './pages/labTech/Tech-Request';
import TechReport from './pages/labTech/Tech-Report';

import HeadAsset from './pages/labHead/Head-Asset';
import HeadRequest from './pages/labHead/Head-Request';
import HeadLog from './pages/labHead/Head-Logs';

import AdminAccount from './pages/admin/Admin-Account';
import AdminLog from './pages/admin/Admin-Log';
import AdminRequest from './pages/admin/Admin-Request';

function pageCont(){

  const userData = JSON.parse(sessionStorage.getItem('account')) == null? 'default' : JSON.parse(sessionStorage.getItem('account'));

  return (
    <div className='page'>
      <Navigationbar component = {userData.auth} />
        <div className="pageActive">
          <Routes>
                <Route path="/" element={<TechHome />}></Route>
                <Route path="/tech-asset" element={<TechAsset />}></Route>
                <Route path="/tech-request" element={<TechRequest />}></Route>
                <Route path="/report" element={<TechReport />}></Route>
                <Route path="/head-asset" element={<HeadAsset />}></Route>
                <Route path="/head-request" element={<HeadRequest />}></Route>
                <Route path="/head-log" element={<HeadLog />}></Route>
                <Route path="/admin-log" element={<AdminLog />}></Route>
                <Route path="/admin-request" element={<AdminRequest />}></Route>
                <Route path="/admin-account" element={<AdminAccount />}></Route>
                <Route path="*" Component={wrongRoute}></Route>
          </Routes>
        </div>

    </div>
    )
}

function wrongRoute(){
  return(
  <div className='error'>
    <Heading>404 PAGE NOT FOUND</Heading>
  </div>
  )
}

function Home() {
  const navigate = useNavigate();
  const [accountLogged , setaccount] = useState(false);




  useEffect(() =>{
    if(sessionStorage.getItem('account') === 'null'){
      setaccount(false);
      navigate('/login');
      
    }else{
      setaccount(true);
    }
  },[navigate])

  const checkerAccount = () => (sessionStorage.getItem('account') === 'null') ? setaccount(false) : setaccount(true);


  return (
    <>
        {pageCont()}
    </>

  )
}

export default Home