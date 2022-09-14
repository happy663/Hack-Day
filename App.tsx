import { StyleSheet } from "react-native";
import { Home } from "src/containers";
import { BaseLayout } from "src/components/layout";

export default function App() {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
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
