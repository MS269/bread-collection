import { atom } from "recoil";

export const passwordState = atom({
  key: "passwordState",
  default: process.env.REACT_APP_ADMIN_PASSWORD,
});

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
