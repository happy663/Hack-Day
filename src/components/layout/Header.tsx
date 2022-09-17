import { ReactNode } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { theme, globalStyles } from "src/utils/theme";
import Logo from "assets/Logo.svg";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Logo width={120} height={40} />
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
});
