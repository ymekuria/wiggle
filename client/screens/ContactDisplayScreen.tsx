import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContactContext from '../context/ContactContext';

const ContactDisplayScreen: React.FC = () => {
  const { currentContact } = React.useContext(ContactContext);
  // const navigation = useNavigation();
  console.log('contact current', currentContact);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>ContactDisplayScreen</Text>
      <Text>
        {currentContact?.currentContact?.firstName}{' '}
        {currentContact?.currentContact?.lastName}
      </Text>
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
  }
});

export default ContactDisplayScreen;
