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

//userが登録済みかどうか判断するhook
