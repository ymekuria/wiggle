import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  Alert,
  View,
  Text
} from 'react-native';
import { sendSMSAsync } from 'expo-sms';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Text, View } from '../components/Themed';
import { Context as WiggleContext } from '../context/WiggleContext';

interface PhoneNumbersDisplayProps {
  phoneNumbers: any;
}

const PhoneNumbersDisplay: React.FC<PhoneNumbersDisplayProps> = ({
  phoneNumbers
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<String>('');
  const { selectedWiggle } = useContext(WiggleContext);

  const sendSMSwiggle = async () => {
    if (selectedWiggle.type === 'joke') {
      {
        const { result } = await sendSMSAsync(
          selectedNumber,
          selectedWiggle.wiggle
          // {
          //   attachments: {
          //     uri: null,
          //     mimeType: 'image/png'
          //     // filename: 'myfile.png'
          //   }
          // }
        );
        console.log('sms result', result);
        setModalVisible(!modalVisible);
      }
    }
  };

  const renderPhoneNumbers = ({ item }) => {
    const onPhoneNumberPress = (item) => {
      setModalVisible(!modalVisible);
      console.log('phoneNumberItem', item.digits);
      setSelectedNumber(item.digits);
      console.log('selectedNumber', selectedNumber);
      console.log('selectedWiggle', selectedWiggle);
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
            <Text style={styles.modalText}>
              Send a Wiggle to {selectedNumber} ?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-around'
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={sendSMSwiggle}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f3f0f0',
    borderRadius: 15,
    padding: 35,
    // alignItems: 'center',
    justifyContent: 'space-around',
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
    borderRadius: 10,
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
