export const CONSENT_COOKIE = "cookie-consent";
export const AUTH_URL = "/api/authentication";
export const NEW_URL = "/api/state/new";
export const GET_URL = "/api/state/get";
export const EXISTS_URL = "/api/state/exists";
export const MOVE_URL = "/api/move/";
export const SHUFFLE_URL = "/api/shuffle";
export const SOLVE_URL = "/api/solve";
export const MOVES = {
    X: {
        LEFT: {
            UP: "X_LEFT_UP",
            DOWN: "X_LEFT_DOWN"
        },
        MIDDLE: {
            UP: "X_MIDDLE_UP",
            DOWN: "X_MIDDLE_DOWN"
        },
        RIGHT: {
            UP: "X_RIGHT_UP",
            DOWN: "X_RIGHT_DOWN"
        }
    },
    Y: {
        BOTTOM: {
            LEFT: "Y_BOTTOM_LEFT",
            RIGHT: "Y_BOTTOM_RIGHT"
        },
        MIDDLE: {
            LEFT: "Y_MIDDLE_LEFT",
            RIGHT: "Y_MIDDLE_RIGHT"
        },
        TOP: {
            LEFT: "Y_TOP_LEFT",
            RIGHT: "Y_TOP_RIGHT"
        },
    },
    Z: {
        NEAR: {
            CLOCKWISE: "Z_NEAR_CLOCKWISE",
            ANTICLOCKWISE: "Z_NEAR_ANTICLOCKWISE",
        },
        MIDDLE: {
            CLOCKWISE: "Z_MIDDLE_CLOCKWISE",
            ANTICLOCKWISE: "Z_MIDDLE_ANTICLOCKWISE",
        },
        FAR: {
            CLOCKWISE: "Z_FAR_CLOCKWISE",
            ANTICLOCKWISE: "Z_FAR_ANTICLOCKWISE",
        }
    }
};

export enum ROTATION {
    LEFT_,
    LEFT_90,
    LEFT_180,
    LEFT_270
}