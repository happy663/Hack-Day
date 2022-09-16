import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { PageRootDefine, AppNavigationRef } from 'src/routes/ApplicationRoutes';
import { Home, ChatsPage, NewQuestion } from 'src/containers';
import { Header, NavigationBar } from 'src/components/layout';
import { View } from 'react-native';
import { LoginPages } from 'src/containers/LoginPage';

const Tabs = createBottomTabNavigator<PageRootDefine>();

export default function App() {
  const isAuth = false;

  return (
    <RecoilRoot>
      <NavigationContainer ref={AppNavigationRef}>
        <Header />
        {isAuth ? (
          <Tabs.Navigator
            initialRouteName={'Home'}
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
          <LoginPages />
        )}
      </NavigationContainer>
    </RecoilRoot>
  );
}
