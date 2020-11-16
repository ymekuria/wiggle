import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

const TabTwoScreen: React.FC = (props) => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | undefined>();

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
            sort: Contacts.SortTypes.FirstName,
            pageSize: 0
          });

          setContacts(data);
          console.log('data', data[0]);
        }
      } catch (err) {
        console.log('error::', err);
      }
    })();
  }, []);
  // const Contact = ()

  console.log('Contacts', contacts);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab Two</Text>
      {/* <Text>First Name{contacts?.firstName}</Text>
      <Text>Last Name{contacts?.lastName}</Text> */}
      <TextInput style={styles.searchBarStyle} placeholder="Search" />
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

export default TabTwoScreen;
