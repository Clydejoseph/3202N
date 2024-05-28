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




function CreateItem() {

    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [item, setItem] = useState({
        name: '',
        description: '',
        type: '',
        brand: '',
        supplier: '',
        serial: '',
        location: '',
        date_acquired: '',
        status: 'Active',
        asset_code: '',
      });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const HandleSubmit = (e) => {
      const data = item;
      axios.post('http://localhost:5000/asset-create', data)
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
        <Button onClick={onOpen} colorScheme={'facebook'}>New Item</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

          <form onSubmit={HandleSubmit}>

            <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input  name='name'
                        onChange={handleChange}
                        type="text" />
            </FormControl>
  
            <FormControl>
                <FormLabel>Item Description</FormLabel>
                <Input  name='description'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <FormControl>
                <FormLabel>Item Type</FormLabel>
                <Select name='type' placeholder='select category' onChange={handleChange}>
                    <option value="1">Mouse</option>
                    <option value="2">Keyboard</option>
                    <option value="3">Monitor</option>
                    <option value="4">Tool</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Brand Name</FormLabel>
                <Input  name='brand'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <FormControl>
                <FormLabel>Supplier Name</FormLabel>
                <Input  name='supplier'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <FormControl>
                <FormLabel>Serial Number</FormLabel>
                <Input  name='serial'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <FormControl>
                <FormLabel>Date Acquired</FormLabel>
                <Input  name='date_acquired'
                        onChange={handleChange}
                        size="md"
                        type="date" />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input  name='location'
                        onChange={handleChange}
                        type="text" />
            </FormControl>

            <Button type='submit' id='modalButton' colorScheme='blue' mr={3}>
                Add
            </Button>
            <Button id='modalButton' onClick={onClose}>Cancel</Button>

          </form>

            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }


// --------------------------------------------------------------------------------------------------------



function UpdateItem({selected}) {

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
    })

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleSelect = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
        setSelectedOption(e.target.value);
        console.log(selectedOption);
        console.log(item.status);
        setShowInput(e.target.value === 'Donate'); // Show input when Option Donate is selected
    };

    const HandleSubmit = (e) => {
      const data = item;
      axios.post('http://localhost:5000/asset-update', data)
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
        <Button onClick={onOpen}>Details</Button>
  
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

            <form onSubmit={HandleSubmit}>
              
              <FormControl isReadOnly>
                  <FormLabel>Asset Code</FormLabel>
                  <Input  value={item.code}
                          type="text" />
              </FormControl>

              <FormControl>
                  <FormLabel>Item Name</FormLabel>
                  <Input  name='name'
                          value={item.name}
                          onChange={handleChange}
                          type="text" />
              </FormControl>
    
              <FormControl>
                  <FormLabel>Item Description</FormLabel>
                  <Input  name='description'
                          value={item.description}
                          onChange={handleChange}
                          type="text" />
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Item Type</FormLabel>
                  <Input  value={item.type}
                          type="text" />
              </FormControl>

              <FormControl>
                  <FormLabel>Brand Name</FormLabel>
                  <Input  name='brand'
                          value={item.brand}
                          onChange={handleChange}
                          type="text" />
              </FormControl>

              <FormControl>
                  <FormLabel>Supplier Name</FormLabel>
                  <Input  name='supplier'
                          value={item.supplier}
                          onChange={handleChange}
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

              <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input  name='location'
                          value={item.location}
                          onChange={handleChange}
                          type="text" />
              </FormControl>

              <FormControl>
                  <FormLabel>Current Status</FormLabel>
                  <Select name='status' value={item.status} onChange={handleSelect}>
                    <option value="Active">Active</option>
                    <option value="Defective">Defective</option>
                    <option value="Dispose">Dispose</option>
                    <option value="Donate">Donate</option>
                  </Select>
                  {selectedOption && <p id='status-notif'>new selected status: {selectedOption}</p>}

              </FormControl>
              {showInput && (
                  <FormControl>
                  <FormLabel>Recipient</FormLabel>
                  <Input name='recipient'
                          value={item.recipient}
                          onChange={handleChange}
                          type="text"/>
                  </FormControl>
              )}

              <Button type='submit' colorScheme='blue' mr={3}>
                  Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>

            </form>
            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }


export default function TechAsset(){

  const linkTo = useNavigate();
  const [data, setData] = useState([]);
  const [searchItem ,setSearchItem] = useState('');

  useEffect(() => {
    // const userData = JSON.parse(sessionStorage.getItem('account'));
    // if (!userData) {
    //   linkTo('/login');
    // } else {
      // Fetch data from the SQL database
      axios.get('http://localhost:5000/asset/')
        .then(response => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
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
            <Heading size='xl' color={'black'} fontFamily={'rubik'}>Equipment</Heading>
            <HStack>
                <FormControl>
                  <Input type='text'  placeholder='SEARCH' onChange={(e) =>{setSearchItem(e.target.value)}}/>
                </FormControl>
                <CreateItem />
            </HStack>
          </HStack>
          <TableContainer borderRadius={'10px'} width={'100%'} overflowY={'auto'} boxShadow={'xl'} height={'70vh'} >
                <Table colorScheme='facebook'  variant='simple' >
                <Thead>
                    <Tr position={'sticky'} top={0} bgColor={'facebook.400'} zIndex={'1'}>
                        <Th color={'white'}>Asset Code</Th>
                        <Th color={'white'}>Type</Th>
                        <Th color={'white'}>Brand</Th>
                        <Th color={'white'}>Serial No.</Th>
                        <Th color={'white'}>Date Aquired</Th>
                        <Th color={'white'}>Location</Th>
                        <Th color={'white'}>Status</Th>
                        <Th color={'white'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                      {data.filter((srchVal) =>{
                        if(searchItem === '' ){
                          return srchVal;
                        }
                        else if(srchVal.asset_code.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.type.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.brand.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.serial_no.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.date_acquired.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.location.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                        else if(srchVal.status.toLowerCase().includes(searchItem.toLowerCase())){
                          return srchVal;
                        }
                      }).map((item , index ) => {
                        return(
                          <Tr key={index}>
                            <Td>{item.asset_code}</Td>
                            <Td>{item.type}</Td>
                            <Td>{item.brand}</Td>
                            <Td>{item.serial_no}</Td>
                            <Td>{formatDateString(item.date_acquired)}</Td>
                            <Td>{item.location}</Td>
                            <Td>{item.status}</Td>
                            <Td><UpdateItem selected={item} /></Td>
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


