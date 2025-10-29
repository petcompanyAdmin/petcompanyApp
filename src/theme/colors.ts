// src/theme/colors.ts

export const Colors = {
  // 🌊 Brand Palette
  skyBlue: '#8ecae6',          // Calm, background tints or accents
  blueGreen: '#219ebc',        // Primary brand color (buttons, highlights)
  prussianBlue: '#023047',     // Deep text, headers, or strong accents
  selectiveYellow: '#ffb703',  // Secondary, cheerful CTA accent
  utOrange: '#fb8500',         // Warnings, emphasis, or energetic highlights

  // 🎨 Semantic Mappings (for consistent usage)
  primary: '#219ebc',          // blue-green
  secondary: '#ffb703',        // selective yellow
  accent: '#fb8500',           // ut orange
  background: '#ffffff',
  surface: '#f6f8fb',
  text: '#023047',             // prussian blue for readability
  textSecondary: '#4a6370',    // subtle blue-gray
  border: '#dce3e8',
  error: '#e63946',            // red tone for validation errors

  // 🌙 Dark Mode (future-ready)
  dark: {
    background: '#0b1c26',     // near-prussian blue dark tone
    surface: '#132b3a',
    text: '#f1f1f1',
    textSecondary: '#b3c0c8',
    border: '#2b3f4a',
  },
};
