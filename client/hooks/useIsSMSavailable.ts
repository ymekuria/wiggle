import * as SMS from 'expo-sms';
import * as React from 'react';

export default (): boolean => {
  const [isSMSavailable, setIsSMSavailable] = React.useState(false);

  React.useEffect(() => {
    async function getSMSstatus() {
      let smsStatus = await SMS.isAvailableAsync();
      setIsSMSavailable(smsStatus);
    }
    getSMSstatus();
  });

  return isSMSavailable;
};
