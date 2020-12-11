import React, { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

export default () => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | undefined>();
  const [inMemoryContacts, setInMemoryContacts] = useState<
    Contacts.Contact[] | undefined
  >();

  useEffect(() => {
    async function getContacts() {
      try {
        let { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          let { data } = await Contacts.getContactsAsync({
            sort: Contacts.SortTypes.FirstName,
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
