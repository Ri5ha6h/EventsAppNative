import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const SKIP = 'SKIP';
export const LOGOUT = 'LOGOUT';

let timer;

export const skip = (val) => {
  return async (dispatch) => {
    const expoToken =
      await registerForPushNotificationsAsync();
    dispatch({
      type: SKIP,
      detail: { skip: val, expoToken: expoToken },
    });
  };
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (
  token,
  gUser,
  fUser,
  expoToken,
  expireDate
) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expireDate));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      gUser: gUser,
      fUser: fUser,
      expo: expoToken,
    });
  };
};

export const getGoogleUser = (
  token,
  expiresIn
) => {
  return async (dispatch) => {
    const expoToken =
      await registerForPushNotificationsAsync();

    // console.log(expoToken);
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    if (!response.ok) {
      throw new Error(
        'Something went wrong while fetching google user!!'
      );
    }
    const googleUser = await response.json();

    dispatch(
      authenticate(
        token,
        googleUser,
        null,
        expoToken,
        parseInt(expiresIn) * 1000
      )
    );
    const expireDate = new Date(
      new Date().getTime() +
        parseInt(expiresIn) * 1000
    );
    saveDataToStorage(
      token,
      googleUser,
      null,
      expoToken,
      expireDate
    );
  };
};

export const getFacebookUser = (
  token,
  expiresIn
) => {
  return async (dispatch) => {
    const expoToken =
      await registerForPushNotificationsAsync();
    const fbResp = await fetch(
      `https://graph.facebook.com/me?fields=name,gender,picture,email&access_token=${token}`
    );
    if (!fbResp.ok) {
      throw new Error(
        'Something went wrong while fetching facebook user!!'
      );
    }
    const fbUser = await fbResp.json();

    dispatch(
      authenticate(
        token,
        null,
        fbUser,
        expoToken,
        parseInt(expiresIn)
      )
    );
    const expireDate = new Date(
      new Date().getTime() + parseInt(expiresIn)
    );
    saveDataToStorage(
      token,
      null,
      fbUser,
      expoToken,
      expireDate
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expireDate) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expireDate);
  };
};

const saveDataToStorage = (
  token,
  gUser,
  fUser,
  expoToken,
  expireDate
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      gUser: gUser,
      fUser: fUser,
      expoToken: expoToken,
      expireDate: expireDate.toISOString(),
    })
  );
};

const registerForPushNotificationsAsync =
  async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } =
          await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert(
          'Failed to get push token for push notification!'
        );
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync()
      ).data;
      // console.log(token);
    } else {
      alert(
        'Must use physical device for Push Notifications'
      );
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync(
        'default',
        {
          name: 'default',
          importance:
            Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        }
      );
    }

    return token;
  };
