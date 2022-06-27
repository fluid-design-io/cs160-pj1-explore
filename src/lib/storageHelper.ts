import { Storage } from "@capacitor/storage";

export const checkStorage = async (key:string) => {
  const { value } = await Storage.get({
    key,
  });
  return !!value;
};

export const setStorage = async (key:string, value:any) => {
  await Storage.set({ key, value: JSON.stringify(value) });
};

export const getStorage = async (key:string) => {
  await Storage.get({ key });
};
