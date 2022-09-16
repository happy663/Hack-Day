import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "src/utils/theme";
import { MicrophoneOnCircle } from "src/components";

export interface NewQuestionProps {}

export const NewQuestion = () => {
  return (
    <LinearGradient
      style={styles.root}
      colors={["#F4A261", "#E9C46A"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <MicrophoneOnCircle />
      <View style={styles.promptLayout}>
        <Text style={styles.promptText}>どんな助けが必要？</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 45,
  },
  promptLayout: {
    marginVertical: 46,
  },
  promptText: {
    color: theme.colors.white,
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
});
