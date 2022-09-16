import * as React from "react";
import { Animated } from "react-native";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { useRecoilState } from "recoil";
import { currentVoiceState } from "src/globalStates/atoms";
import { Voice } from "src/types";

const isAVPlaybackStatusSuccess = (
  arg: any
): arg is AVPlaybackStatusSuccess => {
  return arg.positionMillis !== undefined;
};

export const usePlayer = (
  voice: Voice,
  getSound?: (sound: Audio.Sound) => void
) => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [pbs, setPbs] = React.useState<AVPlaybackStatusSuccess>();
  const [currentVoice, setCurrentVoice] = useRecoilState(currentVoiceState);
  const [realTimeText, setRealTimeText] = React.useState<string>("");

  const animation = React.useRef({
    translateY: new Animated.Value(0),
    opacity: new Animated.Value(1),
  }).current;

  const initSound = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: voice.file_url,
    });
    setSound(sound);
    sound && getSound && getSound(sound);
  };

  React.useEffect(() => {
    if (currentVoice?.file_url !== voice.file_url) sound && sound.pauseAsync();
    setRealTimeText(voice?.segments[0].text);
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

  React.useEffect(() => {
    //segmentから2分探索で文字列を探してrealTimeTextにセットする
    const segment = voice?.segments;
    const positionMillis = pbs?.positionMillis;
    if (segment && positionMillis) {
      let left = 0;
      let right = segment.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (segment[mid].start_offset_in_milliseconds <= positionMillis) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      if (segment[left - 1] == undefined) {
        setRealTimeText(segment[0].text);
      } else {
        if (realTimeText !== segment[left - 1].text) {
          Animated.parallel([
            Animated.sequence([
              Animated.timing(animation.translateY, {
                toValue: -30,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(animation.translateY, {
                toValue: 30,
                duration: 0,
                useNativeDriver: true,
              }),
              Animated.timing(animation.translateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(animation.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(animation.opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]),
          ]).start();
          setRealTimeText(segment[left - 1].text);
        }
      }
    }
  }, [pbs]);

  return {
    sound,
    setSound,
    pbs,
    setPbs,
    currentVoice,
    setCurrentVoice,
    realTimeText,
    setRealTimeText,
    animation,
  };
};
