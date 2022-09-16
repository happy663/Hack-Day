import { atom } from "recoil";
import { Voice } from "src/types";

export const currentVoiceState = atom<Voice>({
  key: "currentVoiceState",
  default: undefined,
});
