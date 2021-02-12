import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native-elements';
import { useDogPicsQuery } from '../__generated__/ui_types';
import SlideIndicator from '../components/SlideIndicator';
import { Text, View } from '../components/Themed';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.5;

const DogPicsDisplay = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { data, error, loading } = useDogPicsQuery();

  if (loading) {
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  }
  if (error) {
    console.log('error loading dogPics:', error);
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  const onPicPress = (item) => {};

  const renderPictures = ({ item }) => {
    console.log('item: ', item);
    return (
      <TouchableOpacity onPress={() => onPicPress(item)}>
        <View style={styles.pictureContainer}>
          <View
            style={{
              borderRadius: 18,
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 20,
              shadowOffset: {
                width: 0,
                height: 0
              },

              padding: 12,
              backgroundColor: 'white'
            }}
          >
            <View
              style={{
                alignItems: 'center',

                width: PICTURE_WIDTH,
                height: PICTURE_HEIGHT,
                overflow: 'hidden',
                borderRadius: 14
              }}
            >
              <Image
                source={{
                  uri: item
                }}
                style={{
                  height: PICTURE_HEIGHT,
                  width: PICTURE_WIDTH,
                  resizeMode: 'stretch'
                }}
              ></Image>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <SafeAreaView>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          data={data?.dogPics?.pictures}
          renderItem={renderPictures}
          keyExtractor={(picture, index) => index.toString()}
        />
      </SafeAreaView>
      <SlideIndicator
        scrollX={scrollX}
        width={width}
        data={data?.dogPics?.pictures}
      />
    </LinearGradient>
    // <Image
    //   source={{
    //     uri: `${data?.dogPics?.pictures[0]}`
    //   }}
    //   style={{ height: '20%', width: '80%', resizeMode: 'contain' }}
    // ></Image>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
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
  }
});

export default DogPicsDisplay;
