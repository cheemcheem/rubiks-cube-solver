import React from "react";
import {Vector3} from "@babylonjs/core";
import {CubeButton} from "./cubeButton";
import {MOVES} from "../utilities/constants";

const {X, Y, Z} = MOVES;

export type CubeButtonsProps = {
    makeMove: (move: string) => void,
    buttonsEnabled: boolean,
    cubeButtonRotation: number
}
export default class SingleOrientationCubeButtons extends React.PureComponent<CubeButtonsProps> {
    render() {
        const buttonFaceDistance = 2;
        const buttonOtherDistance = 1.5;
        const yFlip = Vector3.Backward().scale(-Math.PI / 2);
        const zFlip = yFlip.add(Vector3.Right().scale(Math.PI / 2));
        return <>
            <box rotation={new Vector3(0, this.props.cubeButtonRotation, 0)} name={"buttonBox"}>
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(-1, buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25b2'}
                            move={this.rotation(X.LEFT.UP, Z.FAR.CLOCKWISE, X.RIGHT.DOWN, Z.NEAR.ANTICLOCKWISE)}
                            rotation={Vector3.Zero()}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(0, buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25b2'}
                            move={this.rotation(X.MIDDLE.UP, Z.MIDDLE.CLOCKWISE, X.MIDDLE.DOWN, Z.MIDDLE.ANTICLOCKWISE)}
                            rotation={Vector3.Zero()}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(1, buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25b2'}
                            move={this.rotation(X.RIGHT.UP, Z.NEAR.CLOCKWISE, X.LEFT.DOWN, Z.FAR.ANTICLOCKWISE)}
                            rotation={Vector3.Zero()}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(-1, -buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25bc'}
                            move={this.rotation(X.LEFT.DOWN, Z.FAR.ANTICLOCKWISE, X.RIGHT.UP, Z.NEAR.CLOCKWISE)}
                            rotation={Vector3.Zero()}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(0, -buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25bc'}
                            move={this.rotation(X.MIDDLE.DOWN, Z.MIDDLE.ANTICLOCKWISE, X.MIDDLE.UP, Z.MIDDLE.CLOCKWISE)}
                            rotation={Vector3.Zero()}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(1, -buttonFaceDistance, -buttonOtherDistance)}
                            symbol={'\u25bc'}
                            move={this.rotation(X.RIGHT.DOWN, Z.NEAR.ANTICLOCKWISE, X.LEFT.UP, Z.FAR.CLOCKWISE)}
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
                            move={this.rotation(Z.NEAR.ANTICLOCKWISE, X.LEFT.UP, Z.FAR.CLOCKWISE, X.RIGHT.DOWN)}
                            rotation={zFlip}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(-buttonFaceDistance, buttonOtherDistance, 0)}
                            symbol={'\u25b2'}
                            move={this.rotation(Z.MIDDLE.ANTICLOCKWISE, X.MIDDLE.UP, Z.MIDDLE.CLOCKWISE, X.MIDDLE.DOWN)}
                            rotation={zFlip}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(-buttonFaceDistance, buttonOtherDistance, 1)}
                            symbol={'\u25b2'}
                            move={this.rotation(Z.FAR.ANTICLOCKWISE, X.RIGHT.UP, Z.NEAR.CLOCKWISE, X.LEFT.DOWN)}
                            rotation={zFlip}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(buttonFaceDistance, buttonOtherDistance, -1)}
                            symbol={'\u25bc'}
                            move={this.rotation(Z.NEAR.CLOCKWISE, X.LEFT.DOWN, Z.FAR.ANTICLOCKWISE, X.RIGHT.UP)}
                            rotation={zFlip}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(buttonFaceDistance, buttonOtherDistance, 0)}
                            symbol={'\u25bc'}
                            move={this.rotation(Z.MIDDLE.CLOCKWISE, X.MIDDLE.DOWN, Z.MIDDLE.ANTICLOCKWISE, X.MIDDLE.UP)}
                            rotation={zFlip}
                />
                <CubeButton buttonsEnabled={this.props.buttonsEnabled}
                            makeMove={this.props.makeMove}
                            position={new Vector3(buttonFaceDistance, buttonOtherDistance, 1)}
                            symbol={'\u25bc'}
                            move={this.rotation(Z.FAR.CLOCKWISE, X.RIGHT.DOWN, Z.NEAR.ANTICLOCKWISE, X.LEFT.UP)}
                            rotation={zFlip}
                />
            </box>

        </>
    }

    private rotation = (base: string, left90: string, left180: string, left270: string) => {
        switch (this.props.cubeButtonRotation) {
            case 0:
                return base;
            case Math.PI / 2 :
                return left90;
            case Math.PI:
                return left180;
            case 3 * Math.PI / 2:
            case  -Math.PI / 2:
                return left270;
            default:
                throw new Error(`Invalid rotation given '${this.props.cubeButtonRotation}'.`);
        }
    }

}