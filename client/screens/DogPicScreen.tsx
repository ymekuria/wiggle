import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { useDogPicQuery } from '../__generated__/ui_types';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';

const DogPicDisplayScreen: React.FC = (props) => {
  const { loading, error, data } = useDogPicQuery();

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

  console.log('pic uri', data?.dogPic?.picture);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Dog Pic</Text>

      <Image
        source={{
          uri: `${data?.dogPic?.picture}`
        }}
        style={{ height: '45%', width: '100%', resizeMode: 'contain' }}
      ></Image>
    </LinearGradient>
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
  }
});

export default DogPicDisplayScreen;
