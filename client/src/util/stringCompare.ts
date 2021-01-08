export const includesIn = (string1: string, string2: string): boolean => {
    if (string1.toLowerCase().includes(string2.toLowerCase())) {
        return true;
    } else {
        return false;
    }
};
