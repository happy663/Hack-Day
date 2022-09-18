import { atom } from "recoil";

export const isNewUserState = atom<boolean>({
  key: "isNewUser",
  default: false,
});
