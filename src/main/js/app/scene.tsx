import {Engine, Scene as BabylonScene} from 'react-babylonjs'
import React from "react";
import {Color3, Color4} from "@babylonjs/core";
import '@babylonjs/core/Rendering/edgesRenderer';
import Communication from "./utilities/communication";
import {localColours} from "./utilities/colour";
import Background from "./background";
import "regenerator-runtime/runtime.js"; // async function support in babel
import Cube from './cube/cube';
import Buttons from "./buttons/buttons";

export type SceneProps = {
    communication: Communication
};

export type SceneState = {
    colours: Color3[],
    buttonsEnabled: boolean
}

export default class Scene extends React.PureComponent<SceneProps, SceneState> {

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

    shuffleCube = () => {
        this.setState({buttonsEnabled: false});
        this.props.communication.shuffleCube()
            .then(async (moves: string[]) => {
                while (moves.length > 0) {
                    const move = moves.pop();
                    await this.props.communication.makeMove(move!)
                        .then(this.props.communication.getCube)
                        .then(colours => this.setState({colours}));
                }
            })
            .then(() => this.setState({buttonsEnabled: true}));
    };

    render() {
        return <>
            <Engine canvasId="renderCanvas"
                    antialias
                    adaptToDeviceRatio>
                <BabylonScene clearColor={Color4.FromColor3(Color3.FromHexString("#0a100d"))}>
                    <Buttons buttonsEnabled={this.state?.buttonsEnabled}
                             resetCube={this.resetCube}
                             shuffleCube={this.shuffleCube}
                             makeMove={this.makeMove}
                    />
                    <Background/>
                    <Cube colours={this.state?.colours}
                          makeMove={this.makeMove}
                    />
                </BabylonScene>
            </Engine>
        </>
    }
}