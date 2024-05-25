import React from 'react'
import {  Card, CardHeader, Divider, HStack,VStack, Heading, Stack, CardBody, StackDivider  } from '@chakra-ui/react'
import CardDash from '../component/CardDash'

import { Equipments } from '../dataExport/EquipmentCounts'

function DashComponent() {

const equipmentCount = Equipments;

  const systemUnit = Equipments.find(res => res.title === 'System Unit');
  const monitor = Equipments.find(res => res.title === 'Monitor');
  const mouse = Equipments.find(res => res.title === 'Mouse');
  const keyboard = Equipments.find(res => res.title === 'Keyboard');

  return (
    <HStack spacing={5} height={'100%'} width={'100%'} justify={'center'}>
        <CardDash title={systemUnit.title} count={systemUnit.count} color={'red.300'} />
        <CardDash title={monitor.title} count={monitor.count} color={'green.200'}/>
        <CardDash title={mouse.title} count={mouse.count} color={'blue.200'}/>
        <CardDash title={keyboard.title} count={keyboard.count} color={'orange.300'}/>
        <CardDash title={'Defect'} count={10000} color={'grey.300'}/>
    </HStack>
  )
}

export default DashComponent