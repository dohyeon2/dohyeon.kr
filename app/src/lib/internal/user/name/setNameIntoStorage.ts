import { USER_NAME_CONST } from "./name.const";

export const setNameIntoStorage = (name: string) => {
    localStorage.setItem(USER_NAME_CONST.RANDOM_NAME_STORAGE_KEY, name);
};
