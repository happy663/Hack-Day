import { Image, Text, TouchableOpacity, View } from "react-native";

export const Footer = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 70,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/home.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
        <Text
          style={{
            fontSize: 11,
          }}
        >
          ホーム
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/comment.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
        <Text
          style={{
            fontSize: 11,
          }}
        >
          回答した質問
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/play.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
        <Text
          style={{
            fontSize: 11,
          }}
        >
          質問する
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/notify.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
        <Text
          style={{
            fontSize: 11,
          }}
        >
          通知
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/lefty.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
        <Text
          style={{
            fontSize: 11,
          }}
        >
          プロフィール
        </Text>
      </TouchableOpacity>
    </View>
  );
};
