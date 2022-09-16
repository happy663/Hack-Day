import { getDoc } from 'firebase/firestore';
import { Chat } from 'src/types';
import React, { useRef } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/utils/firebase';
import { chatConverter } from 'src/utils/firebaseConverter';

export const useChats = () => {
  const [chats, setChats] = React.useState<Chat[]>([]);
  React.useEffect(() => {
    const fetchAndSetChats = async () => {
      const arrayChats: Chat[] = [];
      try {
        const querySnapshot = await getDocs(
          collection(db, 'Chats').withConverter(chatConverter)
        );
        querySnapshot.forEach((doc) => {
          arrayChats.push(doc.data());
        });
        setChats(arrayChats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetChats();
  }, []);

  return {chats};
};
