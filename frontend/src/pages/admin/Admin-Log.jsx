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





function DetailItem({selected}) {

    const userData = JSON.parse(sessionStorage.getItem('account'));

    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [item, setItem] = useState({
        id: selected.id,
        name: selected.name,
        description: selected.description,
        type: selected.type,
        brand: selected.brand,
        supplier: selected.supplier,
        serial: selected.serial_no,
        code: selected.asset_code,
        location: selected.location,
        date: selected.date_acquired,
        status: selected.status,
        recipient: selected.recipient,
        user_id: userData.id,
    })

  
    return (
      <>
        <Button onClick={onOpen} colorScheme={'facebook'}>Details</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Item Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              
              <FormControl isReadOnly>
                  <FormLabel>Asset Code</FormLabel>
                  <Input  value={item.code}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Item Name</FormLabel>
                  <Input  value={item.name}
                          type="text" />
              </FormControl>
    
              <FormControl isReadOnly>
                  <FormLabel>Item Description</FormLabel>
                  <Input  value={item.description}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Item Type</FormLabel>
                  <Input  value={item.type}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Brand Name</FormLabel>
                  <Input  value={item.brand}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Supplier Name</FormLabel>
                  <Input  value={item.supplier}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Serial Number</FormLabel>
                  <Input  value={item.serial}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Date Aquired</FormLabel>
                  <Input  value={new Date(item.date).toLocaleDateString()}
                          size="md"/>
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Location</FormLabel>
                  <Input  value={item.location}
                          type="text" />
              </FormControl>

              <FormControl>
                  <FormLabel>Current Status</FormLabel>
                  <Input name='status' value={item.status} type='text' />
              </FormControl>
              
              {item.status === 'Donate' && (
                  <FormControl isReadOnly>
                  <FormLabel>Recipient</FormLabel>
                  <Input name='recipient'
                          value={item.recipient}
                          type="text"/>
                  </FormControl>
              )}

              <Button onClick={onClose}>Close</Button>

            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }


export default function AdminLog(){

  const linkTo = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('account'));
    if (!userData) {
      linkTo('/login');
    } else {
      // Fetch data from the SQL database
      axios.get('http://localhost:5000/log/')
        .then(response => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [linkTo]);



  const formatDateString = (dateString) => {
    if (!dateString) {
      return 'invalid date'; // Return empty string or another fallback value
    }
  
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleDateString();
  };


    return(

        <div className="table-asset">
          <VStack>
          <HStack justify={'space-between'} width={'100%'} padding={'0px 8px 0px 8px'}>
            <Heading size='xl' color={'black'} fontFamily={'rubik'}>Activity Logs</Heading>
          </HStack>
          <TableContainer borderRadius={'10px'} width={'100%'} overflowY={'auto'} boxShadow={'xl'} height={'70vh'} >
                <Table colorScheme='facebook'  variant='simple' >
                <Thead>
                    <Tr position={'sticky'} top={0} bgColor={'facebook.400'} zIndex={'1'}>
                        <Th color={'white'}>ID</Th>
                        <Th color={'white'}>Activity</Th>
                        <Th color={'white'}>Date</Th>
                        <Th color={'white'}>Technician</Th>
                        <Th color={'white'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((log , index ) => {
                        return(
                          <Tr key={index}>
                            <Td>{log.log_id}</Td>
                            <Td>{log.activity}</Td>
                            <Td>{formatDateString(log.date_done)}</Td>
                            <Td>{log.user_name}</Td>
                            <Td><DetailItem selected={log} /></Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                </Table>
            </TableContainer>
          </VStack>
        </div>
    )
}
