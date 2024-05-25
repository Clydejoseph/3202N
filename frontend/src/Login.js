import {React , useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './css/Login.css'
import axios from 'axios'
import { Card, CardHeader, Heading,Input,Button, CardBody, Stack } from '@chakra-ui/react'
import {
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'


function Login() {
  const linkTo = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [Uerror, setU_Error] = useState(false);
  const [Perror, setP_Error] = useState(false);

  const HandlePword = (e) => {
    setPassword(e.target.value);
    setP_Error(false);
  };

  const HandleEmail = (e) => {
    setEmail(e.target.value);
    setU_Error(false);
  };

  function submitForm(e) {
    e.preventDefault();
    setMessage('Field is empty');

    if (email === '') {
      setU_Error(true);
    }

    if (password === '') {
      setP_Error(true);
    }
    else {
      axios
      .post('http://localhost:5000/login', { email, password })
      .then((response) => {
        const userData = response.data;
        sessionStorage.setItem('account', JSON.stringify(userData));
        linkTo('/');
        console.log(response);
      })
      .catch((error) => {
        setMessage('Email does not exist');
        setU_Error(true);
        setP_Error(true);
        const errorMessage =
          error.response?.data?.error || 'An error occurred during login.';
        setMessage(errorMessage);
      });
    }
}


  return (
        <div className="Login">
          <Card align='center' className='cards'>
            <CardHeader>
              <Heading size='md' color={'black'}>Log in</Heading>
            </CardHeader>
            <CardBody>
            <FormControl as='fieldset' className='LoginBox'>
                  <Stack spacing={4} direction='column'>
                  <Stack spacing={4} direction='column'>
                    <FormControl isInvalid={Uerror}>
                    {!Uerror ? ("") : (<FormErrorMessage>{message} </FormErrorMessage>) }
                      <Input type="text" placeholder={'Email'} value={email} onChange={HandleEmail}/>
                    </FormControl>
                    <FormControl isInvalid={Perror}>
                      {!Perror ? ("") : (<FormErrorMessage>Wrong password </FormErrorMessage>) }
                      <Input type="password" placeholder='Password' value={password} onChange={HandlePword}/>
                    </FormControl>
                  </Stack>
                    <Button colorScheme='messenger' 
                            onClick={submitForm}  
                            loadingText='Submitting'
                            >Log in</Button>
                  </Stack>
            </FormControl>
            </CardBody>
          </Card>
        </div>
  )
}

export default Login
