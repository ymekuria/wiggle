import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import ContactsDisplay from '../components/ContactsDisplay';

const TabTwoScreen: React.FC = (props) => {
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab Two</Text>
      <ContactsDisplay />
      {/* <Text>First Name{contacts?.firstName}</Text>
      <Text>Last Name{contacts?.lastName}</Text> */}
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
    // alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  searchBarStyle: {
    fontSize: 25
  }
});

export default TabTwoScreen;
