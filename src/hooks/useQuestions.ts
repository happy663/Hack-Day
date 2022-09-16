import React from "react";
import { useRecoilState } from "recoil";
import { questionsState } from "src/globalStates/atoms";
import { Question } from "src/types";
import { collection, getDocs } from "firebase/firestore";
import { questionConverter } from "src/utils/firebaseConverter";
import { db } from "src/utils/firebase";

export const useQuestions = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);

  React.useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const arrayQuestion: Question[] = [];
      const querySnapshot = await getDocs(
        collection(db, "Questions").withConverter(questionConverter)
      );
      querySnapshot.forEach((doc) => {
        arrayQuestion.push(doc.data());
      });
      setQuestions([...arrayQuestion]);
    };
    fetchAndSetQuestions();
  }, []);

  return questions;
};
