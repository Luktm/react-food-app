
export function isEmpty(value) {
    if (value.trim() === "") {
        return true;
    }

    return false;
}

export function isFiveChars(value) {
    if (value.length >= 5) {
        return true;
    }

    return false;
}