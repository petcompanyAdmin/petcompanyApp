
import { StyleSheet, TextStyle } from "react-native";
import { Colors } from "./colors";
import { Spacing } from "./spacing";
import { Typography } from "./typography";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  titleText: {
    ...(Typography.title as TextStyle),
    color: Colors.text,
    textAlign: "center",
  },
  subtitleText: {
    ...(Typography.subtitle as TextStyle),
    color: Colors.textSecondary,
    textAlign: "center",
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: "center",
    width: '100%'
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
