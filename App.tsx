import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { PageRootDefine, AppNavigationRef } from "src/routes/ApplicationRoutes";
import { Home, ChatsPage, NewQuestion } from "src/containers";
import { Header, NavigationBar } from "src/components/layout";
import { View } from "react-native";
import { LoginPages } from "src/containers/LoginPage";

import { firebaseUserState } from "src/globalStates/atoms/firebaseUserState";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationPage } from "src/containers/NavigationPage";

const Tabs = createBottomTabNavigator<PageRootDefine>();

export default function App() {
  //RecoilRootがあるコンポーネントでuseRecoilStataeを使うとバグるのでやむを得ずNavigationPageとして切り分ける
  return (
    <RecoilRoot>
      <NavigationPage />
    </RecoilRoot>
  );
}
