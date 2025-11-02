import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

const mockFoundPets = [
  { id: "1", description: "Golden Retriever wearing red collar", location: "Bangalore" },
  { id: "2", description: "Small white cat near park area", location: "Delhi" },
];

export default function FoundScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Found Pets</Text>

      <FlatList
        data={mockFoundPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.desc, { color: colors.text }]}>
              {item.description}
            </Text>
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              📍 Location: {item.location}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  heading: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight as any,
    marginBottom: Spacing.md,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
  },
  desc: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: "500",
    marginBottom: Spacing.xs,
  },
  location: {
    fontSize: Typography.body.fontSize,
  },
});
