import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import _default from '@react-navigation/bottom-tabs/lib/typescript/src/navigators/createBottomTabNavigator';

const TabOneScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab One</Text>
    </LinearGradient>
  );
};

// background-image: linear-gradient( 89.2deg,  rgba(191,241,236,1) 22.3%, rgba(109,192,236,1) 84.1% );

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

export default TabOneScreen;
