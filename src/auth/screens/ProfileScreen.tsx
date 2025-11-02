import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

export default function ProfileScreen() {
  const { clearAuth } = useAuthStore();
  const user: any = useAuthStore((s) => s.user);
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {user?.photoURL && (
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
      )}

      <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
      <Text style={[styles.email, { color: colors.textSecondary }]}>
        {user?.email}
      </Text>

      {/* Link Phone Number */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: Colors.primary }]}
      >
        <Text style={styles.btnText}>Link Phone Number</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: Colors.error }]}
        onPress={clearAuth}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>

      {/* Change Theme */}
      <TouchableOpacity
        style={[
          styles.btn,
          {
            backgroundColor:
              theme === "light" ? Colors.prussianBlue : Colors.selectiveYellow,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text
          style={[
            styles.btnText,
            { color: theme === "light" ? "#fff" : Colors.text },
          ]}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight as any,
  },
  email: {
    fontSize: Typography.body.fontSize,
    marginBottom: Spacing.lg,
  },
  btn: {
    width: "100%",
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  btnText: {
    color: "#fff",
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
});
