import { Footer } from "components/Footer";
import { ReactNode, VFC } from "react";
import { Text, View } from "react-native";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <View>
      {children}
      <Footer />
    </View>
  );
};
