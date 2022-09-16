import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Feather";
import { theme, globalStyles } from "src/utils/theme";
import { useRecoilState } from "recoil";
import { currentVoiceState } from "src/globalStates/atoms";

import { Voice } from "src/types";

const isAVPlaybackStatusSuccess = (
  arg: any
): arg is AVPlaybackStatusSuccess => {
  return arg.positionMillis !== undefined;
};

export const Player = ({
  voice,
  getSound,
}: {
  voice: Voice;
  getSound?: (sound: Audio.Sound) => void;
}) => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [pbs, setPbs] = React.useState<AVPlaybackStatusSuccess>();
  const [currentVoice, setCurrentVoice] = useRecoilState(currentVoiceState);

  const initSound = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: voice.file_url,
    });
    setSound(sound);
    sound && getSound && getSound(sound);
  };

  React.useEffect(() => {
    if (currentVoice?.file_url !== voice.file_url) sound && sound.pauseAsync();
  }, [currentVoice]);

  React.useEffect(() => {
    initSound();
  }, [voice?.file_url]);

  React.useEffect(() => {
    sound &&
      sound.setOnPlaybackStatusUpdate((currentPbs) => {
        if (isAVPlaybackStatusSuccess(currentPbs)) {
          setPbs(currentPbs);
        }
      });
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
        <Text style={{ flex: 1, marginLeft: 12, ...globalStyles.textBold }}>
          席替えで私の後ろの席に友達が座っていて、その子の隣に私の好きな人が座っています。
        </Text>
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
