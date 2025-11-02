import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../../utils/firebaseConfig";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

export default function LinkPhoneScreen({ navigation }: any){
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ loading, setLoading] = useState(false);
    const recaptchaVerifier: any = useRef(null);
    const { colors, theme } = useTheme();

    const validatePhone = (num: string) => /^[0-9]{10}$/.test(num);

    const handleGetOTP = async () => {
        if(!validatePhone(phoneNumber)){
            Alert.alert("Invalid number", "Enter a valid 10-digit number");
            return;
        }

        try{
            setLoading(true);
            const provider = new PhoneAuthProvider(auth);
            const verificationId = await provider.verifyPhoneNumber(
                `+91${phoneNumber}`,
                recaptchaVerifier.current
            );
            setLoading(false);
            navigation.navigate("VerifyOTP", {
        verificationId,
        phoneNumber: `+91${phoneNumber}`,
      });
    } catch (error) {
      console.error("OTP error:", error);
      Alert.alert("Error", "Failed to send OTP. Try again later.");
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Text style={[styles.title, { color: colors.text }]}>
        Link your phone
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter your 10-digit mobile number
      </Text>

      <View style={styles.inputRow}>
        <Text style={[styles.code, { color: colors.text }]}>+91</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.surface,
            },
          ]}
          keyboardType="number-pad"
          placeholder="Enter mobile number"
          placeholderTextColor={colors.textSecondary}
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: loading ? "#999" : Colors.blueGreen },
        ]}
        onPress={handleGetOTP}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending OTP..." : "Get OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.title.fontSize,
    fontWeight: "700",
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Typography.subtitle.fontSize,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  code: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: Spacing.md,
    fontSize: Typography.body.fontSize,
  },
  button: {
    padding: Spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});