import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme, globalStyles } from "src/utils/theme";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>LOGO</Text>
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
