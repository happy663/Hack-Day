import { atom } from "recoil";
import { Question } from "src/types";

export const currentQuestionState = atom<Question>({
  key: "currentQuestionState",
  default: {
    question_id: "",
    keywords: [],
    isResolved: false,
    voice: {
      status: "",
      message: "",
      text: "",
      text_length: 0,
      voice_length: 0,
      summary_text: "",
      segments: [],
      file_url: "",
      confidence: 0,
    },
    colors: ["#84fab0", "#8fd3f4"],
    answer_count: 0,
    created_at: new Date(),
    user: {
      uid: "",
      name: "",
      icon_url: "",
      introduction: "",
      birth_year: 1998,
      gender: "man",
    },
  },
});
