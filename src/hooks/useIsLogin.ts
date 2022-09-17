import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { firebaseUserState } from 'src/globalStates/atoms/firebaseUserState';
import { useState } from 'react';
import { app, db } from 'src/utils/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>();

  const setFirebaseUser = useSetRecoilState(firebaseUserState);
  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, 'Users'),
            where('uid', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          //ユーザが存在しない場合は、新規登録
          if (querySnapshot.size === 0) {
            await setDoc(doc(db, 'Users', user.uid), {
              uid: user.uid,
              name: user.displayName,
              icon_URL: user.photoURL,
              birth_year: 2000,
              gender: '男性',
              introduction: 'よろしくおねがいします',
            });
          }
        } catch (error) {
          console.log(error);
        }

        setFirebaseUser(user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [setFirebaseUser]);

  return isLogin;
};
