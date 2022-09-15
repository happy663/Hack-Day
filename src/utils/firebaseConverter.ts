import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
} from "firebase/firestore";
import { Question } from "src/types";

export const questionConverter: FirestoreDataConverter<Question> = {
  toFirestore(question: Question): DocumentData {
    return {};
  },

  /**
   * Firestore ドキュメントデータを Book オブジェクトへ変換します。
   */
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Question {
    const data = snapshot.data(options);

    return {
      question_id: data.question_id,
      keywords: data.keywords,
      isResolved: data.isResolved,
      voice: data.voice,
      answer_count: data.answer_count,
      colors: data.colors,
      created_at: new Date(data.created_at.seconds * 1000),
      user: data.user,
    };
  },
};
