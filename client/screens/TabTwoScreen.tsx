import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import * as Contacts from 'expo-contacts';
import { useAuth0 } from '../hooks/useAuth0';
import ContactsDisplay from '../components/ContactsDisplay';

const TabTwoScreen: React.FC = (props) => {
  const { accessToken } = useAuth0();

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab Two</Text>
      <ContactsDisplay />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default TabTwoScreen;
