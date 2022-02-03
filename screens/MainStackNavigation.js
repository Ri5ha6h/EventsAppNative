import React from 'react';
import { useSelector } from 'react-redux';
import StackAuthNavigation from './StackAuthNavigation';
import StackEventNavigation from './StackEventNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import StartUpScreen from './StartUpScreen';

const MainStackNavigation = () => {
  const skip = useSelector(
    (state) => state.auth.skip
  );
  return (
    <NavigationContainer>
      {!skip ? <MainNav /> : <SkipNav />}
    </NavigationContainer>
  );
};

const SkipNav = () => {
  const skip = useSelector(
    (state) => state.auth.skip
  );
  return (
    <NativeBaseProvider>
      {!skip && <StackAuthNavigation />}
      {skip && <StackEventNavigation />}
    </NativeBaseProvider>
  );
};

const MainNav = () => {
  const isAuth = useSelector(
    (state) => !!state.auth.token
  );

  const didTryAutoLogin = useSelector(
    (state) => state.auth.didTryAutoLogin
  );
  return (
    <NativeBaseProvider>
      {!isAuth && !didTryAutoLogin && (
        <StartUpScreen />
      )}
      {!isAuth && didTryAutoLogin && (
        <StackAuthNavigation />
      )}

      {isAuth && <StackEventNavigation />}
    </NativeBaseProvider>
  );
};

export default MainStackNavigation;
