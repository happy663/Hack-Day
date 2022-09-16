import React from "react";
import { theme } from "src/utils/theme";
import { Dimensions, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRecoilState } from "recoil";
import {
  recordingState,
  RecordingStatus as RecStatus,
} from "src/globalStates/atoms/newQuestionState";

interface MicrophoneOnCircle {
  mainColor?: string;
  subColor?: string;
  onPress?: (recordingState: RecStatus) => void;
}

export const MicrophoneOnCircle = (props: MicrophoneOnCircle) => {
  const [recState, setRecState] = useRecoilState(recordingState);

  const styles = generateStyles(props.mainColor, props.subColor);

  const isRecording = recState === "recording";

  return (
    <View style={styles.outsideWave}>
      <View style={styles.middlesideWave}>
        <TouchableOpacity
          style={[styles.microphoneBox, isRecording && styles.isRecordingBox]}
          onPress={() => {
            setRecState((currentVal) => {
              const nextState = "ready" === currentVal ? "recording" : "ready";
              props.onPress && props.onPress(nextState);
              return nextState;
            });
          }}
        >
          <Icon
            style={[
              styles.microphoneIcon,
              isRecording && styles.isRecordingMic,
            ]}
            size={theme.iconSize.lg}
            name={"mic"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get("window").width;

function generateStyles(mainColor?: string, subColor?: string) {
  const coreColor: string = mainColor ? mainColor : "#e97553";
  const outsideColor: string = subColor ? subColor : "#ed8858";

  return StyleSheet.create({
    outsideWave: {
      borderRadius: screenWidth / 2,
      height: screenWidth,
      backgroundColor: outsideColor,
      justifyContent: "center",
      alignItems: "center",
    },
    middlesideWave: {
      borderRadius: screenWidth / 2,
      width: screenWidth / 1.5,
      height: screenWidth / 1.5,
      backgroundColor: coreColor,
      justifyContent: "center",
      alignItems: "center",
    },
    microphoneBox: {
      borderRadius: screenWidth / 2,
      width: screenWidth / 2.5,
      height: screenWidth / 2.5,
      borderWidth: 3,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: coreColor,
      borderColor: theme.colors.white,
    },
    isRecordingBox: {
      backgroundColor: theme.colors.white,
      borderColor: coreColor,
    },
    microphoneIcon: {
      color: theme.colors.white,
    },
    isRecordingMic: {
      color: coreColor,
    },
  });
}
