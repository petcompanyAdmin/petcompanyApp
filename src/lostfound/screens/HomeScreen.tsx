import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

export default function HomeScreen() {
  const user: any = useAuthStore((s) => s.user);
  const { theme, colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.greeting, { color: colors.text }]}>
        👋 Hello, {user?.name?.split(" ")[0] || "Guest"}!
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        What would you like to do today?
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Report Lost Pet
          </Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
            Create a post for a missing pet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Report Found Pet
          </Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
            Help someone reunite with their pet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Browse All Posts
          </Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
            See recent lost and found listings
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight as any,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.subtitle.fontSize,
    marginBottom: Spacing.lg,
  },
  actions: {
    gap: Spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.lg,
    elevation: 2,
  },
  cardTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  cardDesc: {
    fontSize: Typography.body.fontSize,
  },
});
