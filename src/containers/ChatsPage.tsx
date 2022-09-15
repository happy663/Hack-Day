import React, { useRef } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Player, ChatItem } from "src/components";
import { theme, globalStyles } from "src/utils/theme";
import { useRecoilValue } from "recoil";
import { currentQuestionState } from "src/globalStates/atoms";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Feather";

import { useFocusEffect } from "@react-navigation/native";

export const ChatsPage = () => {
  const currentQuestion = useRecoilValue(currentQuestionState);
  const startPosition = new Animated.Value(
    Dimensions.get("window").height - 300
  );
  const animation = useRef(startPosition).current;
  useFocusEffect(
    React.useCallback(() => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: startPosition,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{ translateY: animation }],
      }}
    >
      <LinearGradient
        colors={currentQuestion.colors}
        style={styles.headerContainer}
      >
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: currentQuestion.user.icon_url }}
            style={globalStyles.iconLg}
          />
          <View style={{ paddingLeft: 8 }}>
            <Text style={globalStyles.headingLg}>
              {currentQuestion.user.name}
            </Text>
            <Text style={globalStyles.text}>
              {format(currentQuestion.created_at, "yyyy年MM月dd日")}
            </Text>
          </View>
        </View>
        <View style={styles.tagContainer}>
          {currentQuestion.keywords?.map((keyword) => (
            <Text style={styles.tag} key={Math.random()}>
              {keyword}
            </Text>
          ))}
        </View>
        <Player />
      </LinearGradient>
      <LinearGradient
        colors={currentQuestion.colors}
        style={styles.chatsBodyContainer}
      >
        <ScrollView style={styles.chatsBody}>
          {testData
            .filter((item) => item.type === "thank_you")
            .map((item) => (
              <ChatItem {...item} key={item.chats_id} />
            ))}
          {testData
            .filter((item) => item.type !== "thank_you")
            .map((item) => (
              <ChatItem {...item} key={item.chats_id} />
            ))}
          <View style={styles.BottomSpace} />
        </ScrollView>
        <TouchableOpacity
          style={styles.responseButton}
          onPress={() => console.log("onPress")}
        >
          <Icon name="mic" size={theme.iconSize.sm} />
          <Text style={{ marginLeft: 8, ...globalStyles.headingMd }}>
            声を届ける
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  headerContainer: {
    height: 210,
    padding: 10,
    justifyContent: "space-around",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tagContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tag: {
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: theme.colors.white,
    ...globalStyles.textBold,
  },
  chatsBodyContainer: {
    flex: 1,
  },
  chatsBody: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.opacityWhite,
  },
  responseButton: {
    position: "absolute",
    backgroundColor: theme.colors.white,
    borderRadius: 100,
    width: 180,
    paddingVertical: 12,
    paddingHorizontal: 24,
    bottom: 40,
    left: Dimensions.get("window").width / 2 - 90,
    ...globalStyles.flexRowCenter,
    ...globalStyles.boxShadow,
  },
  BottomSpace: {
    height: 120,
  },
});

