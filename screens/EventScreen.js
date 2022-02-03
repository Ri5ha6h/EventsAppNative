import React, {
  useLayoutEffect,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
  Pressable,
  Icon,
  Button,
} from 'native-base';
import Default from '../constants/DefaultImageUrl';
import { Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as categoryAction from '../store/action/category';
import * as Notifications from 'expo-notifications';
import ViewComp from '../components/ViewComp';

let sub = 'like';

const EventScreen = ({ route, navigation }) => {
  const { eventId } = route.params;

  const [notification, setNotification] =
    useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const category = useSelector(
    (state) => state.category.category
  );

  const event = category.find(
    (evnt) => evnt.event_id === eventId
  );

  const currentFavEvent = useSelector((state) =>
    state.category.favoriteEvents.some(
      (event) => event.event_id === eventId
    )
  );

  const expoToken = useSelector(
    (state) => state.auth.expoToken
  );

  const dispatch = useDispatch();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const type =
            response.notification.request.content
              .data.type;
          if (!type) {
            return;
          }
          navigation.navigate(type);
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(
        responseListener.current
      );
    };
  }, [navigation]);

  const schedulePushNotification = async () => {
    await fetch(
      'https://exp.host/--/api/v2/push/send',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: expoToken,
          title: 'Sent via Event app!',
          body: `You ${sub} this ${event.eventname_raw} event!`,
          data: {
            type: 'Fav',
          },
        }),
      }
    );
  };

  const favHandler = useCallback(async () => {
    dispatch(
      categoryAction.toggleFavorite(eventId)
    );
    await schedulePushNotification();
    if (currentFavEvent) {
      sub = 'Like';
    } else {
      sub = 'Unlike';
    }
  }, [dispatch, eventId, sub, currentFavEvent]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={favHandler}>
          <Icon
            as={Entypo}
            name={
              currentFavEvent
                ? 'star'
                : 'star-outlined'
            }
            color={
              Platform.OS === 'ios'
                ? Colors.heading
                : 'white'
            }
          />
        </Pressable>
      ),
    });
  }, [navigation, currentFavEvent]);

  return (
    <ScrollView>
      <Box flex={1}>
        <Box>
          <AspectRatio ratio={16 / 10}>
            <Image
              source={{
                uri:
                  event.banner_url !== ''
                    ? event.banner_url
                    : Default.defaultImage,
              }}
              alt={event.eventname_raw}
            />
          </AspectRatio>
        </Box>
        <VStack>
          <HStack
            justifyContent='space-around'
            my={2}
          >
            <Text fontSize='xl' fontWeight='bold'>
              Date:{' '}
              <Text
                fontSize='md'
                fontWeight='medium'
                color='violet.500'
              >
                {event.label}
              </Text>
            </Text>
            <Text fontSize='xl' fontWeight='bold'>
              Score:{' '}
              <Text
                fontSize='md'
                fontWeight='medium'
                color='violet.500'
              >
                {event.score.toFixed(2)}
              </Text>
            </Text>
          </HStack>
          <Text mt={3} px={3} fontSize='2xl'>
            {event.venue.full_address}
          </Text>
        </VStack>
        <HStack justifyContent='center'>
          <Button
            onPress={() =>
              navigation.navigate('Web')
            }
            w='30%'
            h='10'
          >
            Click
          </Button>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default EventScreen;
