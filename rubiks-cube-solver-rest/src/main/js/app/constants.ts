export const AUTH_URL = "http://localhost:8080/api/authentication";
export const NEW_URL = "http://localhost:8080/api/state/new";
export const GET_URL = "http://localhost:8080/api/state/get";
export const MOVE_URL = "http://localhost:8080/api/move/";
export const MOVES = {
    X: {
        LEFT: {
            UP: "X_LEFT_UP",
            DOWN: "X_LEFT_DOWN"
        },
        MIDDLE: {
            UP: "X_MIDDLE_UP",
            DOWN: "X_MIDDLE_UP"
        },
        RIGHT: {
            UP: "X_RIGHT_UP",
            DOWN: "X_RIGHT_UP"
        }
    },
    Y: {},
    Z: {}
};