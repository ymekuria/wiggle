import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Avatar } from 'react-native-elements';
import ContactContext from '../context/ContactContext';
import { Text, View } from '../components/Themed';

const ContactDisplayScreen: React.FC = () => {
  const { currentContact } = React.useContext(ContactContext);
  // const navigation = useNavigation();
  console.log('contact current', currentContact);
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Card>
        {currentContact?.imageAvailable ? (
          <Avatar
            rounded
            size="large"
            source={{ uri: currentContact?.image.uri }}
            // titleStyle={{ color: 'red' }}
          />
        ) : (
          <Avatar
            rounded
            size="large"
            title={`${currentContact?.firstName[0]}${currentContact?.lastName[0]}`}
            overlayContainerStyle={{ backgroundColor: 'gray' }}
            // titleStyle={{ color: 'red' }}
          />
        )}
        {/* <Text style={styles.title}>ContactDisplayScreen</Text> */}
        <Text>{currentContact?.name}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ContactDisplayScreen;
