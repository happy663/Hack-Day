import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Player } from "./Player";
import { theme, globalStyles } from "src/utils/theme";
import { useRecoilState } from "recoil";
import { currentQuestionState } from "src/globalStates/atoms";

export const PopPlayer = () => {
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(currentQuestionState);
  return (
    <LinearGradient
      colors={currentQuestion.colors}
      style={styles.popPlayerContainer}
    >
      <View style={styles.flexItemFullWidth}>
        <HelpButton />
      </View>
      <View style={styles.flexItemFullWidth}>
        <Player />
      </View>
    </LinearGradient>
  );
};

const HelpButton = () => {
  return (
    <View style={{ height: 48, ...globalStyles.flexRowCenter }}>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => console.log("pressed")}
      >
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconMd}
        />
        <Text style={globalStyles.headingMd}>〇〇さんを助ける!</Text>
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconMd}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexItemFullWidth: {
    flex: 1,
    width: "100%",
    ...globalStyles.flexCenter,
  },
  popPlayerContainer: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#80B1E7",
  },
  helpButton: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
  },
});
