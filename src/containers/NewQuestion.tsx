import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { theme } from "src/utils/theme";

export const NewQuestion = () => {
  return (
    <LinearGradient
      style={styles.root}
      colors={["#F4A261", "#E9C46A"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <View style={styles.outsideWave}>
        <View style={styles.middlesideWave}>
          <View style={styles.insideWave}>
            <Icon
              style={styles.microphone}
              size={theme.iconSize.lg}
              name={"mic"}
            />
          </View>
        </View>
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
  insideWave: {
    borderRadius: screenWidth / 2,
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    backgroundColor: "#e97553",
    borderColor: "#ffffff",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  microphone: {
    color: "#fff",
  },
});
