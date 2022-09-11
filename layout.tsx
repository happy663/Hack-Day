import { ReactNode, VFC } from 'react';
import { Text, View } from 'react-native';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <View>
      {children}
      <Footer />
    </View>
  );
};
