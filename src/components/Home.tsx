import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "src/components/Card";
import { PlayBar } from "src/components/PlayBar";

export const Home = () => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <View
          style={{
            padding: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#6186EB",
            }}
          >
            LOGO
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            height: 30,
            width: "70%",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 70,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Card
          profile={{
            name: "れふてぃさん",
            image: "assets/lefty.png",
          }}
          description="誰か助けてください。友達と喧嘩して連絡が取れなくなりました"
          tags={["#友達", "#喧嘩"]}
          backgroundColor="#5FABBC"
        />
        <Card
          profile={{
            name: "れふてぃさん",
            image: "assets/lefty.png",
          }}
          description="席替えで私の後ろの席に友達が座っていて、その子の隣に私の好きな人が座っています。
          私が彼を好きな事を知っていて応援するよと言ってくれるのですが、休み時間や授業中にすごい楽しそうに彼と話していて発言と行動が矛盾し過ぎていると思いませんか？彼女の意図はなんでしょう…"
          tags={["#友達", "#喧嘩"]}
          backgroundColor="white"
        />
        <Card
          profile={{
            name: "れふてぃさん",
            image: "assets/lefty.png",
          }}
          description="誰か助けてください。友達と喧嘩して連絡が取れなくなりました"
          tags={["#友達", "#喧嘩"]}
          backgroundColor="#FFCECD"
        />
      </View>
      <View
        style={{
          backgroundColor: "#80B1E7",
          height: "21%",
          marginTop: 20,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              borderRadius: 70,
              width: "70%",
              alignItems: "center",
              padding: 5,
              // @ts-ignore
              gap: 10,
            }}
            onPress={() => {
              console.log("pressed");
            }}
          >
            <Image
              source={require("assets/lefty.png")}
              style={{
                height: 40,
                width: 40,
              }}
            />
            <Text>〇〇さんを助ける!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("assets/play.png")}
            style={{
              height: 40,
              width: 40,
              marginLeft: 20,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
            }}
          >
            席替えで私の後ろの席に友達が座っていて、その子の隣に私の好きな人が座っています。
          </Text>
        </View>
        <PlayBar />
      </View>
    </View>
  );
};
