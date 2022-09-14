import { StyleSheet } from "react-native";
import { Home } from "src/containers";
import { BaseLayout } from "src/components/layout";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </RecoilRoot>
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
