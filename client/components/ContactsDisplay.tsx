import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';
import { Text, View } from '../components/Themed';
import useContacts from '../hooks/useContacts';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Context as ContactContext } from '../context/ContactContext';

const ContactsDisplay = () => {
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

  const renderContacts = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity onPress={() => onContactPress(item)}>
        <View style={styles.contactContainer}>
          <Text style={{ fontSize: 22 }}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <SearchBar
        onChangeText={searchContacts}
        value={searchInputValue}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder="Search"
      />

      <FlatList
        data={contacts}
        renderItem={renderContacts}
        keyExtractor={(contact) => contact.id.toString()}
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

export default ContactsDisplay;
