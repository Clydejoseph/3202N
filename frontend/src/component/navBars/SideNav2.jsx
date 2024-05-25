import React from 'react'

import '../../css/sNavCSS.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {RiDashboardFill} from 'react-icons/ri';
import {BsPeopleFill} from 'react-icons/bs';
import {MdInventory} from 'react-icons/md';
import {HiDocumentReport} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Inventory from '../../pages/Inventory';
import Team from '../../pages/Team';

function SideNav2() {
  return (
    <div>
        <Tabs orientation={'vertical'} variant={'unstyled'}>
            <TabList className='sideNav'>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Dashboard</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Equipment</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>User</Tab>
                <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Borrow</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Dashboard/>
                </TabPanel>
                <TabPanel>
                    <Inventory />
                </TabPanel>
                <TabPanel>
                    <Team/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
  )
}

export default SideNav2