import { StyleSheet } from "react-native";
import { Home } from "src/components/Home";
import { Layout } from "src/components/layout/Layout";

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
