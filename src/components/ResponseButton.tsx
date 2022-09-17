import React, { useState } from "react";
import { theme, globalStyles } from "src/utils/theme";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { currentQuestionState } from "src/globalStates/atoms";
import {
  getRecordingFileURI,
  startRecording,
  postQuestion,
} from "src/audio/recording";
import { Audio } from "expo-av";
import { useChats } from "src/hooks/useChats";
import { Chat } from "src/types";
import { ConfilmChatContentModal } from "./ConfilmChatContentModal";
import { userState } from "src/globalStates/atoms/userState";

export const ResponseButton = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [answerRecord, setAnswerRecord] = useState<Audio.Recording | null>(
    null
  );
  const { chats, setChats } = useChats();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [createdChat, setCreatedChat] = useState<Chat | null>(null);

  // const user = useRecoilValue(userState);
  // console.log(user, "user");

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
      if (!status.isDoneRecording) return;
      // if (!user) return;
      const answer = await postQuestion(
        recordURI,
        currentQuestion.user.uid,
        true,
        currentQuestion.question_id,
        "respondent"
      );
      if (answer.voice && answer.voice.status === "SUCCESS") {
        console.log(answer, chats);
        setCreatedChat(answer);
        setModalVisible(true);
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
      <ConfilmChatContentModal
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onPressCancel={() => {
          setModalVisible(false);
        }}
        onPressSend={() => {
          if (createdChat) {
            console.log(chats, createdChat);
            setChats([...chats, createdChat]);
          }
          setModalVisible(false);
        }}
        modalVisiblity={modalVisible}
        createdChat={createdChat}
      />
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
});
