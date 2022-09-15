import { createNavigationContainerRef } from "@react-navigation/native";

export type PageRootDefine = {
  Home: undefined;
  NewQuestion: undefined;
  Chats: undefined;
};

export const AppNavigationRef = createNavigationContainerRef<PageRootDefine>();

export function navigate(
  name: keyof PageRootDefine,
  params?: PageRootDefine[keyof PageRootDefine]
) {
  AppNavigationRef.current?.navigate(name, params);
}
