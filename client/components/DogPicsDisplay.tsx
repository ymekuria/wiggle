import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native-elements';
import { useDogPicsQuery, DogPic } from '../__generated__/ui_types';

import { Text, View } from '../components/Themed';

const { width, height } = Dimensions.get('screen');

const DogPicsDisplay = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
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
        <Text>Error{error}</Text>
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
              justifyContent: 'center',
              backgroundColor: 'transparent',
              paddingTop: height / 20
            }}
          >
            <Image
              source={{
                uri: item
              }}
              style={{
                height: height / 2,
                width: width / 1.5,
                resizeMode: 'stretch',
                borderRadius: 15
              }}
            ></Image>
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
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
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
    padding: 20,
    width: width,
    // flex: 1,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(247,236,250,.3)',
    // justifyContent: 'space-evenly'
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default DogPicsDisplay;
