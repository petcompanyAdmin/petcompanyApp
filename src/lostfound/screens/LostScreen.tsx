import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Colors, Spacing, Typography } from "../../theme";

const mockLostPets = [
  { id: "1", name: "Bruno", breed: "Labrador", color: "Brown", location: "Pune" },
  { id: "2", name: "Milo", breed: "Beagle", color: "White & Brown", location: "Mumbai" },
];

export default function LostScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Lost Pets</Text>

      <FlatList
        data={mockLostPets}
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
            <Text style={[styles.petName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.petDetail, { color: colors.textSecondary }]}>
              Breed: {item.breed}
            </Text>
            <Text style={[styles.petDetail, { color: colors.textSecondary }]}>
              Color: {item.color}
            </Text>
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              📍 Last seen: {item.location}
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
  petName: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  petDetail: {
    fontSize: Typography.body.fontSize,
    marginBottom: 2,
  },
  location: {
    fontSize: Typography.body.fontSize,
    marginTop: Spacing.xs,
  },
});
