import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { Text } from '../components/Themed';

interface AvatarDisplayProps {
  contact: any;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ contact }) => {
  return (
    <>
      <View style={styles.avatarContainerStyle}>
        {contact?.imageAvailable ? (
          <Avatar rounded size="xlarge" source={{ uri: contact?.image.uri }} />
        ) : (
          <Avatar
            rounded
            size="xlarge"
            title={`${contact?.name}`}
            overlayContainerStyle={{
              backgroundColor: 'gray'
            }}
            activeOpacity={0.7}
          />
        )}
      </View>
      <View style={styles.nameContainerStyle}>
        <Text style={styles.nameTextStyle}>{contact?.name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatarContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20
  },
  nameContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  nameTextStyle: { fontSize: 30 }
});

export default AvatarDisplay;
