import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import { theme, globalStyles } from 'src/utils/theme';

const isAVPlaybackStatusSuccess = (
  arg: any
): arg is AVPlaybackStatusSuccess => {
  return arg.positionMillis !== undefined;
};

export const Player = () => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [pbs, setPbs] = React.useState<AVPlaybackStatusSuccess>();

  const initSound = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: 'https://amachamusic.chagasi.com/mp3/yume.mp3',
    });
    setSound(sound);
  };
  React.useEffect(() => {
    initSound();
  }, []);

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
          // maximumValue={pbs?.durationMillis}
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
    width: '100%',
    paddingHorizontal: 20,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
