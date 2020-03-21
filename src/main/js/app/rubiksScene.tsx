import {Engine, Scene} from 'react-babylonjs'
import React from "react";
import {Color3, Color4, Scene as s, Vector3} from "@babylonjs/core";
import '@babylonjs/core/Rendering/edgesRenderer';
import {Communication} from "./utilities/communication";
import {GREEN, localColours, YELLOW} from "./utilities/colour";
import {Cube} from "./cube";

export type SceneProps = {
    communication: Communication,
    engineOptions?: BABYLON.EngineOptions,
    adaptToDeviceRatio?: boolean,
    width?: number,
    height?: number
    alpha: number,
    beta: number,
    radius: number,
};

export type SceneState = {
    scene: s,
    colours: Color3[]
}

export default class RubiksScene extends React.Component<SceneProps, SceneState> {

    componentDidMount(): void {
        this.setState({colours: localColours});
        this.props.communication.authenticateAndGetCube().then(colours => this.setState({colours}));
    }

    render = () =>
        <Engine canvasId="renderCanvas" antialias={true} engineOptions={this.props.engineOptions}
                adaptToDeviceRatio={this.props.adaptToDeviceRatio}>
            <Scene onSceneMount={e => this.setState({scene: e.scene})}>
                <arcRotateCamera name={"camera"} alpha={this.props.alpha} beta={this.props.beta}
                                 radius={this.props.radius} target={new Vector3(0, 0, 0)} upperRadiusLimit={20}
                                 lowerRadiusLimit={10} upperBetaLimit={2 * Math.PI / 3}
                                 lowerBetaLimit={Math.PI / 3}/>
                <hemisphericLight name={"light"} direction={new Vector3(5, 5, -5)} intensity={0.5}/>
                <sphere name={"sun"} segments={20} diameter={3} position={new Vector3(7, 7, -7)}>
                    <standardMaterial name={"sun-material"} diffuseColor={new Color3(1, 1, 1)}
                                      specularColor={new Color3(0.1, 0.1, 0.1)}
                                      ambientColor={new Color3(1, 1, 1)} emissiveColor={YELLOW}/>
                </sphere>
                <tiledGround name={"ground"} onCreated={g => g.enableEdgesRendering()} edgesWidth={8.0}
                             edgesColor={Color4.FromColor3(Color3.Black())} xmax={60} xmin={-60} zmax={60} zmin={-60}
                             subdivisions={{w: 30, h: 30}} precision={{w: 1, h: 1}} position={new Vector3(0, -10, 0)}>
                    <standardMaterial name={"ground-material"} diffuseColor={new Color3(0.4, 0.4, 0.4)}
                                      specularColor={new Color3(0.1, 0.1, 0.1)}
                                      ambientColor={new Color3(1, 1, 1)} emissiveColor={GREEN}/>
                </tiledGround>
                <Cube colours={this.state?.colours}/>
            </Scene>
        </Engine>
}