import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { PageRootDefine, AppNavigationRef } from "src/routes/ApplicationRoutes";
import { Home, ChatsPage, NewQuestion } from "src/containers";
import { Header, NavigationBar } from "src/components/layout";
import { Text, View } from "react-native";
import { LoginPages } from "src/containers/LoginPage";
import { useIsLogin } from "src/hooks/useIsLogin";
import { firebaseUserState } from "src/globalStates/atoms/firebaseUserState";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserFirstSetUpPage } from "src/containers/UserFirstSetUpPage";

const Tabs = createBottomTabNavigator<PageRootDefine>();

export const NavigationPage = () => {
  const { isLogin, isNewUser } = useIsLogin();
  console.log("isLogin", isLogin);
  console.log("isNewUser", isNewUser);

  return (
    <NavigationContainer ref={AppNavigationRef}>
      <Header />
      {isLogin ? (
        isNewUser ? (
          //既存ユーザなら
          <Tabs.Navigator
            initialRouteName={"Home"}
            tabBar={(props) => <NavigationBar {...props} />}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="NewQuestion" component={NewQuestion} />
            <Tabs.Screen name="ChatsPage" component={ChatsPage} />
          </Tabs.Navigator>
        ) : (
          //新規ユーザなら
          <UserFirstSetUpPage />
        )
      ) : (
        <LoginPages />
      )}
    </NavigationContainer>
  );
};
