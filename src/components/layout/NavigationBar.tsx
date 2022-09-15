import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { theme, globalStyles } from "src/utils/theme";
import Icon from "react-native-vector-icons/Feather";
import { navigate } from "src/routes/ApplicationRoutes";

export const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigate("Home")}>
        <Icon
          name="home"
          size={theme.iconSize.sm}
          style={{ color: theme.colors.main }}
        />
        <Text style={styles.caption}>ホーム</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigate("Chats")}>
        <Icon
          name="message-square"
          size={theme.iconSize.sm}
          style={{ color: theme.colors.black }}
        />
        <Text style={styles.caption}>回答</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.item, transform: [{ translateY: -8 }] }}
        onPress={() => navigate("NewQuestion")}
      >
        <View style={styles.iconButton}>
          <Icon name="plus" size={28} style={{ color: theme.colors.white }} />
        </View>
        <Text style={styles.caption}>質問する</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Icon
          name="bell"
          size={theme.iconSize.sm}
          style={{ color: theme.colors.black }}
        />
        <Text style={styles.caption}>通知</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.item, transform: [{ translateY: -2 }] }}
      >
        <View
          style={{
            ...styles.iconImageButton,
            backgroundColor: theme.colors.white,
          }}
        >
          <Image
            source={require("assets/lefty.png")}
            style={{ ...globalStyles.iconSm }}
          />
        </View>
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
    fontWeight: "900",
    fontSize: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    borderColor: theme.colors.white,
    borderWidth: 4,
    backgroundColor: theme.colors.main,
    ...globalStyles.flexCenter,
  },
  iconImageButton: {
    width: 28,
    height: 28,
    borderRadius: 100,
    ...globalStyles.flexCenter,
  },
});
