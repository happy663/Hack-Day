import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export const audioInitalize = async () => {
  const response = await Audio.getPermissionsAsync();

  if (response.granted) return;

  await Audio.requestPermissionsAsync();
};

export async function startRecording() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
    (recordingStatus) => {}
  );
  return recording;
}

export async function getRecordingFileURI(
  questionRecord: Audio.Recording
): Promise<[Audio.RecordingStatus, string]> {
  const status = await questionRecord.stopAndUnloadAsync();
  const recordFileURI = questionRecord.getURI();
  if (!recordFileURI) throw new Error("record file uri not found.");
  return [status, recordFileURI];
}

export const postNewQuestion = async (recordFileURI: string) => {
  const url = "https://hackday.kajilab.tk/upload";
  const response = await FileSystem.uploadAsync(url, recordFileURI, {
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    httpMethod: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    fieldName: "file",
    parameters: {
      user_id: "6kSDkE0SNvWuVbiSVg8W",
      is_answer: "false",
      type: "questioner",
    },
  });
  const newQuestion = JSON.parse(response.body);
  return newQuestion;
};
