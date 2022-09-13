import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import Slider from '@react-native-community/slider';

export const PlayBar = ({ uri }: { uri?: string | null }) => {
  const [sound, setSound] = React.useState<Audio.Sound>();
  // playbackStatus
  const [pbs, setPbs] = React.useState<AVPlaybackStatusSuccess>();

  async function initSound(source?: string | null) {
    console.log('Loading Sound');
    console.log(source);
    const { sound } = await Audio.Sound.createAsync(
      // (source && { uri: source }) ?? require("./assets/03.Initialize.mp3")
      // require("./assets/03.Initialize.mp3")
      { uri: source ?? 'https://amachamusic.chagasi.com/mp3/yume.mp3' }
    );
    setSound(sound);
  }

  // React.useEffect(() => {
  //   sound &&
  //     sound.setOnPlaybackStatusUpdate((currentPbs) => {
  //       if (isAVPlaybackStatusSuccess(currentPbs)) {
  //         setPbs(currentPbs);
  //       }
  //     });
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <>
      {/* <Button title="Init Sound" onPress={() => initSound(uri)} />
      {!pbs?.isPlaying ? (
        <Button title="Play Sound" onPress={() => sound && sound.playAsync()} />
      ) : (
        <Button
          title="Stop Sound"
          onPress={() => sound && sound.pauseAsync()}
        />
      )} */}

      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={pbs?.durationMillis}
        value={pbs?.positionMillis}
        minimumTrackTintColor="#3e3e3e"
        maximumTrackTintColor="#000000"
        onSlidingComplete={(num) => {
          sound && sound.playFromPositionAsync(num);
        }}
      />
    </>
  );
};
