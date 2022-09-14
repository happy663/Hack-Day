import { StyleSheet, Image, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme, globalStyles } from "src/utils/theme";
import { Question } from "src/types";

export const QuestionCard = ({
  keywords,
  isResolved,
  voice,
  answer_count,
  colors,
  created_at,
  user,
}: Question) => {
  return (
    <LinearGradient colors={colors} style={{ ...styles.container }}>
      <View style={styles.isResolvedContainer}>
        {!isResolved ? (
          <Text style={{ ...styles.isResolvedText, ...styles.isResolvedFalse }}>
            回答受付中
          </Text>
        ) : (
          <Text style={{ ...styles.isResolvedText, ...styles.isResolvedTrue }}>
            解決済み
          </Text>
        )}
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconLg}
        />
        <View style={{ paddingLeft: 8 }}>
          <Text style={globalStyles.headingLg}>{user.name}</Text>
          <Text style={globalStyles.text}>2022/09/11 16:09</Text>
        </View>
      </View>
      <View style={styles.tagContainer}>
        {keywords.map((keyword) => (
          <Text style={styles.tag} key={Math.random()}>
            {keyword}
          </Text>
        ))}
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>{voice.summary_text}</Text>
      </View>
      <View style={styles.answerCountContainer}>
        <Text style={styles.answerCountText}>3件の回答がつきました</Text>
      </View>
    </LinearGradient>
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
