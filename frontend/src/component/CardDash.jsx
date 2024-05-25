import { Card, CardHeader, Heading ,HStack ,StackDivider , Text ,Box, CardBody, Divider } from '@chakra-ui/react'
import React from 'react'

function CardDash({orientation,count , title}) {
  return (
    <Card size={'lg'} direction={orientation} width={'15vw'} height={'100%'} variant={'elevated'} textAlign={'center'}>
      <CardHeader>
        <Heading color={'blackAlpha.900'} size={'sm'} as={'h6'} width={'100%'}>
              <Text  textTransform={'uppercase'}>{title}</Text>
        </Heading>
      </CardHeader>
      <CardBody textAlign={'center'}>
          < HStack divider={<StackDivider bgColor={'black'} width={'2px'}/>} align={'stretch'}>
            {orientation == 'row' ? <Divider />: null}
                        <Box width={'100%'}>
                            <Text>{count}</Text>
                        </Box>
            </HStack>
      </CardBody>
    </Card>
  )
}

export default CardDash