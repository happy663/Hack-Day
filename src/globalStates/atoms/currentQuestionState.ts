import { atom } from 'recoil';
import { Question } from 'src/types';

export const currentQuestionState = atom<Question>({
  key: 'currentQuestionState',
  default: {
    question_id: '',
    keywords: [],
    isResolved: false,
    voice: {
      status: '',
      message: '',
      text: '',
      text_length: 0,
      voice_length: 0,
      summary_text: '',
      segments: [],
      file_url:
        'https://storage.googleapis.com/hackday-4daec.appspot.com/questions/m5z14rK1o4BX17O62pbI/e0e1999c-cba8-4371-a47e-12fe411dfcd0.wav',
      confidence: 0,
    },
    colors: ['#84fab0', '#8fd3f4'],
    answer_count: 0,
    created_at: new Date(),
    user: {
      uid: '',
      name: '',
      icon_url:
        'https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/png/ei-smiling_face.png',
      introduction: '',
      birth_year: 1998,
      gender: 'man',
    },
  },
});
