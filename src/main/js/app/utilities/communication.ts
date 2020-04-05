import * as Cookie from "js-cookie";
import {URLS} from "./constants";
import {LogLevel, transparentLog} from "./logging";
import {LOCAL_COLOURS, stringToColour} from "./colour";

const {AUTH_URL, EXISTS_URL, GET_URL, MOVE_URL, NEW_URL, SHUFFLE_URL, SOLVE_URL} = URLS;

const getXSRFRequestInit = () => {
    return {headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}};
};
const fetchX = (input: RequestInfo, init?: RequestInit) => {
    const xsrfCookie: RequestInit = getXSRFRequestInit();
    return fetch(input, {...init, ...xsrfCookie});
};

export default class Communication {
    authenticateAndGetCube = () => {
        return this.authenticate()
            .then(this.createCubeIfNeeded)
            .then(this.convertResponseWithColours)
            .catch(err => {
                transparentLog(err, LogLevel.ERROR);
                transparentLog("Can't connect to back end, running with no saved state.", LogLevel.WARN);
                return LOCAL_COLOURS;
            })
            ;
    };

    makeMove = (move: string) => fetchX(MOVE_URL + move, {method: "PUT"}).then(transparentLog);

    getCube = () => this.fetchCube().then(this.convertResponseWithColours).then(transparentLog);

    newCube = () => fetchX(NEW_URL, {method: "POST"}).then(transparentLog);

    shuffleCube = () => fetchX(SHUFFLE_URL).then(this.convertResponseWithMultipleMoves).then(transparentLog);

    solveCube = () => fetchX(SOLVE_URL).then(this.convertResponseWithMultipleMoves).then(transparentLog);

    checkCubeExists = () => fetchX(EXISTS_URL).then(response => response.text()).then(responseText => responseText === "true");

    private convertResponseWithMultipleMoves = (response: Response) => response.text().then(responseText => Array.from<string>(JSON.parse(responseText)));

    private authenticate = () => fetchX(AUTH_URL).then(transparentLog);

    private fetchCube = () => fetchX(GET_URL).then(transparentLog);

    private convertResponseWithColours = (response: Response) => response.text().then(responseText => Array.from<string>(JSON.parse(responseText).colours).map(stringToColour));

    private createCubeIfNeeded = () => this.checkCubeExists().then(exists => exists ? this.fetchCube() : this.newCube().then(this.fetchCube)).then(transparentLog);

}

