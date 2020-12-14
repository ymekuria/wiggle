import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type PhoneNumbersDisplayProps = {
  phoneNumbers: any;
};

const renderPhoneNumbers = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.phoneNumberContainer}>
        <Text>{item.label}</Text>
        <Text>{item.digits}</Text>
      </View>
    </TouchableOpacity>
  );
};
const PhoneNumbersDisplay: React.FC<PhoneNumbersDisplayProps> = ({
  phoneNumbers
}) => {
  return (
    <FlatList
      data={phoneNumbers}
      renderItem={renderPhoneNumbers}
      keyExtractor={(number) => number.id}
    />
  );
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(247,236,250,.3)',
    justifyContent: 'space-evenly'
  }
});

export default PhoneNumbersDisplay;
