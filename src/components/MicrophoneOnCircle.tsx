import React, { useState } from "react";
import { theme, globalStyles } from "src/utils/theme";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface MicrophoneOnCircle {
  mainColor?: string;
  subColor?: string;
  onPress?: (isRecording: boolean) => void;
}

export const MicrophoneOnCircle = (props: MicrophoneOnCircle) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const circleAnim = React.useRef({
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }).current;
  const micAnim = React.useRef(new Animated.Value(1)).current;
  const bgColor = "#E76F51";

  const animation = Animated.loop(
    Animated.parallel([
      // circleAnim.scale
      Animated.sequence([
        Animated.timing(circleAnim.scale, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim.scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // circleAnim.opacity
      Animated.sequence([
        Animated.timing(circleAnim.opacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim.opacity, {
          toValue: 0.75,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(circleAnim.opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // micAnim
      Animated.sequence([
        Animated.timing(micAnim, {
          toValue: 0.95,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(micAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ])
  );

  React.useEffect(() => {
    if (isRecording) animation.start();
    else {
      animation.stop();
      animation.reset();
    }
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.outsideWave,
          backgroundColor: bgColor,
          transform: [{ scale: circleAnim.scale }],
          opacity: circleAnim.opacity,
        }}
      />
      <Animated.View
        style={{
          ...styles.insideWave,
          backgroundColor: bgColor,
          transform: [{ scale: circleAnim.scale }],
          opacity: circleAnim.opacity,
        }}
      />
      <Animated.View
        style={{
          ...styles.microphoneAnimContainer,
          transform: [{ scale: micAnim }],
        }}
      >
        <TouchableOpacity
          style={{
            ...styles.microphoneContainer,
            backgroundColor: isRecording ? bgColor : theme.colors.white,
          }}
          onPress={() => {
            const nextState = !isRecording;
            setIsRecording(nextState);
            props.onPress && props.onPress(nextState);
            return nextState;
          }}
        >
          {isRecording ? (
            <Icon
              style={{ color: theme.colors.white }}
              size={theme.iconSize.lg}
              name={"mic"}
            />
          ) : (
            <Icon
              style={{ color: bgColor }}
              size={theme.iconSize.lg}
              name={"mic-off"}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth,
  },
  outsideWave: {
    position: "absolute",
    borderRadius: 9999,
    width: screenWidth,
    height: screenWidth,
    opacity: 0.5,
  },
  insideWave: {
    position: "absolute",
    borderRadius: 9999,
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
    top: screenWidth / 2 - screenWidth / 2 / 1.5,
    left: screenWidth / 2 - screenWidth / 2 / 1.5,
    opacity: 0.75,
  },
  microphoneAnimContainer: {
    position: "absolute",
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    top: screenWidth / 2 - screenWidth / 2 / 2.5,
    left: screenWidth / 2 - screenWidth / 2 / 2.5,
  },
  microphoneContainer: {
    position: "absolute",
    borderRadius: 9999,
    width: screenWidth / 2.5,
    height: screenWidth / 2.5,
    ...globalStyles.flexCenter,
    ...globalStyles.boxShadowLg,
  },
});
