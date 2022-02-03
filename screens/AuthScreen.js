import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Image,
  Icon,
  Pressable,
  HStack,
  Text,
} from 'native-base';
import { useDispatch } from 'react-redux';
import * as authAction from '../store/action/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

import { FontAwesome5 } from '@expo/vector-icons';
import google from '../assets/google.png';
import ENV from '../env';
import Colors from '../constants/Colors';

const AuthScreen = () => {
  const dispatch = useDispatch();

  // google block
  const [request1, response1, promptAsync1] =
    Google.useAuthRequest({
      expoClientId: ENV.googleExpoClientId,
      webClientId: ENV.googleExpoClientId,
      androidClientId: ENV.googleAndroidId,
      iosClientId: ENV.googleIosId,
    });

  useEffect(() => {
    if (response1?.type === 'success') {
      const { authentication } = response1;
      // console.log(response1);
      dispatch(
        authAction.getGoogleUser(
          authentication.accessToken,
          authentication.expiresIn
        )
      );
    }
  }, [response1, dispatch]);

  //facebook block

  const [request2, response2, promptAsync2] =
    Facebook.useAuthRequest({
      clientId: ENV.fbId,
    });

  useEffect(() => {
    if (response2?.type === 'success') {
      const { authentication } = response2;
      // console.log(authentication);
      dispatch(
        authAction.getFacebookUser(
          authentication.accessToken,
          authentication.expiresIn
        )
      );
    }
  }, [response2, dispatch]);

  return (
    <Box
      flex={1}
      justifyContent='center'
      alignItems='center'
    >
      <Pressable
        isDisabled={!request1}
        onPress={() => {
          promptAsync1();
        }}
      >
        <Box
          shadow={3}
          w='80%'
          py={2}
          px={2}
          bg='white'
          justifyContent='center'
          borderRadius='md'
        >
          <HStack
            w='100%'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Image
              w='8'
              h='8'
              source={google}
              alt='Sign in with Google'
            />
            <Text
              fontSize='xl'
              fontWeight='bold'
              color={Colors.googleColor}
            >
              Sign in with Google
            </Text>
          </HStack>
        </Box>
      </Pressable>

      <Box w='80%'>
        <Button
          w='100%'
          shadow={4}
          mt={2}
          isDisabled={!request2}
          onPress={() => {
            promptAsync2();
          }}
          leftIcon={
            <Icon
              as={FontAwesome5}
              name='facebook'
              size='md'
            />
          }
          bg={Colors.fbColor}
          _text={{
            fontSize: 'xl',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Continue with Facebook
        </Button>
      </Box>

      <Box mt={3}>
        <Button
          onPress={() => {
            dispatch(authAction.skip(true));
          }}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
};

export default AuthScreen;
