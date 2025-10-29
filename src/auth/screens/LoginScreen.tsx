import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Colors, Spacing, Typography } from '../../theme';

import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { Alert } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { theme, toggleTheme, colors } = useTheme();
  const webClientId = '454197807801-bnk53h9p6cq3tf8ngjpg0unr3t1ie794.apps.googleusercontent.com'

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: webClientId,
    webClientId: webClientId,
    redirectUri: 'https://auth.expo.io/@petcompany/petcompany-app',
  });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     if (!authentication?.idToken) {
  //       Alert.alert('Error', 'No ID token received from Google');
  //       return;
  //     }

  //     const credential = GoogleAuthProvider.credential(authentication.idToken);
  //     signInWithCredential(auth, credential)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         console.log('✅ Google login success:', user.email);
  //         Alert.alert('Welcome', `Signed in as ${user.displayName || user.email}`);
  //       })
  //       .catch((error) => {
  //         console.error('❌ Firebase Google login error:', error);
  //         Alert.alert('Login Failed', error.message);
  //       });
  //   }
  // }, [response]);

  React.useEffect(() => {
    console.log('google', response)
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication || {};
      if (!idToken && !accessToken) {
        Alert.alert("Error", "No token received from Google");
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("✅ Google login success:", user.email);
          Alert.alert("Welcome", `Signed in as ${user.displayName || user.email}`);
        })
        .catch((error) => {
          console.error("❌ Firebase Google login error:", error);
          Alert.alert("Login Failed", error.message);
        });
    }
  }, [response]);




  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Enter a valid email';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleEmailLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }
    console.log('Login with email:', email);
  };

  const handleGoogleLogin = () => console.log('Continue with Google');
  const handlePhoneLogin = () => console.log('Continue with Phone');
  const isFormValid = !validateEmail(email) && !validatePassword(password);

  const heroImage =
    theme === 'light'
      ? require('../../../assets/heroDog.png')
      : require('../../../assets/heroDog.png');

  const backgroundImage =
    theme === 'light'
      ? require('../../../assets/lightBackground.jpg')
      : require('../../../assets/darkBackground.jpg');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
          >
            <View
              style={[
                styles.overlay,
                { backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' },
              ]}
            />

            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              {/* 🐶 Hero Image */}
              <Image source={heroImage} style={styles.heroImg} resizeMode="contain" />

              <Text style={[styles.title, { color: colors.text }]}>
                Welcome to Pet Company 🐾
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign in to continue
              </Text>

              {/* Email Input */}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      touched.email && errors.email ? Colors.utOrange : colors.border,
                    color: colors.text,
                    backgroundColor: colors.surface,
                  },
                ]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  if (touched.email)
                    setErrors({ ...errors, email: validateEmail(val) });
                }}
                onBlur={() => {
                  setTouched({ ...touched, email: true });
                  setErrors({ ...errors, email: validateEmail(email) });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email ? (
                <Text style={[styles.errorText, { color: Colors.utOrange }]}>
                  {errors.email}
                </Text>
              ) : null}

              {/* Password Input */}
              <View
                style={[
                  styles.passwordContainer,
                  {
                    borderColor:
                      touched.password && errors.password
                        ? Colors.utOrange
                        : colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (touched.password)
                      setErrors({ ...errors, password: validatePassword(val) });
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, password: true });
                    setErrors({ ...errors, password: validatePassword(password) });
                  }}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <MaterialIcons
                    name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                    size={22}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password ? (
                <Text style={[styles.errorText, { color: Colors.utOrange }]}>
                  {errors.password}
                </Text>
              ) : null}

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  {
                    backgroundColor: isFormValid
                      ? Colors.blueGreen
                      : colors.textSecondary + '80',
                  },
                ]}
                onPress={handleEmailLogin}
                disabled={!isFormValid}
              >
                <Text style={styles.primaryText}>Login</Text>
              </TouchableOpacity>

              <Text style={[styles.orText, { color: colors.textSecondary }]}>OR</Text>

              {/* Google Login */}
              <TouchableOpacity
                style={[styles.googleBtn, { borderColor: colors.border }]}
                onPress={() => promptAsync()} // 👈 replace handleGoogleLogin()
                disabled={!request}
              >
                <Image
                  source={require('../../../assets/google.png')}
                  style={styles.googleIcon}
                />
                <Text style={[styles.googleText, { color: '#000' }]}>
                  Continue with Google
                </Text>
              </TouchableOpacity>


              {/* Phone Login */}
              <TouchableOpacity
                style={[styles.phoneBtn, { backgroundColor: Colors.utOrange }]}
                onPress={handlePhoneLogin}
              >
                <MaterialIcons name="phone" size={20} color="#fff" />
                <Text style={styles.phoneText}>Continue with Phone</Text>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
                <MaterialIcons
                  name={theme === 'light' ? 'dark-mode' : 'light-mode'}
                  size={22}
                  color={colors.text}
                />
                <Text style={[styles.themeToggleText, { color: colors.text }]}>
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 40,
  },
  heroImg: {
    width: 150,
    height: 150,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.title.fontSize,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.subtitle.fontSize,
    marginBottom: Spacing.lg,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
    fontSize: Typography.body.fontSize,
  },
  errorText: {
    alignSelf: 'flex-start',
    fontSize: 13,
    marginBottom: Spacing.sm,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    height: 52,
  },
  passwordInput: {
    flex: 1,
    fontSize: Typography.body.fontSize,
  },
  eyeButton: { padding: 8 },
  primaryBtn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: Typography.body.fontSize,
  },
  orText: { marginVertical: Spacing.md },
  googleBtn: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: Spacing.sm,
    color: '#000'
  },
  googleIcon: { width: 22, height: 22, marginRight: Spacing.sm },
  googleText: {
    color: '#000',
    fontSize: Typography.body.fontSize,
  },
  phoneBtn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  phoneText: {
    color: '#fff',
    fontSize: Typography.body.fontSize,
    marginLeft: Spacing.xs,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  themeToggleText: {
    fontSize: Typography.body.fontSize,
    fontWeight: '500',
    marginLeft: 8,
  },
});
