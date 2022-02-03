import { Text, Box } from 'native-base';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';

// const CustomHeaderWebView = (props) => {
//   const { uri, onLoadStart, ...restProps } =
//     props;
//   const [currentURI, setURI] = useState(
//     props.source.uri
//   );
//   const newSource = {
//     ...props.source,
//     uri: currentURI,
//   };
//   return (
//     <WebView
//       {...restProps}
//       source={newSource}
//       onLoadStart={(navState) =>
//         setURI(navState.nativeEvent.url)
//       }
//       // onShouldStartLoadWithRequest={(request) => {
//       //   // If we're loading the current URI, allow it to load
//       //   if (request.url === currentURI)
//       //     return true;
//       //   // We're loading a new URL -- change state first
//       //   setURI(request.url);
//       //   return false;
//       // }}
//     />
//   );
// };

// const ViewComp = () => {
//   return (
//     <CustomHeaderWebView
//       style={styles.container}
//       originWhitelist={['*']}
//       source={{
//         uri: 'https://allevents.in/',
//         headers: {
//           // name: 'Rishabh Malik',
//           // PHPSESSID: 'nlv1vg49sarbv2d4r742e3op54',
//           Cookie:
//             'PHPSESSID=nlv1vg49sarbv2d4r742e3op54',
//           // Cookies:
//           //   'PHPSESSID=nlv1vg49sarbv2d4r742e3op54',
//         },
//       }}
//       sharedCookiesEnabled={true}
//     />
//   );
// };

const ViewComp = () => {
  const [URI, setURI] = useState(
    'https://new-beta.allevents.in/test/ruchit/sess.php'
  );
  // console.log(URI);
  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{
        uri: URI,
        // headers: {
        //   Cookie:
        //     'PHPSESSID=nlv1vg49sarbv2d4r742e3op54',
        // },
      }}
      onLoadStart={(navState) => {
        setURI(navState.nativeEvent.url);
        CookieManager.set(URI, {
          name: 'PHPSESSID',
          value: 'nlv1vg49sarbv2d4r742e3op54',
          domain: 'some domain',
          path: '/',
        }).then((done) => {
          console.log(
            'CookieManager.set =>',
            done
          );
        });
      }}
      onShouldStartLoadWithRequest={(request) => {
        // If we're loading the current URI, allow it to load
        if (request.url === URI) {
          return true;
        }
        // We're loading a new URL -- change state first
        setURI(request.url);
        return false;
      }}
      sharedCookiesEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewComp;

// https://allevents.in/
// https://new-beta.allevents.in/test/ruchit/sess.php
