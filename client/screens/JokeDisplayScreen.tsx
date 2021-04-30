import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Pressable, Animated } from 'react-native';

import {
  useJokeQuery,
  useJokeLazyQuery,
  useJokesLazyQuery
} from '../__generated__/ui_types';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { Context as WiggleContext } from '../context/WiggleContext';
import Loading from '../components/Loading';
import SlideIndicator from '../components/SlideIndicator';
import Navigation from '../navigation';
import PressableOpacity from '../components/PressableOpacity';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.45;

const JokeDisplayScreen: React.FC = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { setSelectedWiggle } = useContext(WiggleContext);
  const [getJokes, { loading, data }] = useJokesLazyQuery({
    fetchPolicy: 'network-only'
  });
  useEffect(() => {
    getJokes();
  }, []);
  console.log('jokes', data);
  if (loading) {
    return <Loading />;
  }

  const onJokePress = (joke) => {
    setSelectedWiggle({ wiggle: joke, type: 'joke' });
    navigation.navigate('TabTwo', { screen: 'ContactsDisplayScreen' });
  };

  const renderJokes = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.7, 0, width * 0.7]
    });

    return (
      <PressableOpacity onPress={() => onJokePress(item.joke)}>
        <View style={styles.carouselContainer}>
          <View style={styles.parallaxContainer}>
            <View style={styles.jokeContainer}>
              <Animated.View
                style={[
                  styles.jokeStyles,
                  {
                    transform: [{ translateX }]
                  }
                ]}
              >
                <Text style={styles.jokeText}>{item.joke}</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </PressableOpacity>
    );
  };
  // console.log('joke', data);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        removeClippedSubviews
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data?.jokes}
        renderItem={renderJokes}
        keyExtractor={(joke, index) => index.toString()}
      />

      <SlideIndicator scrollX={scrollX} width={width} data={data?.jokes} />

      <Button style={{ flex: 0.17 }} onPress={() => getJokes()}>
        <Text>More Jokes</Text>
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.125
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  carouselContainer: {
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
  parallaxContainer: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0
    },

    padding: 12,
    backgroundColor: 'rgba(247,236,250,.3)'
  },
  jokeContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: PICTURE_WIDTH,
    height: PICTURE_HEIGHT,
    overflow: 'hidden',
    borderRadius: 14
  },
  jokeStyles: {
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.05
  },

  jokeText: {
    fontSize: 20
  }
});

export default JokeDisplayScreen;
