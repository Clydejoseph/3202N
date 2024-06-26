import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import '../css/dashboardcss.css';

import { Card, CardHeader, Divider, HStack, VStack, Heading, Stack, CardBody, StackDivider, Text, Box, Table, Button } from '@chakra-ui/react';
import CardDash from '../component/CardDash';
import { Equipments } from '../dataExport/EquipmentCounts';
import DashComponent from '../component/DashComponent';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import NewEquipment from '../component/NewEquipments';
import PieChart from '../component/charts/PieChart';
import TechAsset from '../pages/labTech/Tech-Asset';

function Dashboard() {
    const auth = 'Head';
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get(`${config.API}/itemcount`).then((res) => {
            setItem(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [newEquip, setNew] = useState([]);

    useEffect(() => {
        axios.get(`${config.API}/newequipment`).then((res) => {
            setNew(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [active, setActive] = useState('');
    const [defective, setDefective] = useState('');
    const [dispose, setDispose] = useState('');
    const [donate, setDonate] = useState('');

    useEffect(() => {
        axios.get(`${config.API}/actives`).then((res) => {
            setActive(res.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get(`${config.API}/defective`).then((res) => {
            setDefective(res.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get(`${config.API}/dispose`).then((res) => {
            setDispose(res.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get(`${config.API}/donate`).then((res) => {
            setDonate(res.data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const navigate = useNavigate();
    
    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        
        try {
            await axios.post(`${config.API}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        } catch (error) {
            // Handle error
            console.error('Error logging out:', error);
        }
    };

    const ButtonAsset = () => {
        navigate('/asset');
    };

    const dash = item.map((elem) => (
        <Box key={elem.id}>
            <CardDash orientation={'row'} title={elem.name} count={elem.count} />
        </Box>
    ));

    return (
        <>
            <div className="container">
            <Button className="button" onClick={ButtonAsset}>Tech Asset</Button>
            <Button className="button" onClick={handleLogout}>Logout</Button>
            </div>
            <VStack align={'center'} padding={'0.5rem'}>
                <HStack flexWrap={'wrap'} width={'80%'} justify={'center'}>
                    {dash}
                </HStack>

                <HStack align={'stretch'} width={'80vw'}>
                    <Card width={'100%'} padding={'5px'} variant={'elevated'}>
                        <Heading color={'black'}>New Equipments</Heading>
                        <NewEquipment data={newEquip} />
                    </Card>
                    <VStack>
                        <PieChart activeData={active} defectiveData={defective} disposeData={dispose} donateData={donate} />
                    </VStack>
                </HStack>
            </VStack>
 
        </>
    );
}

export default Dashboard;
