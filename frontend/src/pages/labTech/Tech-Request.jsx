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
    Textarea,
    InputGroup,
    InputLeftElement,
    HStack,
    VStack
  } from '@chakra-ui/react'
  import axios from 'axios';

import '../../css/table-request.css'



function CreateRequest(){
  
    const userData = JSON.parse(sessionStorage.getItem('account'));
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [request, setRequest] = useState({
        name: '',
        description: '',
        type: '',
        item: '',
        date_needed: '',
        status1: 'Pending', status2: 'pending',
        unit: '',
        unit_cost: '',
        quantity: '',
        total_amount: '',
        payee: '',
        instruction: '',
        labor_cost: '',
        user_id: userData.id
      });


    const [showRIS, setShowRIS] = useState(false);
    const [showWRF, setShowWRF] = useState(false);

    const handleSelect = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
        setShowRIS(e.target.value === 'RIS');
        setShowWRF(e.target.value === 'WRF');
    };


    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };

    const HandleSubmit = (e) => {
      const data = request;
      axios.post('http://localhost:5000/request-create', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      onClose();
    }

  
    return (
      <>
        <Button onClick={onOpen} colorScheme={'facebook'} width={'100%'}>Create Request</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Request</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

          <form onSubmit={HandleSubmit}>

            <FormControl>
                <FormLabel>Request Name</FormLabel>
                <Input  name='name'
                        onChange={handleChange}
                        type="text" />
            </FormControl>
  
            <FormControl>
                <FormLabel>Request Description</FormLabel>
                <Input  name='description'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <FormControl>
                <FormLabel>Request Type</FormLabel>
                <Select name='type' placeholder='select category' onChange={handleSelect}>
                    <option value="RIS">RIS</option>
                    <option value="WRF">WRF</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Item</FormLabel>
                <Select name='item' placeholder='select item' onChange={handleChange}>
                    <option value="1">Mouse</option>
                    <option value="2">Keyboard</option>
                    <option value="3">Monitor</option>
                    <option value="4">Tool</option>
                </Select>
            </FormControl>

            {showRIS && (
                <>
                <FormControl>
                <FormLabel>Unit</FormLabel>
                <Input  name='unit'
                        onChange={handleChange}
                        type="text" />
                </FormControl>

                <FormControl>
                <FormLabel>Unit Cost</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'
                                        fontSize='1.2em'
                                        children='₱'/>
                    <Input  name='unit_cost'
                            onChange={handleChange}
                            type="number" />
                </InputGroup>
                </FormControl>

                <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input  name='quantity'
                        onChange={handleChange}
                        type="number" />
                </FormControl>

                <FormControl>
                <FormLabel>Total Amount</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'
                                        fontSize='1.2em'
                                        children='₱'/>
                    <Input  name='total_amount'
                            value={request.unit_cost * request.quantity}
                            onChange={handleChange}
                            type="number" />
                </InputGroup>
                </FormControl>

                <FormControl>
                <FormLabel>Payee</FormLabel>
                <Input  name='payee'
                            onChange={handleChange}
                            type="text" />
                </FormControl>

                <FormControl>
                    <FormLabel>Payment Instructions</FormLabel>
                    <Textarea  name='instructions'
                            onChange={handleChange}
                            type="text" />
                </FormControl>
                </>
            )}

            {showWRF && (
                <>
                <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input  name='quantity'
                        onChange={handleChange}
                        type="number" />
                </FormControl>

                <FormControl>
                <FormLabel>Date Needed</FormLabel>
                <Input  name='date_needed'
                        onChange={handleChange}
                        size="md"
                        type="date" />
                </FormControl>

                <FormControl>
                <FormLabel>Labor Cost</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'
                                        fontSize='1.2em'
                                        children='₱'/>
                    <Input  name='labor_cost'
                            onChange={handleChange}
                            type="number" />
                </InputGroup>
                </FormControl> 
                </>
            )}   

            <Button type='submit' id='modalButton' colorScheme='blue' mr={3}>
                Submit
            </Button>
            <Button id='modalButton' onClick={onClose}>Cancel</Button>

          </form>

            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
}


function RequestDetail({selected}) {

  // const userData = JSON.parse(sessionStorage.getItem('account'));

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [item, setItem] = useState({
      id: selected.id,
      name: selected.name,
      description: selected.description,
      type: selected.type,
      item: selected.item_requested,
      date_requested: selected.date_requested,
      date_needed: selected.date_needed,
      unit: selected.unit,
      unit_cost: selected.unit_cost,
      quantity: selected.quantity,
      total_amount: selected.total_amount,
      payee: selected.payee,
      instruction: selected.payment_instruction,
      labor_cost: selected.labor_cost,
      requestor: selected.requestor,
      status1: selected.status1,
      status2: selected.status2
    });

    const formatDateString = (dateString) => {
      if (!dateString) {
        return 'invalid date'; // Return empty string or another fallback value
      }
    
      const formattedDate = new Date(dateString);
      return formattedDate.toLocaleDateString();
    };


  return (
    <>
      <Button colorScheme={'facebook'} onClick={onOpen}>Details</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.type} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          <form>
            
            <FormControl isReadOnly>
                <FormLabel>Name</FormLabel>
                <Input  value={item.name}
                        type="text" />
            </FormControl>

            <FormControl isReadOnly>
                <FormLabel>Description</FormLabel>
                <Input  value={item.name}
                        type="text" />
            </FormControl>
  
            <FormControl isReadOnly>
                <FormLabel>Item Requested</FormLabel>
                <Input  value={item.item}
                        type="text" />
            </FormControl>

            <FormControl isReadOnly>
                <FormLabel>Date Requested</FormLabel>
                <Input  name='brand'
                        value={formatDateString(item.date_requested)} />
            </FormControl>

              {item.type === 'RIS' && (
                  <>
                  <FormControl isReadOnly>
                  <FormLabel>Unit</FormLabel>
                  <Input  value={item.unit}
                          type="text" />
                  </FormControl>
  
                  <FormControl isReadOnly>
                  <FormLabel>Unit Cost</FormLabel>
                  <InputGroup>
                      <InputLeftElement pointerEvents='none'
                                          fontSize='1.2em'
                                          children='₱'/>
                      <Input  value={item.unit_cost}
                              type="number" />
                  </InputGroup>
                  </FormControl>
  
                  <FormControl isReadOnly>
                  <FormLabel>Quantity</FormLabel>
                  <Input  value={item.quantity}
                          type="number" />
                  </FormControl>
  
                  <FormControl isReadOnly>
                  <FormLabel>Total Amount</FormLabel>
                  <InputGroup>
                      <InputLeftElement pointerEvents='none'
                                          fontSize='1.2em'
                                          children='₱'/>
                      <Input  value={item.unit_cost * item.quantity}
                              type="number" />
                  </InputGroup>
                  </FormControl>
  
                  <FormControl isReadOnly>
                  <FormLabel>Payee</FormLabel>
                  <Input  value={item.payee}
                          type="text" />
                  </FormControl>
  
                  <FormControl isReadOnly>
                      <FormLabel>Payment Instructions</FormLabel>
                      <Textarea  value={item.instruction}
                              type="text" />
                  </FormControl>
                  </>
              )}

              {item.type === 'WRF' && (
                  <>
                  <FormControl isReadOnly>
                  <FormLabel>Quantity</FormLabel>
                  <Input  value={item.quantity}
                          type="number" />
                  </FormControl>

                  <FormControl isReadOnly>
                  <FormLabel>Date Needed</FormLabel>
                  <Input  value={formatDateString(item.date_needed)}
                          size="md"/>
                  </FormControl>

                  <FormControl isReadOnly>
                  <FormLabel>Labor Cost</FormLabel>
                  <InputGroup>
                      <InputLeftElement pointerEvents='none'
                                          fontSize='1.2em'
                                          children='₱'/>
                      <Input  value={item.labor_cost}
                              type="number" />
                  </InputGroup>
                  </FormControl> 
                  </>
              )}   

              <FormControl isReadOnly>
              <FormLabel>Requested By</FormLabel>
              <Input  value={item.requestor}
                      type="text" />
              </FormControl>

              <Button id='modalButton' onClick={onClose}>Close</Button>

          </form>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}



export default function TechRequest(){

    const linkTo = useNavigate();
    const [data, setData] = useState([]);
    const [searchItem ,setSearchItem] = useState('');

    const formatDateString = (dateString) => {
      if (!dateString) {
        return 'invalid date'; // Return empty string or another fallback value
      }
    
      const formattedDate = new Date(dateString);
      return formattedDate.toLocaleDateString();
    };


    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem('account'));
      if (!userData) {
        linkTo('/login');
      } else {
        // Fetch data from the SQL database
        axios.get('http://localhost:5000/requestTech/')
          .then(response => {
            setData(response.data);
            // console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, [linkTo]);

    return(

        <>
            <div className='table-request'>


            <VStack>
            <HStack justify={'space-between'} width={'100%'} padding={'0px 8px 0px 8px'}>
              <Heading size='xl' color={'black'} fontFamily={'rubik'}>Request</Heading>
              <HStack>
                  <CreateRequest />
              </HStack>
            </HStack>

            <TableContainer borderRadius={'10px'} width={'100%'} overflowY={'auto'} boxShadow={'xl'} height={'70vh'} >
                <Table colorScheme='facebook'  variant='simple' >

                    <Thead>
                    <Tr position={'sticky'} top={0} bgColor={'facebook.400'} zIndex={'1'}>
                        <Th color={'white'}>ID</Th>
                        <Th color={'white'}>Name</Th>
                        <Th color={'white'}>Type</Th>
                        <Th color={'white'}>Item Requested</Th>
                        <Th color={'white'}>Date Requested</Th>
                        <Th color={'white'}>Status</Th>
                        <Th color={'white'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {data.map((request , index ) => {
                        return(
                          <Tr key={index}>
                            <Td>{request.id}</Td>
                            <Td>{request.name}</Td>
                            <Td>{request.type}</Td>
                            <Td>{request.item_requested}</Td>
                            <Td>{formatDateString(request.date_requested)}</Td>
                            {(request.status1 === 'Pending' || request.status2 === 'Pending') && (
                              <>
                                <Td>Pending</Td>
                              </>
                            )}
                            {request.status1 === 'Approved' && request.status2 === 'Approved' && (
                              <>
                                <Td>Approved</Td>
                              </>
                            )}
                            {(request.status1 === 'Denied' || request.status2 === 'Denied') && (
                              <>
                                <Td>Denied</Td>
                              </>
                            )}
                            <Td><RequestDetail selected={request} /></Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                </Table>
            </TableContainer>
            </VStack>
            </div>
        </>
    )
}