// import React from 'react'
// import '../../css/sNavCSS.css';
// import { Button, ButtonGroup, Divider, Heading, Icon, IconButton, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
// import {RiDashboardFill} from 'react-icons/ri';
// import {BsPeopleFill} from 'react-icons/bs';
// import {MdInventory} from 'react-icons/md';
// import {HiDocumentReport} from 'react-icons/hi';
// import { Link, useNavigate } from 'react-router-dom';


// function SideNav() {
//   const user = JSON.parse(sessionStorage.getItem('account'));
//   const navigate = useNavigate();



//   return (
  
//     <div className='sideNav'>
//       <VStack spacing={'10px'}>
//         <Stack spacing={'1px'} align={'center'}>
//           <Heading as={'h2'} size={'md'}>{user.username}</Heading>
//           <Text>{user.auth}</Text>
//         </Stack>
//         <StackDivider borderColor={'blue.900'}></StackDivider>
//         <Divider borderColor={'blue.900'} orientation='horizontal'></Divider>
//         <Stack spacing={-2}>
//               <Link className='lnk' to={'/'}>
//                 <Stack direction={'row'} align={'center'} padding={'8px'} fontSize={'18px'}>
//                   <RiDashboardFill />
//                   <Text>Dashboard</Text>
//                 </Stack>
//               </Link> 
//               <Link className='lnk' to={'/inventory'}>
//                 <Stack direction={'row'} align={'center'} padding={'8px'} fontSize={'18px'}>
//                   <MdInventory />
//                   <Text>Equipment</Text>
//                 </Stack>
//               </Link> 
//               <Link className='lnk' to={'/team'}>
//                 <Stack direction={'row'} align={'center'} padding={'8px'} fontSize={'18px'}>
//                   <BsPeopleFill />
//                   <Text>Users</Text>
//                 </Stack>
//               </Link> 
//               <Link className='lnk' to={'/room'}>
//                 <Stack direction={'row'} align={'center'} padding={'8px'} fontSize={'18px'}>
//                   <RiDashboardFill />
//                   <Text>Room</Text>
//                 </Stack>
//               </Link> 
//               <Heading as='h4' size={'md'}>Statistics</Heading>
//               <Divider orientation='horizontal' borderColor={'blue.900'}></Divider>
//               <Link className='lnk' to={'/report'}>
//                 <Stack direction={'row'} align={'center'} padding={'8px'} fontSize={'18px'}>
//                   <BsPeopleFill />
//                   <Text>Report </Text>
//                 </Stack>
//               </Link> 

//           </Stack>
//       </VStack>
//     </div>
//   )
// }

// export default SideNav



//  {/*

//                   Alternative

//                 <Button><Link to='/'>dashboard</Link></Button>
//                 <Button><Link to='/inventory'>Inventory</Link></Button>
//                 <Button><Link to='/team'>Team</Link></Button>
                
//                 */}