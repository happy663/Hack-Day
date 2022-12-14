import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { questionsState } from "src/globalStates/atoms";
import { Question } from "src/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { questionConverter } from "src/utils/firebaseConverter";
import { db } from "src/utils/firebase";
import { currentPageState } from "src/globalStates/atoms/currentPage";

export const useQuestions = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const currentPage = useRecoilValue(currentPageState);

  React.useEffect(() => {
    const fetchAndSetQuestions = async () => {
      const arrayQuestion: Question[] = [];
      const ref = collection(db, "Questions").withConverter(questionConverter);
      const q = query(ref, orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arrayQuestion.push(doc.data());
      });
      setQuestions([...arrayQuestion]);
    };
    fetchAndSetQuestions();
  }, [currentPage]);

  return questions;
};
