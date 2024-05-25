import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Heading, VStack, Divider } from '@chakra-ui/react'
import '../../css/navbar-style.css';


import TechAsset from '../../pages/labTech/Tech-Asset';
import { json, useNavigate } from 'react-router-dom';


export default function TechNav(){
    const navigate = useNavigate();

    const accountActive =  JSON.parse(sessionStorage.getItem('account'));

    // console.log(accountActive);

    const fname = accountActive == null ? 'default' :  accountActive.fname;
    const lname  = accountActive == null ? 'default' : accountActive.lname;
    const role =  accountActive == null ? 'default ' : accountActive.auth;

    const initial = fname[0] + lname[0];

    function logoutfunc(){
        sessionStorage.removeItem('account');
        navigate('/login')
    }


    return(
        <div className='sideNav'>
            <VStack>
            <div className="headUser">
                <div className="nameInitial">
                    <Text>{initial.toUpperCase()}</Text>
                </div>
                <div className="profile">
                    <Heading as={'h5'} textAlign={'center'} size={'sm'}>{fname +" "+ lname}</Heading>
                    <Text align={'center'}>{role}</Text>
                </div>
            </div>
            <Divider />
            <Tabs orientation={'vertical'} variant={'unstyled'}>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} onClick={() =>{navigate('/')}}>Dashboard</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} onClick={() =>{navigate('/tech-asset')}}> Equipment/Tool</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} onClick={() =>{navigate('/tech-request')}}>Request Forms</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} onClick={() =>{navigate('/report')}}>Report/Analytics</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }} onClick={() =>{logoutfunc()}}>Log Out</Tab>
                </TabList>
            </Tabs>
            </VStack>
        </div>
    )
}