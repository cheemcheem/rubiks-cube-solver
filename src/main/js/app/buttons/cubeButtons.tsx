import React from "react";
import {Vector3} from "@babylonjs/core";
import {CubeButton} from "./cubeButton";
import {MOVES} from "../utilities/constants";

const {X, Y, Z} = MOVES;

export type CubeButtonsProps = {
    makeMove: (move: string) => void,
    buttonsEnabled: boolean
}
export default class CubeButtons extends React.PureComponent<CubeButtonsProps> {
    render() {
        const buttonFaceDistance = 2;
        const buttonOtherDistance = 1.5;
        const yFlip = Vector3.Backward().scale(-Math.PI / 2);
        const zFlip = yFlip.add(Vector3.Right().scale(Math.PI / 2));
        return <>
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-1, buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={X.LEFT.UP}
                        rotation={Vector3.Zero()}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(0, buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={X.MIDDLE.UP}
                        rotation={Vector3.Zero()}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(1, buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={X.RIGHT.UP}
                        rotation={Vector3.Zero()}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-1, -buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25bc'}
                        move={X.LEFT.DOWN}
                        rotation={Vector3.Zero()}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(0, -buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25bc'}
                        move={X.MIDDLE.DOWN}
                        rotation={Vector3.Zero()}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(1, -buttonFaceDistance, -buttonOtherDistance)}
                        symbol={'\u25bc'}
                        move={X.RIGHT.DOWN}
                        rotation={Vector3.Zero()}
            />

            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, -1, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={Y.BOTTOM.LEFT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, 0, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={Y.MIDDLE.LEFT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, 1, -buttonOtherDistance)}
                        symbol={'\u25b2'}
                        move={Y.TOP.LEFT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, -1, -buttonOtherDistance)}
                        symbol={'\u25bc'}
                        move={Y.BOTTOM.RIGHT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, 0, -buttonOtherDistance)}
                        symbol={'\u25bc'}
                        move={Y.MIDDLE.RIGHT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, 1, -buttonOtherDistance)} symbol={'\u25bc'}
                        move={Y.TOP.RIGHT}
                        rotation={yFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, buttonOtherDistance, -1)}
                        symbol={'\u25b2'}
                        move={Z.NEAR.ANTICLOCKWISE}
                        rotation={zFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, buttonOtherDistance, 0)}
                        symbol={'\u25b2'}
                        move={Z.MIDDLE.ANTICLOCKWISE}
                        rotation={zFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(-buttonFaceDistance, buttonOtherDistance, 1)}
                        symbol={'\u25b2'}
                        move={Z.FAR.ANTICLOCKWISE}
                        rotation={zFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, buttonOtherDistance, -1)}
                        symbol={'\u25bc'}
                        move={Z.NEAR.CLOCKWISE}
                        rotation={zFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, buttonOtherDistance, 0)}
                        symbol={'\u25bc'}
                        move={Z.MIDDLE.CLOCKWISE}
                        rotation={zFlip}
            />
            <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                        makeMove={this.props.makeMove}
                        position={new Vector3(buttonFaceDistance, buttonOtherDistance, 1)}
                        symbol={'\u25bc'}
                        move={Z.FAR.CLOCKWISE}
                        rotation={zFlip}
            />
        </>
    }
}