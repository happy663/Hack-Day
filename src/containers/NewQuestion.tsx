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
import { audioInitalize } from "src/audio/recording";
import * as FileSystem from "expo-file-system";

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

  async function startRecording() {
    setScreenStatus("recording");
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
      (recordingStatus) => {}
    )
      .then(({ recording }) => {
        setQuestionRecord(recording);
      })
      .catch((error) => {
        setScreenStatus("recording_faild");
        setQuestionRecord(undefined);
      });
    return;
  }

  const uploadNewQuestion = async (recordFileURI: string) => {
    setScreenStatus("recognizing");
    const url = "https://hackday.kajilab.tk/upload";
    try {
      const response = await FileSystem.uploadAsync(url, recordFileURI, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        httpMethod: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        fieldName: "file",
        parameters: {
          user_id: "6kSDkE0SNvWuVbiSVg8W",
          is_answer: "false",
          type: "questioner",
        },
      });
      const newQuestion = JSON.parse(response.body);
      console.log(response);
      setScreenStatus(newQuestion.voice.status);
    } catch (error) {
      console.log(error);
      setScreenStatus("recognizing_faild");
    }
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
            startRecording();
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

              uploadNewQuestion(recordFileURI);
              setQuestionRecord(undefined);
            });

            setQuestionRecord(undefined);
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
