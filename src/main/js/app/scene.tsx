import {Engine, Scene as BabylonScene} from 'react-babylonjs'
import React from "react";
import {Color3, Color4} from "@babylonjs/core";
import '@babylonjs/core/Rendering/edgesRenderer';
import Communication from "./utilities/communication";
import {localColours} from "./utilities/colour";
import "regenerator-runtime/runtime.js"; // async function support in babel
import Cube from './cube/cube';
import Background from "./background";
import Buttons from "./buttons/buttons";
import {CookieDialogue} from "./cookies";

export type SceneProps = {
    communication: Communication,
    acceptedCookies: boolean,
    setAcceptedCookies: () => void
};

export type SceneState = {
    colours: Color3[],
    buttonsEnabled: boolean,
    retrievedInitialCube: boolean
}

export default class Scene extends React.PureComponent<SceneProps, SceneState> {

    constructor(props: SceneProps) {
        super(props);
        this.state = {colours: localColours, buttonsEnabled: true, retrievedInitialCube: false};
    }

    render() {
        if (this.props.acceptedCookies && !this.state.retrievedInitialCube) {
            this.props.communication.authenticateAndGetCube().then(colours => this.setState({colours}));
            this.setState({retrievedInitialCube: true});
        }
        return <>
            <Engine canvasId="renderCanvas"
                    antialias
                    adaptToDeviceRatio>
                <BabylonScene clearColor={Color4.FromColor3(Color3.FromHexString("#0a100d"))}>
                    {this.props.acceptedCookies ? <>
                        <Buttons buttonsEnabled={this.state?.buttonsEnabled}
                                 resetCube={this.resetCube}
                                 shuffleCube={this.shuffleCube}
                                 solveCube={this.solveCube}
                                 makeMove={this.makeMove}
                        />
                    </> : <>
                        <CookieDialogue setAcceptedCookies={this.props.setAcceptedCookies}/>
                    </>}
                    <Background spin={!this.props.acceptedCookies}/>
                    <Cube colours={this.state?.colours}/>
                </BabylonScene>
            </Engine>
        </>
    }

    private makeMove = (move: string) => {
        this.setState({buttonsEnabled: false});
        this.props.communication.makeMove(move)
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true}));
    };

    private resetCube = () => {
        this.setState({buttonsEnabled: false});
        this.props.communication.newCube()
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true}));
    };

    private shuffleCube = () => {
        this.setState({buttonsEnabled: false});
        this.props.communication.shuffleCube()
            .then(this.makeMultipleMoves)
            .then(() => this.setState({buttonsEnabled: true}));
    };

    private solveCube = () => {
        this.setState({buttonsEnabled: false});
        this.props.communication.solveCube()
            .then(moves => this.makeMultipleMoves(moves, 250))
            .then(() => this.setState({buttonsEnabled: true}));
    };

    private makeMultipleMoves = async (moves: string[], delayBetweenMoves: number = 0) => {
        while (moves.length > 0) {
            const move = moves.pop();
            await new Promise(resolve => setTimeout(resolve, delayBetweenMoves));
            await this.props.communication.makeMove(move!)
                .then(this.props.communication.getCube)
                .then(colours => this.setState({colours}));
        }
    };
}