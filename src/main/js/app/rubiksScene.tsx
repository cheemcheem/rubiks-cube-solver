import {Engine, Scene} from 'react-babylonjs'
import React from "react";
import {Color3} from "@babylonjs/core";
import '@babylonjs/core/Rendering/edgesRenderer';
import {Communication} from "./utilities/communication";
import {localColours} from "./utilities/colour";
import {Cube} from "./cube";
import {Background} from "./background";

export type SceneProps = {
    communication: Communication,
    cameraProps: { alpha: number, beta: number, radius: number }
};

export type SceneState = {
    colours: Color3[],
    buttonsEnabled: boolean
}

export default class RubiksScene extends React.Component<SceneProps, SceneState> {

    constructor(props: SceneProps) {
        super(props);
        this.state = {colours: localColours, buttonsEnabled: true};
    }

    componentDidMount() {
        this.props.communication.authenticateAndGetCube().then(colours => this.setState({colours}));
    }

    makeMove = (move: string) => {
        this.setState({buttonsEnabled: false});
        this.props.communication.makeMove(move)
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true}));
    };

    resetCube = () => {
        this.setState({buttonsEnabled: false});
        this.props.communication.newCube()
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true}));
    };

    render = () =>
        <Engine canvasId="renderCanvas" antialias={true} adaptToDeviceRatio={true}>
            <Scene>
                <Background cameraProps={this.props.cameraProps} resetCube={this.resetCube}/>
                <Cube colours={this.state?.colours} makeMove={this.makeMove}
                      buttonsEnabled={this.state?.buttonsEnabled}/>
            </Scene>
        </Engine>
}