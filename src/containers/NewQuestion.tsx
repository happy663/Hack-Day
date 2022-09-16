import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "src/utils/theme";
import { MicrophoneOnCircle, Prompt } from "src/components";
import { useRecoilValue } from "recoil";
import {
  NewQuestionScreenState,
  newQuestionState,
} from "src/globalStates/atoms/newQuestionState";

export interface NewQuestionProps {}

export const NewQuestion = () => {
  const screenStatus = useRecoilValue(newQuestionState);

  const promptDic: { [key in NewQuestionScreenState]: string } = {
    ready: "ご相談はなんでしょうか？",
    recording: "質問中",
    recognizing: "文字起こし中",
    SUCCESS: "完了しました",
    NG_WORD: "汚い言葉は使えません",
    TOO_SHORT_VOICE: "質問が短すぎます",
  };

  return (
    <LinearGradient
      style={styles.root}
      colors={["#F4A261", "#E9C46A"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <MicrophoneOnCircle />
      <Prompt>{promptDic[screenStatus]}</Prompt>
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
