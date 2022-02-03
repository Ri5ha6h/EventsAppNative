import React from 'react'
import { Box, Collapse, Alert, HStack, VStack, Avatar, IconButton, CloseIcon, Text } from 'native-base';
import Default from '../constants/DefaultImageUrl';

const LoginAlert = (props) => {
    return (
        <Box
          w='90%'
          h={
            Platform.OS === 'android'
              ? '40%'
              : '25%'
          }
          py={6}
          borderRadius='md'
        >
          <Collapse isOpen={props.open}>
            <Alert
              w='100%'
              h='100%'
              status='success'
            >
              <HStack
                w='100%'
                justifyContent='space-between'
                alignItems='center'
              >
                <Avatar
                  size='12'
                  // mb={Platform.OS === 'android' ? 0 : 3}
                  source={{
                    uri:
                      props.image !== ''
                        ?  props.image
                        : Default.profile,
                  }}
                ></Avatar>
                <IconButton
                  variant='unstyled'
                  icon={
                    <CloseIcon
                      size='4'
                      color='coolGray.600'
                    />
                  }
                  onPress={props.press}
                />
              </HStack>

              <VStack mt='2'>
                <Text
                  fontSize='lg'
                  fontWeight='bold'
                >
                  Login Successful!!
                </Text>
                <Text fontSize='lg'>
                  Welcome to events, {props.name}
                </Text>
              </VStack>
            </Alert>
          </Collapse>
        </Box>
    )
}

export default LoginAlert
