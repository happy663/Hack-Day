import { StyleSheet } from "react-native";
import { Layout } from "components/Layout";
import { Home } from "components/Home";

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
