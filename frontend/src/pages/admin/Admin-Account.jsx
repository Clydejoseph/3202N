import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
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
  VStack,
  Divider,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import axios from "axios";

import "../../css/table-asset.css";

function CreateUser() {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        contact_no: '',
        authority: '',
        email: '',
        password: '',
        status: 'Active',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const mocksubmit = () => {
        const data = user;
        console.log(data);
    }

    const handleSubmit = (e) => {
        const data = user;
        axios
        .post("http://localhost:5000/user-create", data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        onClose();
    };

    return (
        <>
        <Button onClick={onOpen} colorScheme={"facebook"}>
            Create User
        </Button>

        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input name="fname" onChange={handleChange} type="text" />
                </FormControl>

                <Divider />
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lname" onChange={handleChange} type="text" />
                </FormControl>

                <Divider />
                <FormControl>
                    <FormLabel>Contact Number</FormLabel>
                    <Input
                    name="contact_no"
                    onChange={handleChange}
                    // type="tel"
                    // pattern="[0-9]{11}"
                    // maxLength={11}
                    />
                </FormControl>

                <Divider />
                <FormControl>
                    <FormLabel>User Role</FormLabel>
                    <Select name="authority" placeholder="select role" onChange={handleChange}>
                        <option value="1">Tech</option>
                        <option value="2">Head</option>
                        <option value="3">Admin</option>
                    </Select>
                </FormControl>

                <Divider />
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" onChange={handleChange} />
                </FormControl>
                <Divider />
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="password"
                            onChange={handleChange}
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>    
                    </InputGroup>
                </FormControl>
                <Divider />

                <Button type="submit" id="modalButton" colorScheme="blue" mr={3}>
                    Create
                </Button>
                <Button id="modalButton" onClick={onClose}>
                    Cancel
                </Button>
                </form>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
}

// --------------------------------------------------------------------------------------------------------

function UpdateUser({ selected }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [user, setUser] = useState({
    id: selected.id,
    fname: selected.fname,
    lname: selected.lname,
    contact_no: selected.contact_no,
    authority: selected.authority,
    email: selected.email,
    password: selected.password,
    status: selected.status,
    date: selected.date_created
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const data = user;
    axios
      .post("http://localhost:5000/user-update", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    onClose();
  };

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
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isReadOnly>
                <FormLabel>User ID</FormLabel>
                <Input value={user.id} type="text" />
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="fname"
                  value={user.fname}
                  onChange={handleChange}
                  type="text"
                />
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lname"
                  value={user.lname}
                  onChange={handleChange}
                  type="text"
                />
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contact_no"
                  value={user.contact_no}
                  onChange={handleChange}
                //   type="tel"
                //   pattern="[0-9]{11}"
                //   maxLength={11}
                />
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>User Role</FormLabel>
                <Select
                  name="authority"
                  value={user.authority}
                  onChange={handleChange}
                >
                  <option value="Tech">Tech</option>
                  <option value="Head">Head</option>
                  <option value="Admin">Admin</option>
                </Select>
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                />
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>    
                </InputGroup>
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>

              <FormControl isReadOnly>
                  <FormLabel>Date Created</FormLabel>
                  <Input  value={new Date(user.date).toLocaleDateString()}
                          size="md"/>
              </FormControl>

              <Button type="submit" colorScheme="blue" mr={3}>
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

export default function AdminAccount() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the SQL database
    axios
      .get("http://localhost:5000/accounts/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
      <div className="table-asset">
          <VStack>
          <HStack justify={'space-between'} width={'100%'} padding={'0px 8px 0px 8px'}>
            <Heading size='xl' color={'black'} fontFamily={'rubik'}>User Accounts</Heading>
            <CreateUser/>
          </HStack>
          <TableContainer borderRadius={'10px'} width={'100%'} overflowY={'auto'} boxShadow={'xl'} height={'70vh'} >
                <Table colorScheme='facebook'  variant='simple' >
                    <Thead>
                    <Tr position={'sticky'} top={0} bgColor={'facebook.400'} zIndex={'1'}>
                        <Th color={'white'}>ID</Th>
                        <Th color={'white'}>Name</Th>
                        <Th color={'white'}>Email</Th>
                        <Th color={'white'}>Contact Number</Th>
                        <Th color={'white'}>User Role</Th>
                        <Th color={'white'}></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((user , index ) => {
                        return(
                          <Tr key={index}>
                            <Td>{user.id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.contact_no}</Td>
                            <Td>{user.authority}</Td>
                            <Td><UpdateUser selected={user} /></Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                </Table>
            </TableContainer>
          </VStack>
        </div>
  );
}