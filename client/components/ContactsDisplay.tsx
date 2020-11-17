import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import {
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';
import { Text, View } from '../components/Themed';
import useContacts from '../hooks/useContacts';

const ContactsDisplay = () => {
  const [contacts] = useContacts();

  const renderContacts = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => console.log(item.firstName)}>
        <View style={styles.contactContainer}>
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <TextInput style={styles.searchBarStyle} placeholder="Search" />
      <FlatList
        data={contacts}
        renderItem={renderContacts}
        keyExtractor={(contact) => contact.id}
      ></FlatList>
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
    fontSize: 25
  }
});

export default ContactsDisplay;
