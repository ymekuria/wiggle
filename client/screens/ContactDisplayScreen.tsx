import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Avatar } from 'react-native-elements';
import ContactContext from '../context/ContactContext';
import { Text, View } from '../components/Themed';
import AvatarDisplay from '../components/AvatarDisplay';

const ContactDisplayScreen: React.FC = () => {
  const { currentContact } = React.useContext(ContactContext);
  // const navigation = useNavigation();
  console.log('contact current', currentContact);
  const renderAvatar = (currentContact) => {
    return currentContact?.imageAvailable ? (
      <Avatar
        rounded
        size="xlarge"
        source={{ uri: currentContact?.image.uri }}
        containerStyle={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        }}
        avatarStyle={{ justifyContent: 'center' }}
      />
    ) : (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'rgba(247,236,250,.3)'
        }}
      >
        <Avatar
          rounded
          size="xlarge"
          title={`${currentContact?.firstName[0]}${currentContact?.lastName[0]}`}
          overlayContainerStyle={{
            backgroundColor: 'gray',
            justifyContent: 'center'
          }}
          containerStyle={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          avatarStyle={{ justifyContent: 'center' }}
        />
      </View>
    );
  };

  const renderContacts = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.contactContainer}>
          <Text>{item.label}</Text>
          <Text>{item.digits}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Card containerStyle={styles.cardContainer}>
        <AvatarDisplay currentContact={currentContact} />
        {/* <Text style={styles.title}>ContactDisplayScreen</Text> */}
        <Text>{currentContact?.name}</Text>

        {/* <Text>{currentContact?.phoneNumbers[0].number}</Text> */}
        <Card.Divider />
        <FlatList
          data={currentContact?.phoneNumbers}
          renderItem={renderContacts}
          keyExtractor={(contact) => contact.id.toString()}
        />
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
