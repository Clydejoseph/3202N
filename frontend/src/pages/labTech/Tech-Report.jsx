import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
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
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Select,
    FormErrorMessage,
    HStack,
    VStack
  } from '@chakra-ui/react'
import axios from 'axios';

import '../../css/table-asset.css'




export default function TechReport(){

  const linkTo = useNavigate();
  const [data, setData] = useState([]);
  const [dataR, setDataR] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('account'));
    if (!userData) {
      linkTo('/login');
    } else {
      // Fetch data from the SQL database
      axios
        .get('http://localhost:5000/report/')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

    //   axios
    //     .get('http://localhost:5000/report-requests/')
    //     .then((response) => {
    //       setDataR(response.data);
    //       console.log(dataR[0].req_count);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    }
  }, [linkTo]);

    return(

        <div className="table-asset">
          <VStack>
          <HStack justify={'space-between'} width={'100%'} padding={'0px 8px 0px 8px'}>
            <Heading size='xl' color={'black'} fontFamily={'rubik'}>Monthly Report</Heading>
          </HStack>
          <TableContainer borderRadius={'10px'} width={'100%'} overflowY={'auto'} boxShadow={'xl'} height={'70vh'} >
                <Table colorScheme='facebook'  variant='simple' >
                <Thead>
                    <Tr position={'sticky'} top={0} bgColor={'facebook.400'} zIndex={'1'}>
                        <Th color={'white'}></Th>
                        <Th color={'white'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Number of Items in Inventory:</Td>
                            <Td></Td>
                        </Tr>
                        {data.map((item , index ) => {
                            return(
                            <Tr key={index}>
                                <Td>{item.item_name}</Td>
                                <Td>{item.item_count}</Td>
                            </Tr>
                            )
                        })}
                        {/* <Tr>
                            <Td>Number of Requests this month:</Td>
                            <Td>{dataR[0].req_count}</Td>
                        </Tr> */}
                    </Tbody>
                </Table>
            </TableContainer>
          </VStack>
        </div>
    )
}
