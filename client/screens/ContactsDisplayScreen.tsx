import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/stack';

// ...

import { Text, View } from '../components/Themed';
import useContacts from '../hooks/useContacts';
import { SearchBar } from 'react-native-elements';

import { Context as ContactContext } from '../context/ContactContext';

const ITEM_SIZE = 66.3;
const ContactsDisplayScreen = () => {
  const HEADER_HEIGHT = useHeaderHeight();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchInputValue, onChangeSearchText] = useState<string>('');
  const [contacts, setContacts, inMemoryContacts] = useContacts();
  const { setCurrentContact } = useContext(ContactContext);

  const searchContacts = (value: string) => {
    onChangeSearchText(value);
    const filteredContacts = inMemoryContacts.filter((contact) => {
      let contactLowerCase = `${contact.firstName} ${contact.lastName}`.toLowerCase();

      let searchTermLowerCase = value.toLowerCase();

      return contactLowerCase.includes(searchTermLowerCase);
    });

    setContacts(filteredContacts);
  };

  const onContactPress = (item: Contact) => {
    setCurrentContact(item);
  };

  const renderContacts = ({
    item,
    index
  }: {
    item: Contact;
    index: number;
  }) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const opacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 0.5)
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <TouchableOpacity onPress={() => onContactPress(item)}>
        <Animated.View
          style={[styles.contactContainer, { opacity, transform: [{ scale }] }]}
        >
          <Text style={{ fontSize: 22 }}>{item?.name}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <SafeAreaView>
        <SearchBar
          onChangeText={searchContacts}
          value={searchInputValue}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
          placeholder="Search"
        />

        <Animated.FlatList
          data={contacts}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={renderContacts}
          keyExtractor={(contact) => contact.id.toString()}
          // contentContainerStyle={{ padding: 5 }}
        />
      </SafeAreaView>
    </LinearGradient>
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
    justifyContent: 'space-evenly',
    borderRadius: 10
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 20
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

export default ContactsDisplayScreen;
