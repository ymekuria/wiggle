import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, Modal, Pressable, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

interface PhoneNumbersDisplayProps {
  phoneNumbers: any;
}

const PhoneNumbersDisplay: React.FC<PhoneNumbersDisplayProps> = ({
  phoneNumbers
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const renderPhoneNumbers = ({ item }) => {
    const onPhoneNumberPress = (item) => {
      setModalVisible(!modalVisible);
      console.log('phoneNumberItem', item);
    };
    return (
      <TouchableOpacity onPress={() => onPhoneNumberPress(item)}>
        <View style={styles.phoneNumberContainer}>
          <Text>{item.label}</Text>
          <Text style={styles.phoneNumberText}>{item.digits}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={phoneNumbers}
        renderItem={renderPhoneNumbers}
        keyExtractor={(number) => number.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(247,236,250,.3)',
    justifyContent: 'space-evenly',
    borderRadius: 10
  },
  phoneNumberText: {
    fontSize: 20,
    paddingTop: 3,
    opacity: 0.7
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default PhoneNumbersDisplay;
