import { atom } from "recoil";

export type RecognizeStatus =
  | "recognizing"
  | "SUCCESS"
  | "NG_WORD"
  | "TOO_SHORT_VOICE"
  | "recognizing_faild";
export type RecordingStatus = "ready" | "recording" | "recording_faild";

export const recordingState = atom<RecordingStatus>({
  key: "recordingState",
  default: "ready",
});

export type NewQuestionScreenState = RecordingStatus | RecognizeStatus;

export const newQuestionScreenState = atom<NewQuestionScreenState>({
  key: "newQuestionState",
  default: "ready",
});
