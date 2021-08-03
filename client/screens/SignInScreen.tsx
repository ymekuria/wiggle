import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { useAuth0 } from '../hooks/useAuth0';

const SignInScreen: React.FC = (props) => {
  const { login } = useAuth0();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <Button
        buttonStyle={{ backgroundColor: 'rgba(247,236,250,.3)' }}
        title="SIGN IN"
        onPress={login}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
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
