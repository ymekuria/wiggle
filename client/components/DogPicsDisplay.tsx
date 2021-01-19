import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useDogPicsQuery } from '../__generated__/ui_types';

import { Text, View } from '../components/Themed';

const DogPicsDisplay = () => {
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

  const onPicPress = (item) => {
    console.log('item', item);
  };

  const renderPictures = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPicPress(item)}>
        <View style={styles.contactContainer}>
          <Text style={{ fontSize: 22 }}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={data?.dogPics?.pictures}
        renderItem={renderPictures}
        keyExtractor={(picture) => picture.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contactContainer: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(247,236,250,.3)',
    justifyContent: 'space-evenly'
  },
  searchBar: {
    fontSize: 25,
    padding: 10
  },
  searchBarContainer: {
    backgroundColor: 'rgba(247,236,250,.3)',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchBarInputContainer: {
    backgroundColor: 'rgba(247,236,250,.3)'
  },
  searchBarInput: { fontSize: 22 }
});

export default DogPicsDisplay;
