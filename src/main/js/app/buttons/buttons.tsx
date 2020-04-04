import {default as StaticButtons, StaticButtonsProps} from "./staticButtons";
import {CubeButtonsProps, default as CubeButtons} from "./singleOrientationCubeButtons";
import React from "react";

export type ButtonsProps = StaticButtonsProps & CubeButtonsProps;

export default class Buttons extends React.PureComponent<ButtonsProps> {
    render() {
        return <>
            <StaticButtons currentButton={this.props.currentButton}
                           buttonsEnabled={this.props.buttonsEnabled}
                           resetCube={this.props.resetCube}
                           shuffleCube={this.props.shuffleCube}
                           solveCube={this.props.solveCube}
            />
            <CubeButtons currentMove={this.props.currentMove}
                         cubeButtonRotation={this.props.cubeButtonRotation}
                         makeMove={this.props.makeMove}
                         buttonsEnabled={this.props.buttonsEnabled}
            />
        </>
    }
}