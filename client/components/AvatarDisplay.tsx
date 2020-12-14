import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
// import { Text, View } from '../components/Themed';

type AvatarDisplayProps = { contact: any };

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ contact }) => {
  return (
    <View style={styles.avatarContainerStyle}>
      {contact?.imageAvailable ? (
        <Avatar rounded size="xlarge" source={{ uri: contact?.image.uri }} />
      ) : (
        <Avatar
          rounded
          size="xlarge"
          title={`${contact?.firstName[0]}${contact?.lastName[0]}`}
          overlayContainerStyle={{
            backgroundColor: 'gray'
          }}
          activeOpacity={0.7}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20
  }
});

export default AvatarDisplay;
