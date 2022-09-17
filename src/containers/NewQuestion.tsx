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
  postQuestion,
  getRecordingFileURI,
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

  function stateToColors() {
    const defaultColors: string[] = ["#F4A261", "#E9C46A"];
    const badColors: string[] = ["#274653", "#287170"];
    const colors = {
      ready: defaultColors,
      recording: defaultColors,
      recognizing: defaultColors,
      recognizing_faild: badColors,
      recording_faild: badColors,
      SUCCESS: defaultColors,
      NG_WORD: badColors,
      TOO_SHORT_VOICE: badColors,
    };
    return colors;
  }

  async function uploadQuestion(recordFileURI: string) {
    try {
      setScreenStatus("recognizing");
      const newQuestion = await postQuestion(
        recordFileURI,
        "6kSDkE0SNvWuVbiSVg8W",
        false
      );
      setScreenStatus(newQuestion.voice.status);
      setQuestionRecord(undefined);
    } catch {
      setScreenStatus("recording_faild");
      setQuestionRecord(undefined);
    }
  }

  return (
    <LinearGradient
      style={styles.root}
      colors={stateToColors()[screenStatus]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <MicrophoneOnCircle
        waveColor={stateToColors()[screenStatus][1]}
        onPress={(isRecording) => {
          if (screenStatus === "recognizing") return;

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

            const stopAndUploadRecord = async () => {
              const [status, fileURI] = await getRecordingFileURI(
                questionRecord
              );
              if (!status.isDoneRecording || !fileURI) {
                setScreenStatus("recording_faild");
                setQuestionRecord(undefined);
                return;
              }
              uploadQuestion(fileURI);
            };
            stopAndUploadRecord();
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
