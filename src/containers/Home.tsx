import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Dimensions,
  ViewToken,
} from "react-native";
import { QuestionCard, PopPlayer } from "src/components";
import { theme, globalStyles } from "src/utils/theme";
import { useRecoilState } from "recoil";
import { currentQuestionState } from "src/globalStates/atoms";

const questions = [
  {
    question_id: "385518dd-dc50-4e34-bbf6-d44588de56c2",
    keywords: ["10代", "女性", "雪の日"],
    isResolved: false,
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
        "https://storage.googleapis.com/hackday-4daec.appspot.com/questions/aaa/4ba4a3af-c660-46a5-bd3b-93e33c62af06.wav",
      confidence: 0.9373192191123962,
    },
    colors: ["#84fab0", "#8fd3f4"],
    answer_count: 0,
    created_at: new Date("2022-09-14T23:39:55.228878"),
    user: {
      uid: "aaa",
      name: "name",
      icon_url: "https://kajilab.net/hpg/img/main/logo.jpg",
      introduction: "introduction",
      birth_year: 20,
      gender: "man",
    },
  },
  {
    question_id: "385518dd-dc50-4e34-bbf6-d44588de56c3",
    keywords: ["10代", "女性", "雪の日"],
    isResolved: false,
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
        "https://storage.googleapis.com/hackday-4daec.appspot.com/questions/aaa/4ba4a3af-c660-46a5-bd3b-93e33c62af06.wav",
      confidence: 0.9373192191123962,
    },
    colors: ["#d4fc79", "#96e6a1"],
    answer_count: 0,
    created_at: new Date("2022-09-14T23:39:55.228878"),
    user: {
      uid: "aaa",
      name: "name",
      icon_url: "https://kajilab.net/hpg/img/main/logo.jpg",
      introduction: "introduction",
      birth_year: 20,
      gender: "man",
    },
  },
  {
    question_id: "385518dd-dc50-4e34-bbf6-d44588de56c4",
    keywords: ["10代", "女性", "雪の日"],
    isResolved: false,
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
        "https://storage.googleapis.com/hackday-4daec.appspot.com/questions/aaa/4ba4a3af-c660-46a5-bd3b-93e33c62af06.wav",
      confidence: 0.9373192191123962,
    },
    colors: ["#fccb90", "#d57eeb"],
    answer_count: 0,
    created_at: new Date("2022-09-14T23:39:55.228878"),
    user: {
      uid: "aaa",
      name: "name",
      icon_url: "https://kajilab.net/hpg/img/main/logo.jpg",
      introduction: "introduction",
      birth_year: 20,
      gender: "man",
    },
  },
];

export const Home = () => {
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(currentQuestionState);
  const viewabilityConfig = React.useRef({
    waitForInteraction: true,
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 50,
  });
  const onViewableItemsChanged = React.useRef(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      viewableItems.map((viewableItem) => {
        // console.log(viewableItem.key);
        setCurrentQuestion({ ...viewableItem.item });
      });
    }
  );
  React.useEffect(() => {
    setCurrentQuestion(questions[0]);
  }, []);
  // console.log(currentQuestion.colors);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 30, ...styles.containerItem }}>
        <TextInput style={styles.searchBar} />
      </View>
      <View style={{ flex: 1, ...styles.containerItem }}>
        <FlatList
          horizontal
          data={questions}
          renderItem={({ item }) => <QuestionCard {...item} />}
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          keyExtractor={(item) => item.question_id}
          snapToAlignment="start"
          decelerationRate={"normal"}
          snapToInterval={Dimensions.get("window").width}
        />
      </View>
      <View style={{ height: 180, ...styles.containerItem }}>
        <PopPlayer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 20,
    ...globalStyles.flexRowCenter,
  },
  searchBar: {
    flex: 0.85,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
    ...globalStyles.boxShadow,
  },
});
