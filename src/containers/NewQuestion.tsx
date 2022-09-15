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
      <View style={styles.outsideWave}>
        <View style={styles.middlesideWave}></View>
      </View>
    </LinearGradient>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 45,
  },
  outsideWave: {
    borderRadius: screenWidth / 2,
    height: screenWidth,
    backgroundColor: "#ed8858",
    justifyContent: "center",
    alignItems: "center",
  },
  middlesideWave: {
    borderRadius: screenWidth / 2,
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
    backgroundColor: "#e97553",
    justifyContent: "center",
    alignItems: "center",
  },
});