const testData = [
  {
    type: "respondent",
    voice: {
      status: "SUCCESS",
      message: "問題ありません",
      text: "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ある寒い雪の日おじいさんは街へ滝を売りに出かけた帰り 雪の中に何かが動いているのを見つけましたあれはなんだろう",
      text_length: 91,
      voice_length: 21590,
      summary_text:
        "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ",
      segments: [
        {
          text: "鶴の恩返し、昔、昔あるところに貧しいおじいさんとおばあさんが住んでいました",
          start_offset_in_milliseconds: 1030,
          end_offset_in_milliseconds: 9190,
        },
        {
          text: "ある寒い雪の日、おじいさんは街へ滝を売りに出かけた帰り、",
          start_offset_in_milliseconds: 9330,
          end_offset_in_milliseconds: 15590,
        },
        {
          text: "雪の中に何かが動いているのを見つけましたあれはなんだろう。",
          start_offset_in_milliseconds: 16079,
          end_offset_in_milliseconds: 21590,
        },
      ],
      file_url:
        "https://storage.googleapis.com/hackday-4daec.appspot.com/answers/6kSDkE0SNvWuVbiSVg8W/74b98649-b354-416c-aa24-59ca9f6ccce4.wav",
      confidence: 0.9373192191123962,
    },
    question_id: "oglSYeCixREXmDGbZc8L",
    chats_id: "U09nDk9TRQYcje7c5Dg1",
    created_at: new Date("2022-09-15T02:30:37.128318"),
    user: {
      introduction: "ねこですよろしくおねがいします",
      uid: "6kSDkE0SNvWuVbiSVg8W",
      gender: "男",
      icon_url:
        "https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/png/ei-smiling_face.png",
      birth_year: 1998,
      name: "miyagawa",
    },
  },
  {
    type: "respondent",
    voice: {
      status: "SUCCESS",
      message: "問題ありません",
      text: "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ある寒い雪の日おじいさんは街へ滝を売りに出かけた帰り 雪の中に何かが動いているのを見つけましたあれはなんだろう",
      text_length: 91,
      voice_length: 21590,
      summary_text:
        "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ",
      segments: [
        {
          text: "鶴の恩返し、昔、昔あるところに貧しいおじいさんとおばあさんが住んでいました",
          start_offset_in_milliseconds: 1030,
          end_offset_in_milliseconds: 9190,
        },
        {
          text: "ある寒い雪の日、おじいさんは街へ滝を売りに出かけた帰り、",
          start_offset_in_milliseconds: 9330,
          end_offset_in_milliseconds: 15590,
        },
        {
          text: "雪の中に何かが動いているのを見つけましたあれはなんだろう。",
          start_offset_in_milliseconds: 16079,
          end_offset_in_milliseconds: 21590,
        },
      ],
      file_url:
        "https://storage.googleapis.com/hackday-4daec.appspot.com/answers/6kSDkE0SNvWuVbiSVg8W/74b98649-b354-416c-aa24-59ca9f6ccce4.wav",
      confidence: 0.9373192191123962,
    },
    question_id: "oglSYeCixREXmDGbZc8L",
    chats_id: "U09nDk9TRQYcje7c5Dg6",
    created_at: new Date("2022-09-15T02:30:37.128318"),
    user: {
      introduction: "ねこですよろしくおねがいします",
      uid: "6kSDkE0SNvWuVbiSVg8W",
      gender: "男",
      icon_url:
        "https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/png/ei-smiling_face.png",
      birth_year: 1998,
      name: "miyagawa",
    },
  },
  {
    type: "thank_you",
    voice: {
      status: "SUCCESS",
      message: "問題ありません",
      text: "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ある寒い雪の日おじいさんは街へ滝を売りに出かけた帰り 雪の中に何かが動いているのを見つけましたあれはなんだろう",
      text_length: 91,
      voice_length: 21590,
      summary_text:
        "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ",
      segments: [
        {
          text: "鶴の恩返し、昔、昔あるところに貧しいおじいさんとおばあさんが住んでいました",
          start_offset_in_milliseconds: 1030,
          end_offset_in_milliseconds: 9190,
        },
        {
          text: "ある寒い雪の日、おじいさんは街へ滝を売りに出かけた帰り、",
          start_offset_in_milliseconds: 9330,
          end_offset_in_milliseconds: 15590,
        },
        {
          text: "雪の中に何かが動いているのを見つけましたあれはなんだろう。",
          start_offset_in_milliseconds: 16079,
          end_offset_in_milliseconds: 21590,
        },
      ],
      file_url:
        "https://storage.googleapis.com/hackday-4daec.appspot.com/answers/6kSDkE0SNvWuVbiSVg8W/74b98649-b354-416c-aa24-59ca9f6ccce4.wav",
      confidence: 0.9373192191123962,
    },
    question_id: "oglSYeCixREXmDGbZc8L",
    chats_id: "U09nDk9TRQYcje7c5Dg2",
    created_at: new Date("2022-09-15T02:30:37.128318"),
    user: {
      introduction: "ねこですよろしくおねがいします",
      uid: "6kSDkE0SNvWuVbiSVg8W",
      gender: "男",
      icon_url:
        "https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/png/ei-smiling_face.png",
      birth_year: 1998,
      name: "miyagawa",
    },
  },
  {
    type: "questioner",
    voice: {
      status: "SUCCESS",
      message: "問題ありません",
      text: "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ある寒い雪の日おじいさんは街へ滝を売りに出かけた帰り 雪の中に何かが動いているのを見つけましたあれはなんだろう",
      text_length: 91,
      voice_length: 21590,
      summary_text:
        "鶴の恩返し昔昔あるところに貧しいおじいさんとおばあさんが住んでいました ",
      segments: [
        {
          text: "鶴の恩返し、昔、昔あるところに貧しいおじいさんとおばあさんが住んでいました",
          start_offset_in_milliseconds: 1030,
          end_offset_in_milliseconds: 9190,
        },
        {
          text: "ある寒い雪の日、おじいさんは街へ滝を売りに出かけた帰り、",
          start_offset_in_milliseconds: 9330,
          end_offset_in_milliseconds: 15590,
        },
        {
          text: "雪の中に何かが動いているのを見つけましたあれはなんだろう。",
          start_offset_in_milliseconds: 16079,
          end_offset_in_milliseconds: 21590,
        },
      ],
      file_url:
        "https://storage.googleapis.com/hackday-4daec.appspot.com/answers/6kSDkE0SNvWuVbiSVg8W/74b98649-b354-416c-aa24-59ca9f6ccce4.wav",
      confidence: 0.9373192191123962,
    },
    question_id: "oglSYeCixREXmDGbZc8L",
    chats_id: "U09nDk9TRQYcje7c5DgC",
    created_at: new Date("2022-09-15T02:30:37.128318"),
    user: {
      introduction: "ねこですよろしくおねがいします",
      uid: "6kSDkE0SNvWuVbiSVg8W",
      gender: "男",
      icon_url:
        "https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/png/ei-smiling_face.png",
      birth_year: 1998,
      name: "miyagawa",
    },
  },
];
