import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { theme, globalStyles } from "src/utils/theme";

export const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Image
          source={require("assets/home.png")}
          style={globalStyles.iconSm}
        />
        <Text style={styles.caption}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image
          source={require("assets/comment.png")}
          style={globalStyles.iconSm}
        />
        <Text style={styles.caption}>回答</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image
          source={require("assets/play.png")}
          style={globalStyles.iconSm}
        />
        <Text style={styles.caption}>質問する</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image
          source={require("assets/notify.png")}
          style={globalStyles.iconSm}
        />
        <Text style={styles.caption}>通知</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Image
          source={require("assets/lefty.png")}
          style={globalStyles.iconSm}
        />
        <Text style={styles.caption}>マイページ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#fff",
    ...globalStyles.flexRowCenter,
  },
  item: {
    width: 64,
    alignItems: "center",
    marginHorizontal: 6,
  },
  caption: {
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 12,
  },
});
