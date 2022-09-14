import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    main: "#F4A261",
    white: "#FFFFFF",
    gray: ["#ededed", "#ACACAC"],
    red: "#FF5555",
    opacityWhite: "rgba(255, 255, 255, 0.5)",
    opacityBlack: "rgba(0, 0, 0, 0.5)",
  },
};

export const globalStyles = StyleSheet.create({
  iconSm: {
    height: 24,
    width: 24,
  },
  iconMd: {
    height: 40,
    width: 40,
  },
  iconLg: {
    height: 60,
    width: 60,
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
});
