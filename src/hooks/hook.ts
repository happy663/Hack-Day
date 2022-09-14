import { useRecoilState, useSetRecoilState } from 'recoil';
import { questionsState } from 'src/globalStates/atoms/questionsState';
import React from 'react';
import { Question } from 'src/types';
import { collection, getDocs } from 'firebase/firestore';
import { questionConverter } from 'src/utils/firebaseConverter';
import { db } from 'src/utils/firebase';
import { currentQuestionState } from 'src/globalStates/atoms';

export const useQuestion = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const setCurrentQuestion = useSetRecoilState(currentQuestionState);

  React.useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const dataQuestions: Question[] = [];
      const querySnapshot = await getDocs(
        collection(db, 'Questions').withConverter(questionConverter)
      );
      querySnapshot.forEach((doc) => {
        dataQuestions.push(doc.data());
      });

      setQuestions([...questions, ...dataQuestions]);
      setCurrentQuestion(dataQuestions[0]);
    };
    fetchAndSetQuestions();
  }, []);

  return { questions, setCurrentQuestion };
};
