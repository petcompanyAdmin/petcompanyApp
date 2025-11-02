import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../store/useAuthStore";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={[styles.title, { color: colors.text }]}>PetCompany</Text>
      {user?.photoURL ? (
        <TouchableOpacity>
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.avatar, { backgroundColor: colors.border }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    elevation: 3,
  },
  logo: { width: 36, height: 36, resizeMode: "contain" },
  title: { fontSize: 18, fontWeight: "600" },
  avatar: { width: 36, height: 36, borderRadius: 18 },
});
