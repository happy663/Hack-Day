import { FunctionComponent, PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";

export const Prompt: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <View style={styles.promptLayout}>
      <Text style={styles.promptText}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  promptLayout: {
    marginVertical: 46,
  },
  promptText: {
    color: theme.colors.white,
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
});
