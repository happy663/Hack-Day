import { atom } from 'recoil';
import { User } from 'src/types';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});
