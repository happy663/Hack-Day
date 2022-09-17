import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "src/utils/theme";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export const LoginPages = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "686458940555-tpvlodoaogbqf87gbkpb6c07m6jogojq.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.loginBuottnLayout}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          source={require("assets/google.png")}
          style={{
            marginHorizontal: 10,
            height: 36,
            width: 36,
          }}
        />
        <Text
          style={{
            fontSize: 24,
          }}
        >
          ログイン
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBuottnLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: theme.colors.main,
    flexGrow: 0.7,
    height: 48,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 16,
    alignItems: "center",
  },
});
