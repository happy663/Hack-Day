import { atom, selector } from "recoil";

export type RecordingResultType = "SUCCESS" | "NG_WORD" | "TOO_SHORT_VOICE";

export const isRecordingState = atom({
  key: "isRecordingState",
  default: false,
});

export type NewQuestionScreenState =
  | "ready"
  | "recording"
  | "recognizing"
  | RecordingResultType;

export const newQuestionState = selector<NewQuestionScreenState>({
  key: "newQuestionState",
  get: ({ get }) => {
    const isRecording = get(isRecordingState);

    if (isRecording) return "recording";
    return "ready";
  },
});
