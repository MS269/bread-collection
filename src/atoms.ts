import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const messageCountState = atom({
  key: "messageCountState",
  default: 0,
});

export const readMessageCountState = atom({
  key: "readMessageCountState",
  default: 0,
});
