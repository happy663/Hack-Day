import { atom } from 'recoil';
import { Question } from 'src/types';

export const questionsState = atom<Question[]>({
  key: 'questionState',
  default: [],
});
