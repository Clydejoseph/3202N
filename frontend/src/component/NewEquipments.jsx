import React from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

function NewEquipment({data}) {
  return (
    <div>
        <TableContainer>
            <Table variant='simple'>

                <Thead>
                <Tr>
                    <Th>Asset Code</Th>
                    <Th>Name</Th>
                    <Th>Serial No.</Th>
                    <Th>Location</Th>
                </Tr>
                </Thead>
                <Tbody>
                  {data.length == 0 ? equipUndefined(): data.map((elem ,indx) =>{
                    return(
                      <Tr key={indx} textAlign={'center'}>
                      <Td>{elem.asset_code}</Td>
                      <Td>{elem.name}</Td>
                      <Td>{elem.serial_no}</Td>
                      <Td>{elem.location}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
            </Table>
        </TableContainer>
    </div>
  )
}

function equipUndefined() {
  return (
    <Tr >
      <Td colSpan={4} textAlign={'center'}>THERE IS NO NEW EQUIPMENTS TODAY</Td>
    </Tr>
  )
} 

export default  NewEquipment