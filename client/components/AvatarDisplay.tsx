import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

type AvatarDisplayProps = { currentContact: any };

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ currentContact }) => {
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

const styles = StyleSheet.create({});

export default AvatarDisplay;