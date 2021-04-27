import React, { useContext, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, Pressable } from 'react-native';

import { useJokeQuery, useJokeLazyQuery } from '../__generated__/ui_types';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { Context as WiggleContext } from '../context/WiggleContext';
import Loading from '../components/Loading';
import Navigation from '../navigation';
import PressableOpacity from '../components/PressableOpacity';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.5;
const JokeDisplayScreen: React.FC = ({ navigation }) => {
  const [getJoke, { loading, data }] = useJokeLazyQuery();
  const { setSelectedWiggle } = useContext(WiggleContext);
  useEffect(() => {
    getJoke();
  }, []);
  if (loading) {
    return <Loading />;
  }
  // if (error) {
  //   console.log(error);
  //   return (
  //     <View>
  //       <Text>Error...</Text>
  //     </View>
  //   );
  // }
  const onJokePress = (joke) => {
    setSelectedWiggle({ wiggle: joke, type: 'joke' });
    navigation.navigate('TabTwo', { screen: 'ContactsDisplayScreen' });
  };
  // console.log('joke', data);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <PressableOpacity onPress={() => onJokePress(data?.joke.joke)}>
        <View style={styles.pictureContainer}>
          <View
            style={{
              borderRadius: 18,
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 30,
              shadowOffset: {
                width: 0,
                height: 0
              },

              padding: 12,
              backgroundColor: 'transparent'
            }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: PICTURE_WIDTH,
                height: PICTURE_HEIGHT,
                overflow: 'hidden',
                borderRadius: 14
              }}
            >
              <Text style={styles.jokeText}>{data?.joke.joke}</Text>
            </View>
          </View>
        </View>
      </PressableOpacity>
      <PressableOpacity>
        <View
          style={{
            margin: 20,
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'rgba(247,236,250,.3)'
          }}
        >
          <Text>Next Joke</Text>
        </View>
      </PressableOpacity>
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
  },
  jokeText: {
    fontSize: 20
  }
});

export default JokeDisplayScreen;
