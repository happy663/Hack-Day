import { atom } from "recoil";
import { Question } from "src/types";

export const currentQuestionState = atom<Question>({
  key: "currentQuestionState",
  default: undefined,
});
