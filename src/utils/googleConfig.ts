import { GoogleSignin } from '@react-native-google-signin/google-signin';


export function configureGoogleSignIn() {
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  if (!webClientId) {
    console.warn('GOOGLE_WEB_CLIENT_ID not set in env');
    return;
  }

  GoogleSignin.configure({
    webClientId,
    offlineAccess: false,
    forceCodeForRefreshToken: true,
    scopes: ['openid', 'profile', 'email'],
  });
}
