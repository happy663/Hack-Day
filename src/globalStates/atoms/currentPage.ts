import { atom } from "recoil";

export const currentPageState = atom<String>({
  key: "currentPageState",
  default: "Home",
});
