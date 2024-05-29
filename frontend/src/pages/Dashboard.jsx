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
        axios.get('http://localhost:5000/itemcount').then((res) => {
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
            <Button onClick={ButtonAsset}>Tech Asset</Button>
        </>
    );
}

export default Dashboard;
