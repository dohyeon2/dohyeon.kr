import { USER_NAME_CONST } from "./name.const";

export const getNameFromStorage = () => {
    if (typeof localStorage === "undefined") return null;
    const storedName = localStorage.getItem(
        USER_NAME_CONST.RANDOM_NAME_STORAGE_KEY
    );

    return storedName;
};
