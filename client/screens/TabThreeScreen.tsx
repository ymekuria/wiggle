import React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';

import { useJokeQuery } from '../__generated__/ui_types';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.5;
const TabThreeScreen: React.FC = (props) => {
  const { loading, error, data } = useJokeQuery();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    console.log(error);
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  console.log('joke', data);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab Three</Text>

      <Text>{data.joke.joke}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureContainer: {
    // margin: 5,
    width,
    // padding: 20,
    paddingTop: height / 20,

    // flex: 1,
    backgroundColor: 'transparent',

    // backgroundColor: 'rgba(247,236,250,.3)',
    // justifyContent: 'space-evenly'
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default TabThreeScreen;
