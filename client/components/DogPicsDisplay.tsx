import React, { useRef, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Button } from 'react-native-elements';
import {
  useDogPicsQuery,
  useDogPicsLazyQuery
} from '../__generated__/ui_types';
import SlideIndicator from '../components/SlideIndicator';
import { Text, View } from '../components/Themed';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.5;

const DogPicsDisplay = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  // const { data, error, loading } = useDogPicsQuery();
  useEffect(() => {
    getDogPics();
  }, []);
  const [getDogPics, { loading, data }] = useDogPicsLazyQuery({
    fetchPolicy: 'network-only'
  });
  // console.log('lazyQueryResulyt', testResult[0]);

  if (loading) {
    console.log('loading', loading);
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  }
  // if (error) {
  //   console.log('error loading dogPics:', error);
  //   return (
  //     <View>
  //       <Text>Error</Text>
  //     </View>
  //   );
  // }
  console.log(data);
  const onPicPress = (item) => {};
  const onButtonPress = async () => {};
  const renderPictures = ({ item, index }) => {
    console.log('item: ', item);
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
      <TouchableOpacity onPress={() => onPicPress(item)}>
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
              <Animated.Image
                source={{
                  uri: item
                }}
                style={{
                  height: PICTURE_HEIGHT,
                  width: PICTURE_WIDTH * 1.4,
                  resizeMode: 'stretch',
                  transform: [
                    {
                      translateX
                    }
                  ]
                }}
              ></Animated.Image>
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
            { useNativeDriver: true }
          )}
          data={data?.dogPics?.pictures}
          renderItem={renderPictures}
          keyExtractor={(picture, index) => index.toString()}
        />

        <TouchableOpacity
          // style={{
          //   // position: 'absolute',
          //   flex: 0.5,
          //   backgroundColor: 'transparent'
          // }}
          onPress={() => getDogPics()}
        >
          <Text>More Dogs </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/* <SlideIndicator
        scrollX={scrollX}
        width={width}
        data={data?.dogPics?.pictures}
      /> */}
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
