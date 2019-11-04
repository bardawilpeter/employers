export const required = value => value.trim() !== '';

export const length = config => value => {
    let isValid = true;
    if (config.min) {
        isValid = isValid && value.trim().length >= config.min;
    }
    if (config.max) {
        isValid = isValid && value.trim().length <= config.max;
    }
    return isValid;
};

export const email = value =>
    // eslint-disable-next-line max-len
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
    );

export const file = config => value => {
    let isValid = true;
    if (value.length !== 0) {
        if (config.max) {
            isValid = isValid && value[0].size / 1024 / 1024 <= config.max;
        }

        if (
            value[0].type !== 'image/png' &&
            value[0].type !== 'image/jpeg' &&
            value[0].type !== 'image/jpg'
        ) {
            isValid = false;
        }
    } else {
        isValid = false;
    }
    return isValid;
};
