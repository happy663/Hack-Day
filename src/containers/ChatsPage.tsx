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
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useChats } from "src/hooks/useChats";
import { Audio } from "expo-av";

export const ChatsPage = () => {
  const currentQuestion = useRecoilValue(currentQuestionState);
  const [sound, setSound] = React.useState<Audio.Sound>();
  const { chats } = useChats();
  const isFocused = useIsFocused();

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

  React.useEffect(() => {
    if (!isFocused) sound && sound.pauseAsync();
  }, [isFocused]);

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
        <Player voice={currentQuestion?.voice} getSound={(e) => setSound(e)} />
      </LinearGradient>
      <LinearGradient
        colors={currentQuestion.colors}
        style={styles.chatsBodyContainer}
      >
        <ScrollView style={styles.chatsBody}>
          {chats
            ?.filter((item) => item.type === "thank_you")
            ?.map((item) => (
              <ChatItem {...item} key={item.chats_id} />
            ))}
          {chats
            ?.filter((item) => item.type !== "thank_you")
            ?.map((item) => (
              <ChatItem {...item} key={item.chats_id} />
            ))}
          {!chats.length && (
            <Text
              style={{
                ...globalStyles.headingMd,
                textAlign: "center",
                marginTop: 100,
              }}
            >
              回答がまだありません💦
            </Text>
          )}
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
