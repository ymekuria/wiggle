import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import { Card, Avatar } from 'react-native-elements';
import { Context as ContactContext } from '../context/ContactContext';
import { Text, View } from '../components/Themed';
import AvatarDisplay from '../components/AvatarDisplay';
import PhoneNumbersDisplay from '../components/PhoneNumbersDisplay';
import { Contact } from 'expo-contacts';
import BirthdayDisplay from '../components/BirthdayDisplay';

const ContactDisplayScreen: React.FC = () => {
  const { currentContact } = useContext(ContactContext);
  // const navigation = useNavigation();
  console.log('contact current', currentContact);

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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderWidth: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ContactDisplayScreen;
