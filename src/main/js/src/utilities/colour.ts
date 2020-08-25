import {Color3} from "babylonjs";

export const RED = Color3.Red().scale(0.7);
export const GREEN = Color3.Green().scale(0.5);
export const BLUE = Color3.Blue().scale(0.5);
export const WHITE = Color3.White().scale(0.9);
export const ORANGE = Color3.Lerp(Color3.Red(), Color3.Yellow(), 0.5).scale(0.9);
export const YELLOW = Color3.Yellow().scale(0.9);

const COLOUR_MAP = new Map([["RED", RED], ["GREEN", GREEN], ["BLUE", BLUE], ["WHITE", WHITE], ["ORANGE", ORANGE], ["YELLOW", YELLOW]]);
export const stringToColour = (value: string) => {
    const lookup = COLOUR_MAP.get(value);
    if (lookup === undefined) {
        throw new Error(`Could not find string '${value}' in the colour mappings '${COLOUR_MAP}'.`);
    }
    return lookup;
};

export const LOCAL_COLOURS = [
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    WHITE,
    RED,
    RED,
    RED,
    RED,
    RED,
    RED,
    RED,
    RED,
    RED,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    BLUE,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN,
    GREEN
];