import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
const JOKE = gql`
  query GetJoke {
    joke {
      joke
    }
  }
`;
const TabThreeScreen: React.FC = (props) => {
  const { loading, error, data } = useQuery(JOKE);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    console.log(error);
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  console.log({ data });
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab Three</Text>
      <Text>{data.joke.joke}</Text>
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

export default TabThreeScreen;
