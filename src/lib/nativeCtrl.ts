import { Keyboard } from "@capacitor/keyboard";

import { StatusBar } from "@capacitor/status-bar";
import { isPlatform } from "@ionic/core";

export const showKeyboard = async () => {
  isPlatform("capacitor") && (await Keyboard.show());
};
export const dismissKeyboard = async () => {
  isPlatform("capacitor") && (await Keyboard.hide());
};
export const setStatusBarHide = async () => {
  isPlatform("capacitor") && (await StatusBar.hide());
};
export const setStatusBarShow = async () => {
  isPlatform("capacitor") && (await StatusBar.show());
};
