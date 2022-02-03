import React from 'react';
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Heading,
  Text,
  Pressable,
} from 'native-base';
import Default from '../constants/DefaultImageUrl';

const EventCard = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate(props.path, {
          eventTitle: props.title,
          eventId: props.id,
        });
      }}
      key={props.id}
    >
      <Box
        maxW='95%'
        mt={3}
        mx={2}
        rounded='lg'
        overflow='hidden'
        borderColor='coolGray.300'
        borderWidth='2'
      >
        <Box>
          <AspectRatio w='100%' ratio={16 / 9}>
            <Image
              source={{
                uri:
                  props.image !== ''
                    ? props.image
                    : Default.defaultImage,
              }}
              alt={props.title}
            />
          </AspectRatio>
        </Box>
        <Stack p='4' space={3}>
          <Stack space={2}>
            <Heading size='lg' ml='-1'>
              {props.title}
            </Heading>
            <Text
              fontSize='md'
              color='violet.500'
              fontWeight='500'
              ml='-0.5'
              mt='-1'
            >
              {props.date}
            </Text>
          </Stack>
          <Text fontSize='sm' fontWeight='500'>
            {props.address}
          </Text>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default EventCard;
