import React from 'react';
import MainStackNavigation from './screens/MainStackNavigation';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import categoryReducer from './store/reducer/category';
import authReducer from './store/reducer/auth';
import { SSRProvider } from '@react-aria/ssr';
import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

WebBrowser.maybeCompleteAuthSession();

const rootReducer = combineReducers({
  category: categoryReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);


const App = () => {
  
  return (
    <Provider store={store}>
      <SSRProvider>
        <MainStackNavigation />
      </SSRProvider>
    </Provider>
  );
};

export default App;
