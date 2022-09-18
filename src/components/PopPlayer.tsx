import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Player } from "./Player";
import { theme, globalStyles } from "src/utils/theme";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentQuestionState,
  currentVoiceState,
} from "src/globalStates/atoms";
import { navigate } from "src/routes/ApplicationRoutes";
import { Audio } from "expo-av";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { userState } from "src/globalStates/atoms/userState";

export const PopPlayer = () => {
  const currentQuestion = useRecoilValue(currentQuestionState);
  const [currentVoice, setCurrentVoice] = useRecoilState(currentVoiceState);
  const [sound, setSound] = React.useState<Audio.Sound>();
  const isFocused = useIsFocused();
  const user = useRecoilValue(userState);

  useFocusEffect(
    React.useCallback(() => {
      sound && sound.playAsync();
      setCurrentVoice(currentQuestion?.voice);
    }, [sound])
  );

  React.useEffect(() => {
    if (!isFocused) sound && sound.pauseAsync();
  }, [isFocused]);

  return (
    <>
      {currentQuestion?.question_id ? (
        <LinearGradient
          colors={currentQuestion.colors}
          style={styles.popPlayerContainer}
        >
          <View style={styles.flexItemFullWidth}>
            <View style={{ height: 48, ...globalStyles.flexRowCenter }}>
              <TouchableOpacity
                style={styles.helpButton}
                onPress={() => {
                  sound && sound.pauseAsync();
                  navigate("ChatsPage");
                }}
              >
                <Image
                  source={{ uri: currentQuestion.user.icon_url }}
                  style={{ ...globalStyles.iconMd, borderRadius: 24 }}
                />
                <Text style={globalStyles.headingMd}>
                  {currentQuestion.user.name}さんを助ける!
                </Text>
                <Image
                  source={
                    user?.icon_url
                      ? { uri: user.icon_url }
                      : require("assets/lefty.png")
                  }
                  style={{ ...globalStyles.iconMd, borderRadius: 24 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flexItemFullWidth}>
            <Player
              voice={currentQuestion?.voice}
              getSound={(s) => setSound(s)}
            />
          </View>
        </LinearGradient>
      ) : (
        <></>
      )}
    </>
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
