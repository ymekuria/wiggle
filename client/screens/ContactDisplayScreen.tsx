import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContactDisplayScreen: React.FC = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => {
          console.log('navigation Porps', navigation);
          navigation.goBack();
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>ContactDisplayScreen</Text>
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
