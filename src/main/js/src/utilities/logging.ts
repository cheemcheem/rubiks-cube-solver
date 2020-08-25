export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}

let displayLogLevel: LogLevel = LogLevel[process.env.LOG_LEVEL as keyof typeof LogLevel];
if (displayLogLevel === undefined) {
    displayLogLevel = LogLevel.ERROR;
    console.warn(`Setting default log level to ${LogLevel[displayLogLevel]}.`);
}

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

transparentLog(`Log level ${LogLevel[displayLogLevel]}.`);
