import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from 'src/utils/theme';

export const LoginPages = () => {
  return (
    <View style={styles.loginBuottnLayout}>
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Image
          source={require('assets/google.png')}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: theme.colors.main,
    flexGrow: 0.7,
    height: 48,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    alignItems: 'center',
  },
});
