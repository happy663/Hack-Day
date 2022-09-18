import React, { useEffect } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { theme, globalStyles } from "src/utils/theme";
import Icon from "react-native-vector-icons/Feather";
import { navigate } from "src/routes/ApplicationRoutes";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { userState } from "src/globalStates/atoms/userState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentPageState } from "src/globalStates/atoms/currentPage";

export const NavigationBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const currentPage = state.routes[state.index].name;
  const user = useRecoilValue(userState);
  const setCurrentPageGlobalState = useSetRecoilState(currentPageState);

  useEffect(() => {
    setCurrentPageGlobalState(currentPage);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigate("Home")}>
        <Icon
          name="home"
          size={theme.iconSize.sm}
          style={{
            color:
              currentPage === "Home" ? theme.colors.main : theme.colors.black,
          }}
        />
        <Text style={styles.caption}>ホーム</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => console.log("pressed answered")}
      >
        <Icon
          name="message-square"
          size={theme.iconSize.sm}
          style={{
            color:
              currentPage === "Answered"
                ? theme.colors.main
                : theme.colors.black,
          }}
        />
        <Text style={styles.caption}>回答</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.item, transform: [{ translateY: -8 }] }}
        onPress={() => navigate("NewQuestion")}
      >
        <View
          style={{
            ...styles.iconButton,
            borderColor:
              currentPage === "NewQuestion"
                ? theme.colors.main
                : theme.colors.white,
          }}
        >
          <Icon
            name="plus"
            size={28}
            style={{
              color: theme.colors.white,
            }}
          />
        </View>
        <Text style={styles.caption}>質問する</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Icon
          name="bell"
          size={theme.iconSize.sm}
          style={{
            color:
              currentPage === "Notification"
                ? theme.colors.main
                : theme.colors.black,
          }}
        />
        <Text style={styles.caption}>通知</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.item, transform: [{ translateY: -2 }] }}
      >
        <View
          style={{
            ...styles.iconImageButton,
            backgroundColor:
              currentPage === "MyPage" ? theme.colors.main : theme.colors.white,
          }}
        >
          <Image
            source={
              user?.icon_url
                ? { uri: user.icon_url }
                : require("assets/lefty.png")
            }
            style={{ ...globalStyles.iconSm, borderRadius: 30 }}
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
