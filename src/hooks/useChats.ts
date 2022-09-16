import { getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { Chat } from 'src/types';
import React, { useRef } from 'react';
import { db } from 'src/utils/firebase';
import { chatConverter } from 'src/utils/firebaseConverter';
import { useRecoilValue } from 'recoil';
import { currentQuestionState } from 'src/globalStates/atoms';

export const useChats = () => {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const currentQuestion = useRecoilValue(currentQuestionState);
  React.useEffect(() => {
    const fetchAndSetChats = async () => {
      const arrayChats: Chat[] = [];
      try {
        const q = query(
          collection(db, 'Chats').withConverter(chatConverter),
          where('question_id', '==', currentQuestion.question_id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          arrayChats.push(doc.data());
        });
        setChats(arrayChats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetChats();
  }, [currentQuestion]);

  return { chats };
};
