import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';

export default (): boolean => {
  const [isSMSavailable, setIsSMSavailable] = useState(false);

  useEffect(() => {
    async function getSMSstatus() {
      let smsStatus = await SMS.isAvailableAsync();
      setIsSMSavailable(smsStatus);
    }
    getSMSstatus();
  });

  return isSMSavailable;
};
