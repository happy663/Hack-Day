import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "src/utils/theme";
import { MicrophoneOnCircle, Prompt } from "src/components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  NewQuestionScreenState,
  newQuestionState,
  recordingState,
} from "src/globalStates/atoms/newQuestionState";
import { Audio } from "expo-av";
import { audioInitalize } from "src/audio/recording";

export interface NewQuestionProps {}

export const NewQuestion = () => {
  const setRecState = useSetRecoilState(recordingState);
  const screenStatus = useRecoilValue(newQuestionState);
  const [recording, setRecording] = React.useState<Audio.Recording>();

  useEffect(() => {
    audioInitalize();
  }, []);

  const promptDic: { [key in NewQuestionScreenState]: string } = {
    ready: "ご相談はなんでしょうか？",
    recording: "質問中",
    recognizing: "文字起こし中",
    recording_faild: "録音に失敗しました",
    SUCCESS: "完了しました",
    NG_WORD: "汚い言葉は使えません",
    TOO_SHORT_VOICE: "質問が短すぎます",
  };

  function startRecording() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
      (recordingStatus) => {
        console.log(recordingStatus);
      }
    )
      .then(({ recording }) => {
        setRecording(recording);
      })
      .catch((error) => {
        console.error(error);
        setRecState("recording_faild");
        setRecording(undefined);
      });
    return;
  }

  function uploadNewQuestion(recordFileURI: string) {
    fetch(recordFileURI)
      .then((res) => res.blob())
      .then((recFile) => {
        const formData = new FormData();
        formData.append("user_id", "6kSDkE0SNvWuVbiSVg8W");
        formData.append("file", new File([recFile], new Date().toString()));
        formData.append("is_answer", "False");
        formData.append("type", "questioner");
        return fetch("https://hackday.kajilab.tk/upload", {
          method: "POST",
          body: formData,
        });
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resjson) => console.log(1234, resjson))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <LinearGradient
      style={styles.root}
      colors={["#F4A261", "#E9C46A"]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <MicrophoneOnCircle
        onPress={(status) => {
          console.log(status, "screenStatus");
          if (screenStatus === "recognizing") return;

          if (status === "recording") {
            startRecording();
          }

          if (status === "ready") {
            console.log("Stopping recording..", recording);

            if (!recording) return;

            recording.stopAndUnloadAsync().then((status) => {
              const recordFileURI = recording.getURI();
              if (!status.isDoneRecording || !recordFileURI) {
                setRecState("recording_faild");
                setRecording(undefined);
                return;
              }
              uploadNewQuestion(recordFileURI);
              setRecording(undefined);
            });

            setRecording(undefined);
          }
        }}
      />
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
