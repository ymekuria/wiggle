import React, { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | undefined>();
  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
            sort: Contacts.SortTypes.FirstName,
            pageSize: 0
          });

          setContacts(data);
          console.log('data', data[0]);
        }
      } catch (err) {
        console.log('error::', err);
      }
    })();
  }, []);

  return [contacts];
};

export default useContacts;
