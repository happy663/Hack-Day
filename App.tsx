import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "src/components/Card";
import { Home } from "src/components/Home";
import { Layout } from "src/components/Layout";
import { PlayBar } from "src/components/PlayBar";

export default function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
