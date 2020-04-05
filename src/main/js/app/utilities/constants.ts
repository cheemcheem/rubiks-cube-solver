import {ButtonTypeProps} from "./types";
import {Mesh, Vector3} from "@babylonjs/core";
import {Space} from "babylonjs";

export const rotate = (rotationAxis: Vector3, parent: Mesh) => {
    if (rotationAxis.x) {
        parent.rotate(Vector3.Right(), rotationAxis.x * Math.PI / 2, Space.LOCAL);
    }
    if (rotationAxis.y) {
        parent.rotate(Vector3.Up(), rotationAxis.y * Math.PI / 2, Space.LOCAL);
    }
    if (rotationAxis.z) {
        parent.rotate(Vector3.Forward(), rotationAxis.z * Math.PI / 2, Space.LOCAL);
    }
};
export const button = ({currentButton}: ButtonTypeProps) => currentButton;

export const COOKIES = {
    CONSENT_COOKIE: "cookie-consent"
};

export const URLS = {
    AUTH_URL: "/api/authentication",
    NEW_URL: "/api/state/new",
    GET_URL: "/api/state/get",
    EXISTS_URL: "/api/state/exists",
    MOVE_URL: "/api/move/",
    SHUFFLE_URL: "/api/shuffle",
    SOLVE_URL: "/api/solve",
};

export const BUTTON_COLOURS = {
    CURRENT_MOVE_COLOUR: "red",
    READY_COLOUR: "green",
    UNAVAILABLE_COLOUR: "grey",
    HIGHLIGHTED_COLOUR: "lightgreen",
};

export const ROTATIONS = {
    NO_ROTATION: new Vector3(0, 0, 0),
    X_ROTATION: new Vector3(1, 0, 0),
    Y_ROTATION: new Vector3(0, 1, 0),
    Z_ROTATION: new Vector3(0, 0, 1),
};

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

