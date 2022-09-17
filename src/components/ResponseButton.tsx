import React, { useState } from "react";
import { theme, globalStyles } from "src/utils/theme";
import {
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  View,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentQuestionState } from "src/globalStates/atoms";
import {
  getRecordingFileURI,
  startRecording,
  postQuestion,
} from "src/audio/recording";
import { Audio } from "expo-av";
import { Question } from "src/types";
import { questionsState } from "src/globalStates/atoms/questionsState";

export const ResponseButton = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [answerRecord, setAnswerRecord] = useState<Audio.Recording | null>(
    null
  );
  const setQuestions = useSetRecoilState(questionsState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const currentQuestion = useRecoilValue(currentQuestionState);

  const handleRecordingStart = async () => {
    const record = await startRecording();
    setAnswerRecord(record);
  };

  const handleRecordingFinish = async () => {
    if (!answerRecord) {
      return;
    }

    try {
      const [status, recordURI] = await getRecordingFileURI(answerRecord);
      if (!status.isDoneRecording) {
        return;
      }
      const answer = await postQuestion(
        recordURI,
        currentQuestion.user.uid,
        true,
        currentQuestion.question_id
      );
      console.log(11234, answer);
      if (answer.voice && answer.voice.status === "SUCCESS") {
        // TODO: 投稿内容を確認させるモーダルを表示
        setQuestions(answer);
        // setModalVisible(true);
      } else {
        console.error("wow.", answer);
        throw new Error("音声認識に失敗しました");
      }
      setAnswerRecord(null);
    } catch (e) {
      console.error(e);
      setAnswerRecord(null);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.modalLayout}
      >
        <View
          style={{
            backgroundColor: "#ff00aa",
            top: 100,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View>
            <Text>日本語で遊ぼうあああああああ</Text>
          </View>
          <View style={styles.buttonLayout}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>キャンセル</Text>
            </Pressable>
            <Pressable style={[styles.button]} onPress={() => {}}>
              <Text>送信</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.responseButton}
        onPress={() => {
          const nowIsRecording = !isRecording;
          setIsRecording(nowIsRecording);
          if (nowIsRecording) {
            handleRecordingStart();
          } else {
            handleRecordingFinish();
          }
        }}
      >
        <Icon name="mic" size={theme.iconSize.sm} />
        <Text style={{ marginLeft: 8, ...globalStyles.headingMd }}>
          {isRecording ? "録音中" : "声を届ける"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  responseButton: {
    position: "absolute",
    backgroundColor: theme.colors.white,
    borderRadius: 100,
    width: 180,
    paddingVertical: 12,
    paddingHorizontal: 24,
    bottom: 40,
    left: Dimensions.get("window").width / 2 - 90,
    ...globalStyles.flexRowCenter,
    ...globalStyles.boxShadow,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalLayout: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height / 2,
    backgroundColor: "#0f0",
  },
  buttonLayout: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    color: "red",
  },
});
