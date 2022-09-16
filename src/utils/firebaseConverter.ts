import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
} from 'firebase/firestore';
import { Chat, Question } from 'src/types';

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

export const chatConverter: FirestoreDataConverter<Chat> = {
  toFirestore(chat: Chat): DocumentData {
    return {};
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Chat {
    const data = snapshot.data(options);
    return {
      chats_id: data.chats_id,
      question_id: data.question_id,
      created_at: new Date(data.created_at.seconds * 1000),
      type: data.type,
      user: data.user,
      voice: data.voice,
    };
  },
};
