import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import config from '../../config';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [errors, setErrors] = useState({});

  const validate = () => {
      const newErrors = {};
      if (!item.name) newErrors.name = 'Item name is required';
      if (!item.description) newErrors.description = 'Description is required';
      if (!item.type) newErrors.type = 'Type is required';
      if (!item.brand) newErrors.brand = 'Brand is required';
      if (!item.supplier) newErrors.supplier = 'Supplier is required';
      if (!item.serial) newErrors.serial = 'Serial number is required';
      if (!item.location) newErrors.location = 'Location is required';
      if (!item.date_acquired) newErrors.date_acquired = 'Date acquired is required';
      return newErrors;
  };

  const handleChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
      } else {
          const data = item;
          axios.post(`${config.API}/asset-create`, data)
              .then(function (response) {
                  console.log(response);
              })
              .catch(function (error) {
                  console.log(error);
              });
          onClose();
      }
  };

  return (
      <>
          <Button onClick={onOpen} colorScheme={'facebook'}>New Item</Button>

          <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>Add New Item</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                      <form onSubmit={handleSubmit}>
                          <FormControl isInvalid={errors.name}>
                              <FormLabel>Item Name</FormLabel>
                              <Input name='name' onChange={handleChange} type="text" />
                              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.description}>
                              <FormLabel>Item Description</FormLabel>
                              <Input name='description' onChange={handleChange} type="text" />
                              {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.type}>
                              <FormLabel>Item Type</FormLabel>
                              <Select name='type' placeholder='select category' onChange={handleChange}>
                                  <option value="Mouse">Mouse</option>
                                  <option value="Keyboard">Keyboard</option>
                                  <option value="Monitor">Monitor</option>
                                  <option value="Tool">Tool</option>
                              </Select>
                              {errors.type && <FormErrorMessage>{errors.type}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.brand}>
                              <FormLabel>Brand Name</FormLabel>
                              <Input name='brand' onChange={handleChange} type="text" />
                              {errors.brand && <FormErrorMessage>{errors.brand}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.supplier}>
                              <FormLabel>Supplier Name</FormLabel>
                              <Input name='supplier' onChange={handleChange} type="text" />
                              {errors.supplier && <FormErrorMessage>{errors.supplier}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.serial}>
                              <FormLabel>Serial Number</FormLabel>
                              <Input name='serial' onChange={handleChange} type="text" />
                              {errors.serial && <FormErrorMessage>{errors.serial}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.date_acquired}>
                              <FormLabel>Date Acquired</FormLabel>
                              <Input name='date_acquired' onChange={handleChange} size="md" type="date" />
                              {errors.date_acquired && <FormErrorMessage>{errors.date_acquired}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.location}>
                              <FormLabel>Location</FormLabel>
                              <Input name='location' onChange={handleChange} type="text" />
                              {errors.location && <FormErrorMessage>{errors.location}</FormErrorMessage>}
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
  );
}


// --------------------------------------------------------------------------------------------------------



function UpdateItem({ selected }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  });

  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [showInput, setShowInput] = useState(false);

  const validate = () => {
      const newErrors = {};
      if (!item.name) newErrors.name = 'Item name is required';
      if (!item.description) newErrors.description = 'Description is required';
      if (!item.brand) newErrors.brand = 'Brand is required';
      if (!item.supplier) newErrors.supplier = 'Supplier is required';
      if (!item.location) newErrors.location = 'Location is required';
      if (selectedOption === 'Donate' && !item.recipient) newErrors.recipient = 'Recipient is required when status is Donate';
      return newErrors;
  };

  const handleChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
      setSelectedOption(e.target.value);
      setShowInput(e.target.value === 'Donate'); // Show input when Option Donate is selected
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
      } else {
          const data = item;
          axios.post(`${config.API}/asset-update`, data)
              .then(function (response) {
                  console.log(response);
              })
              .catch(function (error) {
                  console.log(error);
              });
          onClose();
      }
  };

  return (
      <>
          <Button onClick={onOpen}>Details</Button>

          <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>Item Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                      <form onSubmit={handleSubmit}>
                          <FormControl isReadOnly>
                              <FormLabel>Asset Code</FormLabel>
                              <Input value={item.code} type="text" />
                          </FormControl>

                          <FormControl isInvalid={errors.name}>
                              <FormLabel>Item Name</FormLabel>
                              <Input name='name' value={item.name} onChange={handleChange} type="text" />
                              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.description}>
                              <FormLabel>Item Description</FormLabel>
                              <Input name='description' value={item.description} onChange={handleChange} type="text" />
                              {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isReadOnly>
                              <FormLabel>Item Type</FormLabel>
                              <Input value={item.type} type="text" />
                          </FormControl>

                          <FormControl isInvalid={errors.brand}>
                              <FormLabel>Brand Name</FormLabel>
                              <Input name='brand' value={item.brand} onChange={handleChange} type="text" />
                              {errors.brand && <FormErrorMessage>{errors.brand}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.supplier}>
                              <FormLabel>Supplier Name</FormLabel>
                              <Input name='supplier' value={item.supplier} onChange={handleChange} type="text" />
                              {errors.supplier && <FormErrorMessage>{errors.supplier}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isReadOnly>
                              <FormLabel>Serial Number</FormLabel>
                              <Input value={item.serial} type="text" />
                          </FormControl>

                          <FormControl isReadOnly>
                              <FormLabel>Date Acquired</FormLabel>
                              <Input value={new Date(item.date).toLocaleDateString()} size="md" />
                          </FormControl>

                          <FormControl isInvalid={errors.location}>
                              <FormLabel>Location</FormLabel>
                              <Input name='location' value={item.location} onChange={handleChange} type="text" />
                              {errors.location && <FormErrorMessage>{errors.location}</FormErrorMessage>}
                          </FormControl>

                          <FormControl isInvalid={errors.status}>
                              <FormLabel>Current Status</FormLabel>
                              <Select name='status' value={item.status} onChange={handleSelect}>
                                  <option value="Active">Active</option>
                                  <option value="Defective">Defective</option>
                                  <option value="Dispose">Dispose</option>
                                  <option value="Donate">Donate</option>
                              </Select>
                          </FormControl>
                          {selectedOption && <p id='status-notif'>new selected status: {selectedOption}</p>}

                          {showInput && (
                              <FormControl isInvalid={errors.recipient}>
                                  <FormLabel>Recipient</FormLabel>
                                  <Input name='recipient' value={item.recipient} onChange={handleChange} type="text" />
                                  {errors.recipient && <FormErrorMessage>{errors.recipient}</FormErrorMessage>}
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
  );
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
      axios.get(`${config.API}/asset/`)
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


