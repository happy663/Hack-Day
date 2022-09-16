import { userState } from 'src/globalStates/atoms/userState';
import firebase, {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { app, auth } from 'src/utils/firebase';
import { useEffect, useState } from 'react';

type Auth = {
  user: User | null;
  loading: boolean;
  googleSignIn: () => Promise<boolean>;
};

const useAuth = () => {};
