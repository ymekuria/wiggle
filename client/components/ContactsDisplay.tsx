import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';
import { Text, View } from '../components/Themed';
import useContacts from '../hooks/useContacts';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ContactsDisplay = (props) => {
  const [searchInputValue, onChangeSearchText] = useState<string>('');
  const [isContactSelected, setIsContactSelected] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const [contacts, setContacts, inMemoryContacts] = useContacts();
  const navigation = useNavigation();

  const searchContacts = (value: string) => {
    onChangeSearchText(value);
    const filteredContacts = inMemoryContacts?.filter((contact) => {
      let contactLowerCase = `${contact.firstName} ${contact.lastName}`.toLowerCase();

      let searchTermLowerCase = value.toLowerCase();

      return contactLowerCase.includes(searchTermLowerCase);
    });
    setContacts(filteredContacts);
  };

  const onContactPress = (item) => {
    console.log('item', item.phoneNumbers);
    setSelectedContact(item);
    setIsContactSelected(true);
    navigation.navigate('ContactDisplayScreen');
    console.log({ props });
  };

  const renderContacts = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onContactPress(item)}>
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
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        placeholder="Search"
      />
      {isContactSelected ? (
        <FlatList
          data={selectedContact.phoneNumbers}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.digits}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : null}
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
