import React from "react";
import { Text, Modal, View, Pressable, FlatList } from "react-native";
import { theme } from "src/utils/theme";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chat } from "src/types";

export interface ConfilmChatContentModal {
  modalVisiblity: boolean;
  createdChat: Chat | null;
  onRequestClose: () => void;
  onPressCancel: () => void;
  onPressSend: () => void;
}

export const ConfilmChatContentModal = (props: ConfilmChatContentModal) => {
  const {
    modalVisiblity,
    createdChat,
    onRequestClose,
    onPressCancel,
    onPressSend,
  } = props;

  const testCreatedChat = {
    voice: {
      segments: [
        {
          text: "こんにちは",
        },
        {
          text: "私の名前はnullです",
        },
        {
          text: "きょうはみなさんをNullpointerexceptionで苦しめるためにやってきました．",
        },
      ],
    },
  };
  const tmpCreatedChat = createdChat || testCreatedChat;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisiblity}
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: 15,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#BFD2D3",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              backgroundColor: "black",
              opacity: 0.9,
              color: theme.colors.white,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            あなたの声
          </Text>
        </View>
        <LinearGradient
          colors={["#F4A261", "#E9C46A"]}
          style={{
            backgroundColor: theme.colors.white,
          }}
        >
          <View
            style={{
              height: 300,
              padding: 20,
              flexGrow: 0,
            }}
          >
            <Text style={styles.summaryHeader}>要約テキスト</Text>
            <FlatList
              style={styles.summaryBox}
              data={tmpCreatedChat ? tmpCreatedChat.voice.segments : []}
              renderItem={(info) => (
                <Text style={styles.summaryText}>{info.item.text}</Text>
              )}
            />
          </View>
          {/* {createdChat && <ChatItem {...createdChat} />} */}
        </LinearGradient>

        <View
          style={{
            backgroundColor: "#ddee00",
            flexDirection: "row",
            justifyContent: "space-around",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Pressable
            style={[styles.button, { borderRightWidth: 1 }]}
            onPress={onPressCancel}
          >
            <Text style={styles.buttonText}>削除する</Text>
          </Pressable>
          <Pressable style={[styles.button]} onPress={onPressSend}>
            <Text style={styles.buttonText}>投稿する</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  summaryBox: {
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: "#aaaaaa",
    backgroundColor: "#f0f0f0",
  },
  summaryText: {
    fontSize: 20,
    lineHeight: 30,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 32,
  },
  button: {
    padding: 10,
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
