import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "src/utils/theme";
import { MicrophoneOnCircle, Prompt } from "src/components";
import { useRecoilState } from "recoil";
import {
  NewQuestionScreenState,
  newQuestionState,
} from "src/globalStates/atoms/newQuestionState";
import { Audio } from "expo-av";
import {
  audioInitalize,
  startRecording,
  postNewQuestion,
} from "src/audio/recording";

export interface NewQuestionProps {}

export const NewQuestion = () => {
  const [questionRecord, setQuestionRecord] = React.useState<Audio.Recording>();
  const [screenStatus, setScreenStatus] = useRecoilState(newQuestionState);

  useEffect(() => {
    audioInitalize();
  }, []);

  const promptDic: { [key in NewQuestionScreenState]: string } = {
    ready: "ご相談はなんでしょうか？",
    recording: "相談中",
    recognizing: "文字起こし中",
    recognizing_faild: "文字起こしに失敗",
    recording_faild: "録音に失敗しました",
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
      <MicrophoneOnCircle
        onPress={(isRecording) => {
          if (screenStatus === "recognizing") return;

          console.log(isRecording);
          if (isRecording) {
            const startRec = async () => {
              setScreenStatus("recording");
              const record = await startRecording();
              setQuestionRecord(record);
            };
            try {
              startRec();
            } catch {
              setScreenStatus("recording_faild");
              setQuestionRecord(undefined);
            }
          } else {
            console.log("Stopping recording..", questionRecord);

            if (!questionRecord) {
              setScreenStatus("ready");
              return;
            }

            questionRecord.stopAndUnloadAsync().then((status) => {
              const recordFileURI = questionRecord.getURI();
              if (!status.isDoneRecording || !recordFileURI) {
                setScreenStatus("recording_faild");
                setQuestionRecord(undefined);
                return;
              }

              const uploadQuestion = async () => {
                try {
                  setScreenStatus("recognizing");
                  const newQuestion = await postNewQuestion(recordFileURI);
                  setScreenStatus(newQuestion.voice.status);
                  setQuestionRecord(undefined);
                } catch {
                  setScreenStatus("recording_faild");
                  setQuestionRecord(undefined);
                }
              };
              uploadQuestion();
            });
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
