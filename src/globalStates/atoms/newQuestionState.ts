import { atom, selector } from "recoil";

export type RecognizeResultType = "SUCCESS" | "NG_WORD" | "TOO_SHORT_VOICE";
export type RecordingStatus = "ready" | "recording" | "recording_faild";

export const recordingState = atom<RecordingStatus>({
  key: "isRecordingState",
  default: "ready",
});

export type NewQuestionScreenState =
  | RecordingStatus
  | RecognizeResultType
  | "recognizing";

export const newQuestionState = selector<NewQuestionScreenState>({
  key: "newQuestionState",
  get: ({ get }) => {
    const isRecording = get(recordingState);

    if (isRecording) return "recording";
    return "ready";
  },
});
