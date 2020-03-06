export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}

const displayLogLevel = LogLevel.DEBUG;

export const transparentLog = <U extends any>(x: U, logLevel: LogLevel = LogLevel.DEBUG) => {
    if (logLevel > displayLogLevel) {
        return x;
    }

    switch (logLevel) {
        case LogLevel.DEBUG: {
            console.debug(x);
            break;
        }
        case LogLevel.ERROR: {
            console.error(x);
            break;
        }
        case LogLevel.WARN: {
            console.warn(x);
            break;
        }
        case LogLevel.INFO: {
            console.log(x);
            break;
        }
    }
    return x
};