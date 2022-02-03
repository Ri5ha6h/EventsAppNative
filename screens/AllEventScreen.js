import React from 'react';
import { useSelector } from 'react-redux';
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
} from 'native-base';
import Default from '../constants/DefaultImageUrl';

const AllEventScreen = ({
  route,
  navigation,
}) => {
  const { eventId } = route.params;

  const allCategory = useSelector(
    (state) => state.category.all
  );

  const all = allCategory.find(
    (al) => al.event_id === eventId
  );

  return (
    <ScrollView>
      <Box flex={1}>
        <Box>
          <AspectRatio ratio={16 / 10}>
            <Image
              source={{
                uri:
                  all.banner_url !== ''
                    ? all.banner_url
                    : Default.defaultImage,
              }}
              alt={all.eventname_raw}
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
                {all.label}
              </Text>
            </Text>
            <Text fontSize='xl' fontWeight='bold'>
              Score:{' '}
              <Text
                fontSize='md'
                fontWeight='medium'
                color='violet.500'
              >
                {all.score.toFixed(2)}
              </Text>
            </Text>
          </HStack>
          <Text mt={3} px={3} fontSize='2xl'>
            {all.venue.full_address}
          </Text>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default AllEventScreen;
