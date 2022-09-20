import React, { useState } from "react";
import { theme, globalStyles } from "src/utils/theme";
import { Text, TouchableOpacity, Dimensions, Animated } from "react-native";
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
  const currentQuestion = useRecoilValue(currentQuestionState);
  const user = useRecoilValue(userState);

  const handleRecordingStart = async () => {
    const record = await startRecording();
    setAnswerRecord(record);
    animation.start();
  };

  const handleRecordingFinish = async () => {
    animation.stop();
    animation.reset();
    if (!answerRecord) {
      return;
    }
    if (!user) {
      return;
    }

    try {
      const [status, recordURI] = await getRecordingFileURI(answerRecord);
      if (!status.isDoneRecording) return;
      // if (!user) return;
      const answer = await postQuestion(
        recordURI,
        user?.uid,
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

  const waveAnim = React.useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }).current;
  const micScale = React.useRef(new Animated.Value(1)).current;

  const animation = Animated.loop(
    Animated.parallel([
      // waveAnim.scale
      Animated.sequence([
        Animated.timing(waveAnim.scale, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim.scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // waveAnim.opacity
      Animated.sequence([
        Animated.timing(waveAnim.opacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim.opacity, {
          toValue: 0.75,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim.opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // micScale
      Animated.sequence([
        Animated.timing(micScale, {
          toValue: 0.95,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(micScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ])
  );

  const backgroundColor = "#F4A261";

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
      <Animated.View
        style={{
          ...styles.responseButton,
          backgroundColor: isRecording ? "#F4A261" : theme.colors.white,
          transform: [{ scale: micScale }],
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
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
          <Icon
            name={isRecording ? "mic" : "mic-off"}
            size={theme.iconSize.sm}
          />
          <Text style={{ marginLeft: 8, ...globalStyles.headingMd }}>
            {isRecording ? "録音中" : "声を届ける"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.insideWave,
          backgroundColor,
          transform: [{ scale: waveAnim.scale }],
          opacity: waveAnim.opacity,
        }}
      />
      <Animated.View
        style={{
          ...styles.outsideWave,
          backgroundColor,
          transform: [{ scale: waveAnim.scale }],
          opacity: waveAnim.opacity,
        }}
      />
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
    height: 50,
    left: Dimensions.get("window").width / 2 - 90,
    ...globalStyles.flexRowCenter,
    ...globalStyles.boxShadow,
  },
  outsideWave: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 150,
    bottom: 5,
    width: 300,
    height: 120,
    zIndex: -2,
    borderRadius: 100,
  },
  insideWave: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 125,
    bottom: 20,
    width: 250,
    borderRadius: 100,
    height: 90,
    zIndex: -1,
  },
});
