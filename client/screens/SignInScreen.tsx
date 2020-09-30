import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth0 } from '../hooks/useAuth0';
import { Text, View } from '../components/Themed';

const SignInScreen: React.FC = (props) => {
  const { login } = useAuth0();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Button title="SignIn" onPress={login} />
      <Text style={styles.title}>SignIn</Text>
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

export default SignInScreen;
