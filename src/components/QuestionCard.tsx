import { StyleSheet, Image, Text, View, Dimensions } from "react-native";
import { theme, globalStyles } from "src/utils/theme";

type Profile = {
  name: string;
  image: string;
};

type Card = {
  profile: Profile;
  description: string;
  backgroundColor: string;
  tags: string[];
};

export const QuestionCard = (props: Card) => {
  const {
    profile: { name, image },
    description,
    backgroundColor,
    tags,
  } = props;

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={styles.isResolvedContainer}>
        <Text style={{ ...styles.isResolvedText, ...styles.isResolvedFalse }}>
          回答受付中
        </Text>
        {/* <Text style={{ ...styles.isResolvedText, ...styles.isResolvedTrue }}>
          解決済み
        </Text> */}
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconLg}
        />
        <View style={{ paddingLeft: 8 }}>
          <Text style={globalStyles.headingLg}>{name}</Text>
          <Text style={globalStyles.text}>2022/09/11 16:09</Text>
        </View>
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <Text style={styles.tag} key={Math.random()}>
            {tag}
          </Text>
        ))}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>{description}</Text>
      </View>
      <View style={styles.answerCountContainer}>
        <Text style={styles.answerCountText}>3件の回答がつきました</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // このコンポーネント以外の高さの合計を引き算する
    height: Dimensions.get("window").height - 404,
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    marginBottom: 4,
    borderRadius: 10,
    ...globalStyles.boxShadow,
  },
  isResolvedContainer: {
    alignItems: "flex-end",
  },
  isResolvedText: {
    color: "#fff",
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    ...globalStyles.headingSm,
  },
  isResolvedFalse: {
    backgroundColor: theme.colors.red,
  },
  isResolvedTrue: {
    backgroundColor: theme.colors.gray[1],
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
  summaryContainer: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    backgroundColor: theme.colors.opacityWhite,
  },
  summaryText: {
    padding: 8,
    ...globalStyles.text,
  },
  answerCountContainer: {
    paddingVertical: 12,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: theme.colors.opacityBlack,
  },
  answerCountText: {
    textAlign: "center",
    color: theme.colors.white,
    ...globalStyles.textBold,
  },
});
