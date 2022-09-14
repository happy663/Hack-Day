import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "./NavigationBar";
import { theme, globalStyles } from "src/utils/theme";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>LOGO</Text>
      </View>
      <View style={styles.main}>{children}</View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    ...globalStyles.flexCenter,
  },
  title: {
    color: theme.colors.main,
    ...globalStyles.headingSm,
  },
  main: {
    flex: 1,
    backgroundColor: theme.colors.gray[0],
  },
});
