import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'

import '../../css/tech-home.css'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../Dashboard'

export default function TechHome(){

    var path = process.env.PUBLIC_URL;

    const navigate = useNavigate();

    // const userData = JSON.parse(sessionStorage.getItem('account'));

    // // Example usage:
    // console.log(userData.email); // Output the user's email
    // console.log(userData.auth); // Output the user's authority or role

    return(

        <div className='home' style={{width: '100vw' , height: '90vh'}}>
                <Dashboard />
        </div>
    )
}