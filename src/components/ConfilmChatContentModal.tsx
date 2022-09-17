import React from "react";
import { Text, Modal, View, Pressable, FlatList } from "react-native";
import { theme } from "src/utils/theme";
import { StyleSheet } from "react-native";

export interface ConfilmChatContentModal {
  modalVisiblity: boolean;
  onRequestClose: () => void;
  onPressCancel: () => void;
  onPressSend: () => void;
}

export const ConfilmChatContentModal = (props: ConfilmChatContentModal) => {
  const { modalVisiblity, onRequestClose, onPressCancel, onPressSend } = props;

  const createdChat = {
    voice: {
      segments: [
        "こんにちは",
        "私の名前はnullです",
        "きょうはみなさんをNullpointerexceptionで苦しめるためにやってきました．",
      ],
    },
  };

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
              textAlign: "left",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            内容
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.white,
          }}
        >
          <FlatList
            style={{
              backgroundColor: "#f0f0f0",
              height: 300,
              padding: 20,
              flexGrow: 0,
            }}
            data={createdChat ? createdChat.voice.segments : []}
            renderItem={(info) => <Text>{info.item}</Text>}
          />
          {/* {createdChat && <ChatItem {...createdChat} />} */}
        </View>

        <View
          style={{
            backgroundColor: "#ddee00",
            flexDirection: "row",
            justifyContent: "space-around",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Pressable style={[styles.button]} onPress={onPressCancel}>
            <Text>キャンセル</Text>
          </Pressable>
          <Pressable style={[styles.button]} onPress={onPressSend}>
            <Text>送信</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
  },
});
