export interface User {
  uid: string;
  name: string;
  icon_url: string;
  introduction: string; //デフォルト：未設定？
  birth_year: number; //デフォルト：未設定？
  gender: string; //デフォルト：未設定？
}

export interface Question {
  question_id: string;
  keywords: string[]; // 10代, 女性, おでん
  isResolved: boolean;
  voice: Voice;
  answer_count: number;
  colors: string[];
  created_at: Date;
  user: User;
}

export interface Voice {
  status: string; // SUCCESS / NG_WORD / TOO_SHORT_VOICE
  message: string; // m　/ NGワード〇〇が含まれています / ボイスが短すぎます
  text: string; // 文字起こし結果全文
  text_length: number; // 上記の文字数
  voice_length: number; // 音声の長さ
  summary_text: string; // 要約されたテキスト
  segments: Segment[];
  file_url: string;
  confidence: number;
}

export interface Segment {
  start_offset_in_milliseconds: number;
  end_offset_in_milliseconds: number;
  text: string;
}

export interface Chat {
  type: string; // questioner / respondent / thank_you
  voice: Voice;
  question_id: string;
  chats_id: string;
  created_at: Date;
  user: User;
}