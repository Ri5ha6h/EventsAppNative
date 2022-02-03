import React, {
  useCallback,
  useState,
} from 'react';
import {
  Menu,
  Pressable,
  Box,
  HamburgerIcon,
} from 'native-base';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import * as categoryAction from '../store/action/category';

const EventMenu = (props) => {
  // const [loading, setLoading] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();

  // props.loading(loading);
  const handleMenuItem = useCallback(
    async (categoryDatum, categoryUrl) => {
      props.loading(true);
      try {
        await dispatch(
          categoryAction.getCategory(categoryUrl)
        );
        navigation.navigate('Main');
        props.title(categoryDatum);
        props.loading(false);
      } catch (err) {
        console.log(err.message);
      }
    },
    [navigation, dispatch]
  );

  return (
    <Menu
      w='190'
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel='More options menu'
            {...triggerProps}
          >
            <Box p={2}>
              <HamburgerIcon
                color={
                  Platform.OS === 'android'
                    ? 'white'
                    : 'lightBlue.500'
                }
              />
            </Box>
          </Pressable>
        );
      }}
    >
      {props.categories.map((cat) => (
        <Menu.Item
          _text={{
            fontSize: 'lg',
            fontWeight: 'bold',
            letterSpacing: 'lg',
            color: 'coolGray.600',
          }}
          key={cat.category}
          onPress={() => {
            handleMenuItem(
              cat.category,
              cat.data
            );
          }}
        >
          {cat.category.toUpperCase()}
        </Menu.Item>
      ))}
      <Menu.Item
        _text={{
          fontSize: 'lg',
          fontWeight: 'bold',
          letterSpacing: 'lg',
          color: 'coolGray.600',
        }}
        onPress={() => {
          navigation.navigate('Fav');
        }}
      >
        Favorite
      </Menu.Item>
    </Menu>
  );
};

export default EventMenu;
