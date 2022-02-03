import * as authAction from '../store/action/auth';

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { Center, Spinner } from 'native-base';

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem(
        'userData'
      );
      if (!userData) {
        dispatch(authAction.setDidTryAL());
        return;
      }
      const transformedData =
        JSON.parse(userData);
      const {
        token,
        gUser,
        fUser,
        expoToken,
        expireDate,
      } = transformedData;
      const expirationDate = new Date(expireDate);

      if (
        expirationDate <= new Date() ||
        !token
      ) {
        dispatch(authAction.setDidTryAL());
        return;
      }

      const expireTime =
        expirationDate.getTime() -
        new Date().getTime();

      dispatch(
        authAction.authenticate(
          token,
          gUser,
          fUser,
          expoToken,
          expireTime
        )
      );
    })();
  }, [dispatch]);
  return (
    <Center flex={1}>
      <Spinner color='cyan.500' />
    </Center>
  );
};

export default StartUpScreen;
