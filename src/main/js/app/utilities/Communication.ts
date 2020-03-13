import * as Cookie from "js-cookie";
import {AUTH_URL, GET_URL, MOVE_URL, NEW_URL} from "./constants";
import {LogLevel, transparentLog} from "./logging";
import {localColours, stringToColour} from "./colour";

const getXSRFRequestInit = () => {
    return {headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}};
};
const fetchX = (input: RequestInfo, init?: RequestInit) => {
    const xsrfCookie: RequestInit = getXSRFRequestInit();
    return fetch(input, {...init, ...xsrfCookie});
};

export class Communication {
    authenticateAndGetCube = () => {
        return this.authenticate()
            .then(this.fetchCube)
            .then(this.createCubeIfNeeded)
            .then(this.convertResponse)
            .catch(err => {
                transparentLog(err, LogLevel.ERROR);
                transparentLog("Can't connect to back end, running with no saved state.", LogLevel.WARN);
                return localColours;
            })
            ;
    };

    makeMove = (move: string) => fetchX(MOVE_URL + move, {method: "PUT"}).then(transparentLog);

    private moveRequest = (move: String) => () => fetchX(MOVE_URL + move, {method: "PUT"}).then(transparentLog);

    private authenticate = () => fetchX(AUTH_URL).then(transparentLog);

    private fetchCube = () => fetchX(GET_URL).then(transparentLog);

    private convertResponse = (response: Response) => response.text().then(responseText => Array.from<string>(JSON.parse(responseText).colours).map(stringToColour));

    private createCubeIfNeeded = (response: Response) => {
        return new Promise<Response>((resolve, reject) => {
            if (response.status !== 404) {
                return resolve(response);
            }
            fetchX(NEW_URL, {method: "POST"})
                .then(transparentLog)
                .then(() => fetchX("/api/shuffle", {method: "PUT"}))
                .then(transparentLog)
                .then(this.fetchCube)
                .then(response => {
                    if (response.status !== 404) {
                        return resolve(response);
                    }
                    transparentLog(response, LogLevel.DEBUG);
                    return reject("Failed to create a new cube.");
                })
        }).then(transparentLog);
    };

}

