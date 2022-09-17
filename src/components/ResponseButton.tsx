import React from "react";
import { theme, globalStyles } from "src/utils/theme";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";

export const ResponseButton = () => {
  return (
    <TouchableOpacity
      style={styles.responseButton}
      onPress={() => console.log("onPress")}
    >
      <Icon name="mic" size={theme.iconSize.sm} />
      <Text style={{ marginLeft: 8, ...globalStyles.headingMd }}>
        声を届ける
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  responseButton: {
    position: "absolute",
    backgroundColor: theme.colors.white,
    borderRadius: 100,
    width: 180,
    paddingVertical: 12,
    paddingHorizontal: 24,
    bottom: 40,
    left: Dimensions.get("window").width / 2 - 90,
    ...globalStyles.flexRowCenter,
    ...globalStyles.boxShadow,
  },
});
