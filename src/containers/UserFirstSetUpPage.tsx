import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Button,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRecoilValue } from "recoil";
import { theme } from "src/utils/theme";
import { useSetRecoilState } from "recoil";
import { db } from "src/utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { firebaseUserState } from "src/globalStates/atoms/firebaseUserState";
import { isNewUserState } from "src/globalStates/atoms/isNewUserState";
import { userState } from "src/globalStates/atoms/userState";

export const UserFirstSetUpPage = () => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("男性");
  const [birthYear, setBirthYear] = React.useState(2000);
  const [introduction, setIntroduciton] =
    React.useState("よろしくお願いします");
  const years = [...Array(72)].map((_, index) => index + 1950);

  const firebaseUser = useRecoilValue(firebaseUserState);
  const setIsNewUser = useSetRecoilState(isNewUserState);
  const setUser = useSetRecoilState(userState);

  //新規登録
  const registerUser = async () => {
    if (firebaseUser) {
      try {
        await setDoc(doc(db, "Users", firebaseUser.uid), {
          uid: firebaseUser?.uid,
          name: name,
          icon_url: firebaseUser?.photoURL,
          birth_year: birthYear,
          gender: gender,
          introduction: introduction,
        });
        setIsNewUser(false);
        setUser({
          uid: firebaseUser?.uid,
          name: name,
          icon_url:
            firebaseUser?.photoURL == null ? "" : firebaseUser?.photoURL,
          birth_year: birthYear,
          gender: gender,
          introduction: introduction,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 24,
      }}
    >
      <View style={styles.inputLayout}>
        <Text>ユーザー名</Text>
        <TextInput
          style={styles.introduceInput}
          onChangeText={setName}
          value={name}
          placeholder=""
        />
      </View>

      <View>
        <Text>自己紹介</Text>
        <TextInput
          style={styles.introduceInput}
          onChangeText={setIntroduciton}
          value={introduction}
        />
      </View>

      <View style={styles.inputLayout}>
        <Text>性別</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="男性" value="男性" />
            <Picker.Item label="女性" value="女性" />
            <Picker.Item label="どちらでもない" value="どちらでもない" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputLayout}>
        <Text>誕生年</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={birthYear}
            onValueChange={(itemValue, itemIndex) => setBirthYear(itemValue)}
            itemStyle={styles.pickerItem}
          >
            {years.map((year, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={year.toString()}
                  value={year.toString()}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            registerUser();
          }}
        >
          <Text
            style={{
              fontSize: 24,
            }}
          >
            登録
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introduceInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
  },
  inputLayout: {
    paddingVertical: 20,
  },
  pickerBox: {
    flexShrink: 1,
    borderWidth: 1,
    margin: 12,
  },
  pickerItem: {
    height: 12,
  },
  submitButton: {
    flexGrow: 0.4,
    height: 48,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: theme.colors.main,
    marginTop: 24,
  },
});
