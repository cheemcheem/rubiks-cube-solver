import * as Cookie from "js-cookie";
import {AUTH_URL, GET_URL, MOVE_URL, MOVES, NEW_URL} from "./constants";
import {LogLevel, transparentLog} from "./logging";
import {stringToColour} from "./colour";

const getXSRFRequestInit = () => {
    return {headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}};
};

const fetchX = (input: RequestInfo, init?: RequestInit) => {
    const xsrfCookie: RequestInit = getXSRFRequestInit();
    return fetch(input, {...init, ...xsrfCookie});
};

export const logInRequest = () => fetchX(AUTH_URL).then(transparentLog);
export const fetchCubeRequest = () => fetchX(GET_URL).then(transparentLog);
export const XLEFTUPRequest = () => fetchX(MOVE_URL + MOVES.X.LEFT.UP, {method: "PUT"}).then(transparentLog);
export const convertResponse = (response: Response) => response.text().then(responseText => Array.from<string>(JSON.parse(responseText).colours).map(stringToColour));
export const createCubeIfNeededRequest = (response: Response) => {
    return new Promise<Response>((resolve, reject) => {
        if (response.status !== 404) {
            return resolve(response);
        }
        fetchX(NEW_URL, {method: "POST"})
            .then(transparentLog)
            .then(fetchCubeRequest)
            .then(response => {
                if (response.status !== 404) {
                    return resolve(response);
                }
                transparentLog(response, LogLevel.DEBUG);
                return reject("Failed to create a new cube.");
            })
    }).then(transparentLog);
};