import { StyleSheet } from "react-native";
import { Home } from "src/containers";
import { BaseLayout } from "src/components/layout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NewQuestion } from "src/containers/NewQuestion";
import { PageRootDefine } from "src/routes/ApplicationRoutes";
import React from "react";
import { AppNavigationRef } from "src/routes/ApplicationRoutes";
import { Chats } from "src/containers/Chats";

const Tabs = createBottomTabNavigator<PageRootDefine>();

export default function App() {
  return (
    <NavigationContainer ref={AppNavigationRef}>
      <BaseLayout>
        <Tabs.Navigator
          initialRouteName={"Home"}
          tabBar={() => <></>}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="NewQuestion" component={NewQuestion} />
          <Tabs.Screen name="Chats" component={Chats} />
        </Tabs.Navigator>
      </BaseLayout>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
