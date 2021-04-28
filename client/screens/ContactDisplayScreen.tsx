import React, { useContext } from 'react';
import { StyleSheet, FlatList, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as Contacts from 'expo-contacts';
import { Card, Avatar } from 'react-native-elements';
import { Context as ContactContext } from '../context/ContactContext';
import { Context as WiggleContext } from '../context/WiggleContext';
import { Text, View } from '../components/Themed';
import AvatarDisplay from '../components/AvatarDisplay';
import PhoneNumbersDisplay from '../components/PhoneNumbersDisplay';
import { Contact } from 'expo-contacts';
import BirthdayDisplay from '../components/BirthdayDisplay';
const { width, height } = Dimensions.get('screen');
const ContactDisplayScreen: React.FC = () => {
  const { currentContact } = useContext(ContactContext);
  const { selectedWiggle } = useContext(WiggleContext);

  console.log('currentContact:', currentContact);
  console.log('selectedWiggle', selectedWiggle);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Card containerStyle={styles.cardContainer}>
        <AvatarDisplay contact={currentContact} />
        <Card.Divider />
        <PhoneNumbersDisplay phoneNumbers={currentContact?.phoneNumbers} />
        {/* <Card.Divider /> */}
        <BirthdayDisplay birthday={currentContact?.birthday} />
      </Card>

      <Modal visible={false} transparent={true} animationType="slide">
        <View>
          <Text>Modal Content</Text>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.125

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  contactContainer: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(247,236,250,.3)',
    justifyContent: 'space-evenly'
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(247,236,250,.3)',
    borderWidth: 0,
    borderRadius: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ContactDisplayScreen;
