import React, { useState, useEffect } from 'react';
import {
  requestPermissionsAsync,
  getContactsAsync,
  SortTypes,
  Contact
} from 'expo-contacts';

export default () => {
  const [contacts, setContacts] = useState([] as Contact[]);
  const [inMemoryContacts, setInMemoryContacts] = useState([] as Contact[]);

  useEffect(() => {
    async function getContacts() {
      try {
        let { status } = await requestPermissionsAsync();
        if (status === 'granted') {
          let { data } = await getContactsAsync({
            sort: SortTypes.FirstName,
            pageSize: 0
          });

          setContacts(data);
          setInMemoryContacts(data);
        }
      } catch (err) {
        console.log('error::', err);
      }
    }

    getContacts();
  }, []);

  return [contacts, setContacts, inMemoryContacts];
};
