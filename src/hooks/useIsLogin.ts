import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firebaseUserState } from "src/globalStates/atoms/firebaseUserState";
import { useState } from "react";
import { app, db } from "src/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { isNewUserState } from "src/globalStates/atoms/isNewUserState";
import { userState } from "src/globalStates/atoms/userState";
import { userConverter } from "src/utils/firebaseConverter";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>();
  const setIsNewUser = useSetRecoilState(isNewUserState);
  const setUser = useSetRecoilState(userState);

  const setFirebaseUser = useSetRecoilState(firebaseUserState);
  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "Users").withConverter(userConverter),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        //fireStoreにユーザが存在しない場合
        if (querySnapshot.size === 0) {
          setIsNewUser(true);
        } else {
          //fireStoreにユーザが存在する場合
          setIsNewUser(false);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
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
