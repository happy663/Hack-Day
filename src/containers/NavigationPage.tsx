import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { PageRootDefine, AppNavigationRef } from "src/routes/ApplicationRoutes";
import { Home, ChatsPage, NewQuestion } from "src/containers";
import { Header, NavigationBar } from "src/components/layout";
import { LoginPages } from "src/containers/LoginPage";
import { useIsLogin } from "src/hooks/useIsLogin";
import { UserFirstSetUpPage } from "src/containers/UserFirstSetUpPage";
import { isNewUserState } from "src/globalStates/atoms/isNewUserState";

const Tabs = createBottomTabNavigator<PageRootDefine>();

export const NavigationPage = () => {
  const isLogin = useIsLogin();
  const isNewUser = useRecoilValue(isNewUserState);

  return (
    <NavigationContainer ref={AppNavigationRef}>
      <Header />
      {isLogin == undefined ? (
        <></>
      ) : isLogin ? (
        isNewUser ? (
          //Googleログインをした新規ユーザ
          <UserFirstSetUpPage />
        ) : (
          //Googleログインをした上で既存ユーザなら
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
        )
      ) : (
        <LoginPages />
      )}
    </NavigationContainer>
  );
};
