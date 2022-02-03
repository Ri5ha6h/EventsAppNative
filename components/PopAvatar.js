import React from 'react';
import {
  Popover,
  Button,
  Box,
  Pressable,
  Text,
  Avatar,
} from 'native-base';
import Default from '../constants/DefaultImageUrl';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import * as authAction from '../store/action/auth';

const PopAvatar = (props) => {
  const dispatch = useDispatch();
  const expoToken = useSelector(
    (state) => state.auth.expoToken
  );
  return (
    <Box>
      <Popover
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps}>
              <Avatar
                size='10'
                mb={
                  Platform.OS === 'android'
                    ? 0
                    : 3
                }
                source={{
                  uri: props.skip
                    ? Default.profile
                    : props.image === ''
                    ? Default.profile
                    : props.image,
                }}
              >
                {props.skip ? null : (
                  <Avatar.Badge bg='green.500' />
                )}
              </Avatar>
            </Pressable>
          );
        }}
      >
        <Popover.Content
          accessibilityLabel='user details'
          w='56'
          m={2}
        >
          <Popover.Arrow />
          <Popover.Header>
            {props.skip
              ? 'Dummy'
              : 'User Details'}
          </Popover.Header>
          {props.skip ? (
            <Popover.Body>
              <Text>{expoToken}</Text>
            </Popover.Body>
          ) : (
            <Popover.Body>
              <Text>{props.name}</Text>
              <Text>{props.email}</Text>
              <Text>{expoToken}</Text>
            </Popover.Body>
          )}
          <Popover.Footer justifyContent='flex-start'>
            {props.skip ? (
              <Button
                colorScheme='danger'
                onPress={() => {
                  dispatch(
                    authAction.skip(false)
                  );
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                colorScheme='danger'
                onPress={() => {
                  dispatch(authAction.logout());
                }}
              >
                Logout
              </Button>
            )}
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

export default PopAvatar;
