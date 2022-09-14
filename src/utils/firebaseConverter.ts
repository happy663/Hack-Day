import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
} from 'firebase/firestore';
import { Question } from 'src/types';

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
      question_id: data.id,
      keywords: data.keywords,
      isResolved: data.isResolved,
      voice: data.voice,
      answer_count: data.answer_count,
      colors: data.colors,
      created_at: data.created_at,
      user: data.user,
    };
  },
};
