import { FlatList, Box } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../components/EventCard';

const FavScreen = ({ navigation }) => {
  const favEvent = useSelector(
    (state) => state.category.favoriteEvents
  );

  if (favEvent.length === 0 || !favEvent) {
    return (
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
      >
        No favorite events found. Start adding
        some!!
      </Box>
    );
  }
  return (
    <FlatList
      keyExtractor={(item, index) =>
        item.event_id
      }
      data={favEvent}
      renderItem={({ item }) => (
        <EventCard
          id={item.event_id}
          navigation={navigation}
          path='Event'
          image={item.banner_url}
          title={item.eventname_raw}
          date={item.label}
          address={item.venue.full_address}
        />
      )}
    />
  );
};

export default FavScreen;
