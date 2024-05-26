import React, { useState } from 'react'

import '../css/dashboardcss.css'

import {  Card, CardHeader, Divider, HStack,VStack, Heading, Stack, CardBody, StackDivider, Text, Box, Table  } from '@chakra-ui/react'
import CardDash from '../component/CardDash'
import { Equipments } from '../dataExport/EquipmentCounts'
import DashComponent from '../component/DashComponent'
import { useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import NewEquipment from '../component/NewEquipments'
import PieChart from '../component/charts/PieChart'

function Dashboard() {

    const auth = 'Head';
    const [item , setItem] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:5000/itemcount').then((res) =>{
            setItem(res.data);
        }).catch((error) =>{
            console.log(error);
        })
    },[])
// ----------------------------------------------------------------------
    const [req , setreq] = useState('');

    useEffect(() =>{
            axios.get('http://localhost:5000/requestno').then((res) =>{
            setreq(res.data[0].reqNo);
            console.log(res.data)
                }).catch((error) =>{
                    console.log(error);
                })  
    },[])

// ----------------------------------------------------------------------
    const [newEquip , setNew] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:5000/newequipment').then((res)=>{
            setNew(res.data);
            console.log(res.data)
        }).catch((error) =>{
            console.log(error);
        })
    },[])



// ----------------------------------------------------------------------   
const [active , setactive] = useState('');
const [defective , setdefective] = useState('');
const [dispose , setdispose] = useState('');
const [donate , setdonate] = useState('');

    useEffect(() =>{
        axios.get('http://localhost:5000/actives').then((res)=>{
            setactive(res.data[0]);
        }).catch((error) =>{
            console.log(error);
        })
    },[])
    useEffect(() =>{
        axios.get('http://localhost:5000/defective').then((res)=>{
            setdefective(res.data[0]);

        }).catch((error) =>{
            console.log(error);
        })
    },[])
    useEffect(() =>{
        axios.get('http://localhost:5000/dispose').then((res)=>{
            setdispose(res.data[0]);
        }).catch((error) =>{
            console.log(error);
        })
    },[])
    useEffect(() =>{
        axios.get('http://localhost:5000/donate').then((res)=>{
            setdonate(res.data[0]);
        }).catch((error) =>{
            console.log(error);
        })
    },[])

    

// ----------------------------------------------------------------------   
  const dash = item.map((elem)=>{return (
    <Box key={elem.id}>
        <CardDash orientation={'row'} title={elem.name} count ={elem.count}/>
    </Box>
   )})

  return (
    <VStack align={'center'} padding={'0.5rem'}>
        <HStack flexWrap={'wrap'} width={'80%'} justify={'center'} >
            {dash}
        </HStack>
        
        <HStack align={'stretch'} width={'80vw'} >
        <Card width={'100%'} padding={'5px'} variant={'elevated'}>
            <Heading color={'black'}>New Equipments</Heading>
            <NewEquipment data = {newEquip}/>
        </Card>
        <VStack>
            <PieChart activeData={active} defectiveData={defective} disposeData={dispose} donateData={donate}/>
        </VStack>
        </HStack>
    </VStack>
  )
}

export default Dashboard