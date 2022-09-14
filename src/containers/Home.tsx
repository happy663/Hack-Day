import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { QuestionCard, Player } from "src/components";
import { theme, globalStyles } from "src/utils/theme";

const questions = [
  {
    profile: {
      name: "れふてぃさん",
      image: "assets/lefty.png",
    },
    description: "誰か助けてください。友達と喧嘩して連絡が取れなくなりました",
    tags: ["#友達", "#喧嘩"],
    backgroundColor: "#5FABBC",
  },
  {
    profile: {
      name: "れふてぃさん",
      image: "assets/lefty.png",
    },
    description:
      "席替えで私の後ろの席に友達が座っていて、その子の隣に私の好きな人が座っています。私が彼を好きな事を知っていて応援するよと言ってくれるのですが、休み時間や授業中にすごい楽しそうに彼と話していて発言と行動が矛盾し過ぎていると思いませんか？彼女の意図はなんでしょう…",
    tags: ["#友達", "#喧嘩"],
    backgroundColor: "#ff6768",
  },
  {
    profile: {
      name: "れふてぃさん",
      image: "assets/lefty.png",
    },
    description: "誰か助けてください。友達と喧嘩して連絡が取れなくなりました/",
    tags: ["#友達", "#喧嘩"],
    backgroundColor: "#FFCECD",
  },
];

export const Home = () => {
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
          keyExtractor={(item) => item.description}
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

const PopPlayer = () => {
  return (
    <View style={styles.popPlayerContainer}>
      <View style={styles.flexItemFullWidth}>
        <HelpButton />
      </View>
      <View style={styles.flexItemFullWidth}>
        <Player />
      </View>
    </View>
  );
};

const HelpButton = () => {
  return (
    <View style={{ height: 48, ...globalStyles.flexRowCenter }}>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => console.log("pressed")}
      >
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconMd}
        />
        <Text style={globalStyles.headingMd}>〇〇さんを助ける!</Text>
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconMd}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexItemFullWidth: {
    flex: 1,
    width: "100%",
    ...globalStyles.flexCenter,
  },
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
  popPlayerContainer: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#80B1E7",
  },
  helpButton: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
  },
});
