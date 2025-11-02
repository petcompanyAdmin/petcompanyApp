import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useAuthStore } from "../../store/useAuthStore";
import { AuthService } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

export default function VerifyOTPScreen({ route, navigation }: any) {
    const { verificationId, phoneNumber } = route.params;
    const [otp, setOtp] = useState("");
    const { colors } = useTheme();
    const { getTokens } = useAuthStore.getState();


    const handleVerify = async () => {
        const stored = await getTokens();
        const idToken: any = stored?.idToken;
        if (!idToken) {
            Alert.alert("Error", "Missing auth token. Please re-login.");
            return;
        }
        if (otp.length < 6) {
            Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP");
            return;
        }

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);

            // ✅ Now link with backend
            const res = await AuthService.linkPhone(idToken, phoneNumber);
            Alert.alert("Success", res.message || "Phone linked successfully!");
            navigation.goBack();
        } catch (err) {
            console.error("OTP verification failed:", err);
            Alert.alert("Error", "Verification failed. Try again.");
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Verify OTP</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Enter the 6-digit OTP sent to {phoneNumber}
            </Text>

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
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.blueGreen }]}
                onPress={handleVerify}
            >
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: Spacing.lg },
    title: {
        fontSize: Typography.title.fontSize,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: Spacing.sm,
    },
    subtitle: {
        textAlign: "center",
        marginBottom: Spacing.lg,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: Spacing.md,
        textAlign: "center",
        fontSize: 20,
        letterSpacing: 6,
        marginBottom: Spacing.md,
    },
    button: {
        padding: Spacing.md,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
