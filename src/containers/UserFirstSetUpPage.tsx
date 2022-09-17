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
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { app, db } from "src/utils/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseUserState } from "src/globalStates/atoms/firebaseUserState";
import { isNewUserState } from "src/globalStates/atoms/isNewUserState";

export const UserFirstSetUpPage = () => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("男性");
  const [birthYear, setBirthYear] = React.useState(2000);
  const [introduction, setIntroduciton] =
    React.useState("よろしくお願いします");
  const years = [
    1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961,
    1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973,
    1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985,
    1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
  ];

  const firebaseUser = useRecoilValue(firebaseUserState);
  const setIsNewUser = useSetRecoilState(isNewUserState);

  //新規登録
  const registerUser = async () => {
    if (firebaseUser) {
      try {
        await setDoc(doc(db, "Users", firebaseUser.uid), {
          uid: firebaseUser?.uid,
          name: name,
          icon_URL: firebaseUser?.photoURL,
          birth_year: birthYear,
          gender: gender,
          introduction: introduction,
        });
        setIsNewUser(false);
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
      }}
    >
      <Text
        style={{
          marginLeft: 12,
        }}
      >
        ユーザー名
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder=""
      />
      <Text
        style={{
          marginLeft: 12,
        }}
      >
        性別
      </Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={{
          height: 150,
          width: 150,
        }}
      >
        <Picker.Item label="男性" value="男性" />
        <Picker.Item label="女性" value="女性" />
      </Picker>

      <Text
        style={{
          marginLeft: 12,
        }}
      >
        誕生年
      </Text>
      <Picker
        selectedValue={birthYear}
        onValueChange={(itemValue, itemIndex) => setBirthYear(itemValue)}
        style={{
          height: 150,
          width: 150,
        }}
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
      <Text
        style={{
          marginLeft: 12,
        }}
      >
        自己紹介
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setIntroduciton}
        value={introduction}
      />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
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
