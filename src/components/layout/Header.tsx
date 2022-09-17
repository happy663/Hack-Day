import { StyleSheet, View } from "react-native";
import { theme, globalStyles } from "src/utils/theme";
import Logo from "assets/Logo.svg";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Logo width={200} height={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    ...globalStyles.flexCenter,
  },
  title: {
    color: theme.colors.main,
    ...globalStyles.headingSm,
  },
});
