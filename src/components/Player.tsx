import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import { theme, globalStyles } from "src/utils/theme";
import { Voice } from "src/types";
import { usePlayer } from "src/hooks/usePlayer";

export const Player = ({
  voice,
  getSound,
}: {
  voice: Voice;
  getSound?: (sound: Audio.Sound) => void;
}) => {
  const {
    sound,
    setSound,
    pbs,
    setPbs,
    currentVoice,
    setCurrentVoice,
    realTimeText,
    setRealTimeText,
    animation,
  } = usePlayer(voice, getSound);

  return (
    <View style={styles.container}>
      <View style={{ height: 48, ...styles.flexRowBetween }}>
        <TouchableOpacity
          onPress={() => {
            setCurrentVoice(voice);
            if (!pbs?.isPlaying) sound && sound.playAsync();
            else sound && sound.pauseAsync();
          }}
        >
          {!pbs?.isPlaying ? (
            <Icon
              name="play-circle"
              size={theme.iconSize.md}
              style={{ color: theme.colors.black }}
            />
          ) : (
            <Icon
              name="pause-circle"
              size={theme.iconSize.md}
              style={{ color: theme.colors.black }}
            />
          )}
        </TouchableOpacity>
        <Animated.Text
          style={{
            flex: 1,
            marginLeft: 12,
            transform: [{ translateY: animation.translateY }],
            opacity: animation.opacity,
            ...globalStyles.textBold,
          }}
        >
          {realTimeText}
        </Animated.Text>
      </View>
      <View style={{ height: 36 }}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={voice.voice_length}
          value={pbs?.positionMillis}
          thumbTintColor="#3F464E"
          minimumTrackTintColor="#3F464E"
          maximumTrackTintColor="#fff"
          onSlidingComplete={(num) => {
            sound && sound.playFromPositionAsync(num);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  flexRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
