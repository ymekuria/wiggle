import React, { useRef, useEffect, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native-elements';
import { useDogPicsLazyQuery } from '../__generated__/ui_types';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabOneParamList } from '../navigation/BottomTabNavigator';
import SlideIndicator from '../components/SlideIndicator';
import { Text } from '../components/Themed';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { Context as WiggleContext } from '../context/WiggleContext';
import PressableOpacity from '../components/PressableOpacity';

const { width, height } = Dimensions.get('screen');
const PICTURE_WIDTH = width * 0.66;
const PICTURE_HEIGHT = height * 0.45;

type DogPicsDisplayScreenProps = {
  navigation: StackNavigationProp<TabOneParamList>;
};
const DogPicsDisplayScreen: React.FC<DogPicsDisplayScreenProps> = ({
  navigation
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { setSelectedWiggle } = useContext(WiggleContext);
  const [getDogPics, { loading, data }] = useDogPicsLazyQuery({
    fetchPolicy: 'network-only'
  });
  useEffect(() => {
    getDogPics();
  }, []);

  if (loading) {
    console.log('loading', loading);
    return <Loading />;
  }

  const onPicPress = (item) => {
    setSelectedWiggle({ wiggle: item, type: 'pic' });
    navigation.navigate('TabTwo', { screen: 'ContactsDisplayScreen' });
  };
  const onButtonPress = async () => {};
  const renderPictures = ({ item, index }) => {
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
      <PressableOpacity onPress={() => onPicPress(item)}>
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
      </PressableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      {/* <SafeAreaView> */}

      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        removeClippedSubviews
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data?.dogPics?.pictures}
        renderItem={renderPictures}
        keyExtractor={(picture, index) => index.toString()}
      />

      {/* </SafeAreaView> */}

      <SlideIndicator
        scrollX={scrollX}
        width={width}
        data={data?.dogPics?.pictures}
      />

      <Button style={{ flex: 0.17 }} onPress={() => getDogPics()}>
        <Text>More Dogs</Text>
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.125,
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

export default DogPicsDisplayScreen;
