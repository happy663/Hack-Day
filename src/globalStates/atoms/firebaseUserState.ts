import firebase, { User } from 'firebase/auth';
import { atom, selector } from 'recoil';

export const firebaseUserState = atom<User | null>({
  key: 'firebaseUserState',
  default: null,
  dangerouslyAllowMutability: true,
});
