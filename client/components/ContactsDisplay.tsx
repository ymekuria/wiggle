import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';
import { Text, View } from '../components/Themed';
import useContacts from '../hooks/useContacts';
import { SearchBar } from 'react-native-elements';

const ContactsDisplay = () => {
  const [searchInputValue, onChangeSearchText] = useState<string>('');
  const [contacts, setContacts, inMemoryContacts] = useContacts();

  const searchContacts = (value: string) => {
    onChangeSearchText(value);
    const filteredContacts = inMemoryContacts?.filter((contact) => {
      let contactLowerCase = `${contact.firstName} ${contact.lastName}`.toLowerCase();

      let searchTermLowerCase = value.toLowerCase();

      return contactLowerCase.includes(searchTermLowerCase);
    });
    setContacts(filteredContacts);
  };

  const renderContacts = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.contactContainer}>
          <Text style={{ fontSize: 22 }}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <SearchBar
        onChangeText={searchContacts}
        value={searchInputValue}
        containerStyle={styles.searchBarContainerStyle}
        inputContainerStyle={styles.searchBarInputStyle}
        inputStyle={{ fontSize: 22 }}
        placeholder="Search"
      />
      <TextInput
        style={styles.searchBarStyle}
        onChangeText={searchContacts}
        value={searchInputValue}
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

    // alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  searchBarStyle: {
    fontSize: 25,
    padding: 10
  },
  searchBarContainerStyle: {
    backgroundColor: 'rgba(247,236,250,.3)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    fontSize: 25
  },
  searchBarInputStyle: { backgroundColor: 'rgba(247,236,250,.3)', fontSize: 40 }
});

export default ContactsDisplay;
