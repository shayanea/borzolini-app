import Constants from 'expo-constants';

export const appConfig = {
  apiUrl:
    Constants.expoConfig?.extra?.apiUrl ||
    'http://localhost:3000',
  googleClientId:
    Constants.expoConfig?.extra?.googleClientId || '',
};

