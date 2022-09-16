import { Audio } from "expo-av";

export const audioInitalize = async () => {
  const response = await Audio.getPermissionsAsync();

  if (response.granted) return;

  await Audio.requestPermissionsAsync();
};
