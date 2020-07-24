import * as SMS from 'expo-sms';

export default async () => {
  async function getSMSstatus() {
    try {
      let result = await SMS.isAvailableAsync();
      // console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  const smsStatus = await getSMSstatus();
  return smsStatus;
};
