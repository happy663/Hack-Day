import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "src/utils/theme";
import { MicrophoneOnCircle, Prompt } from "src/components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NewQuestionScreenState,
  newQuestionScreenState,
} from "src/globalStates/atoms/newQuestionState";
import { Audio } from "expo-av";
import {
  audioInitalize,
  startRecording,
  postQuestion,
  getRecordingFileURI,
} from "src/audio/recording";
import { userState } from "src/globalStates/atoms/userState";

export interface NewQuestionProps {}

export const NewQuestion = () => {
  const [questionRecord, setQuestionRecord] = React.useState<Audio.Recording>();
  const [screenState, setScreenState] = useRecoilState(newQuestionScreenState);
  const user = useRecoilValue(userState);
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
    NG_WORD: "心ない言葉を\n使っているようです",
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
    if (!user) return;
    try {
      setScreenState("recognizing");
      const newQuestion = await postQuestion(recordFileURI, user.uid, false);
      setScreenState(newQuestion.voice.status);
      setQuestionRecord(undefined);
    } catch {
      setScreenState("recording_faild");
      setQuestionRecord(undefined);
    }
  }

  return (
    <LinearGradient
      style={styles.root}
      colors={stateToColors()[screenState]}
      start={{ x: 0.5, y: 0.65 }}
    >
      <MicrophoneOnCircle
        waveColor={stateToColors()[screenState][1]}
        onPress={(isRecording) => {
          if (screenState === "recognizing") return;

          if (isRecording) {
            const startRec = async () => {
              setScreenState("recording");
              const record = await startRecording();
              setQuestionRecord(record);
            };
            try {
              startRec();
            } catch {
              setScreenState("recording_faild");
              setQuestionRecord(undefined);
            }
          } else {
            console.log("Stopping recording..", questionRecord);

            if (!questionRecord) {
              setScreenState("ready");
              return;
            }

            const stopAndUploadRecord = async () => {
              const [status, fileURI] = await getRecordingFileURI(
                questionRecord
              );
              if (!status.isDoneRecording || !fileURI) {
                setScreenState("recording_faild");
                setQuestionRecord(undefined);
                return;
              }
              uploadQuestion(fileURI);
            };
            stopAndUploadRecord();
          }
        }}
      />
      <Prompt>{promptDic[screenState]}</Prompt>
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
