export const includesIn = (string1: string, string2: string): boolean => {
    if (string1.toLowerCase().trim().includes(string2.toLowerCase().trim())) {
        return true;
    } else {
        return false;
    }
};
