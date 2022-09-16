import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    main: "#F4A261",
    white: "#FFFFFF",
    black: "#000000",
    gray: ["#ededed", "#ACACAC"],
    red: "#FF5555",
    opacityWhite: "rgba(255, 255, 255, 0.5)",
    opacityBlack: "rgba(0, 0, 0, 0.5)",
  },
  iconSize: {
    sm: 24,
    md: 48,
    lg: 60,
  },
};

export const globalStyles = StyleSheet.create({
  iconSm: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  iconMd: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  iconLg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headingLg: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headingMd: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headingSm: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  boxShadowLg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 7,
  },
});
