import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import {
  Box,
  Pressable,
  Spinner,
  Avatar,
} from 'native-base';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import * as categoryAction from '../store/action/category';
import {
  Platform,
  VirtualizedList,
} from 'react-native';
import Default from '../constants/DefaultImageUrl';
import LoginAlert from '../components/LoginAlert';
import EventMenu from '../components/EventMenu';
import EventCard from '../components/EventCard';
import PopAvatar from '../components/PopAvatar';

let user = {
  userImage: '',
  username: '',
  userEmail: '',
};

const MainScreen = ({ navigation }) => {
  const [show, setShow] = useState(true);
  const isShow = useRef(true);
  const [mainTitle, setMainTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.category.categories
  );

  const allCategory = useSelector(
    (state) => state.category.all
  );
  const category = useSelector(
    (state) => state.category.category
  );

  const count = useSelector(
    (state) => state.category.count
  );

  const gUser = useSelector(
    (state) => state.auth.gUser
  );

  const fUser = useSelector(
    (state) => state.auth.fUser
  );
  // console.log(gUser);
  // console.log(userImageUrl);
  // console.log(allCategory);
  useEffect(() => {
    isShow.current = show;
    dispatch(categoryAction.fetchCategories());
    dispatch(categoryAction.allCategory());
    if (gUser) {
      user.username = gUser.name;
      user.userImage = gUser.picture;
      user.userEmail = gUser.email;
    }
    if (fUser) {
      user.username = fUser.name;
      user.userImage = fUser.picture.data.url;
      user.userEmail = fUser.email;
    }
  }, [
    dispatch,
    user.username,
    show,
    user.userImage,
    user.userEmail,
  ]);

  const titleFunc = (data) => {
    setMainTitle(data);
  };

  const loadFunc = (data) => {
    setLoading(data);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        mainTitle === ''
          ? 'Events'
          : mainTitle.toUpperCase(),
      headerLeft: () => (
        <EventMenu
          categories={categories}
          navigation={navigation}
          loading={loadFunc}
          title={titleFunc}
        />
      ),
      headerRight: () =>
      gUser || fUser ? (
        <PopAvatar
          image={user.userImage}
          name={user.username}
          email={user.userEmail}
          skip={false}
        />
      ) : (
        <PopAvatar skip={true} />
      ),
    });
  }, [
    navigation,
    categories,
    mainTitle,
    user.username,
    gUser,
    fUser,
    user.userImage,
    user.userEmail,
  ]);

  const LoginSuccess = useCallback(() => {
    if (gUser || fUser) {
      return (
        <LoginAlert
          open={show}
          image={user.userImage}
          press={() => {
            setShow(false);
          }}
          name={user.username}
        />
      );
    }
  }, [
    gUser,
    fUser,
    user.userImage,
    user.username,
  ]);

  return (
    <Box
      flex={1}
      alignItems='center'
      justifyContent='center'
    >
      {/* {isShow.current && <LoginSuccess />} */}

      {mainTitle === '' ? (
        <VirtualizedList
          keyExtractor={(item, index) => item.id}
          data={allCategory}
          renderItem={({ item }) => (
            <EventCard
              id={item.id}
              navigation={navigation}
              path='AllEvent'
              image={item.imageUrl}
              title={item.title}
              date={item.date}
              address={item.address}
            />
          )}
          initialNumToRender={2}
          getItemCount={(data) => count}
          getItem={(data, index) => ({
            id: data[index].event_id,
            title: data[index].eventname_raw,
            date: data[index].label,
            imageUrl: data[index].banner_url,
            address:
              data[index].venue.full_address,
          })}
        />
      ) : loading === true ? (
        <Spinner size='lg' />
      ) : (
        <VirtualizedList
          keyExtractor={(item, index) => item.id}
          data={category}
          renderItem={({ item }) => (
            <EventCard
              id={item.id}
              navigation={navigation}
              path='Event'
              image={item.imageUrl}
              title={item.title}
              date={item.date}
              address={item.address}
            />
          )}
          initialNumToRender={2}
          getItemCount={(data) => count}
          getItem={(data, index) => ({
            id: data[index].event_id,
            title: data[index].eventname_raw,
            date: data[index].label,
            imageUrl: data[index].banner_url,
            address:
              data[index].venue.full_address,
          })}
        />
      )}
    </Box>
  );
};

export default MainScreen;
