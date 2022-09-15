import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const NewQuestion = () => {
  return (
    <LinearGradient
      style={styles.root}
      colors={["#F4A261", "#E9C46A"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <View style={styles.microphone}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 45,
  },
  microphone: {
    borderRadius: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width,
    backgroundColor: "#E76F51",
    justifyContent: "center",
    alignItems: "center",
  },
});
