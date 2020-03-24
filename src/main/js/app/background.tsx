import React from "react";
import {
    ActionManager,
    ArcRotateCamera,
    Camera,
    Color3,
    Color4,
    ExecuteCodeAction,
    Mesh,
    Vector3
} from "@babylonjs/core";
import {GREEN, YELLOW} from "./utilities/colour";
import {Button, Control} from "@babylonjs/gui";
import "regenerator-runtime/runtime.js";

export type BackgroundProps = {
    cameraProps: { alpha: number, beta: number, radius: number },
    resetCube: () => void,
    shuffleCube: () => void
}

/**
 * Adds the tiled ground, arc rotate camera, light source, and sun into the scene.
 * Links the ground and camera together such that the ground appears to never move.
 */
export class Background extends React.Component<BackgroundProps, {}> {
    private ground?: Mesh;
    private camera?: ArcRotateCamera;

    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle key={"labelContainer"} name={"labelContainer"} thickness={0} width={"500px"}>
                    <rectangle key={`resetLabel`} name={`resetLabel`} height='80px' alpha={0.5} width='200px'
                               cornerRadius={20}
                               thickness={1}
                               verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                               horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}>
                        <babylon-button name={`button-for-reset`}
                                        background={"black"}
                                        onPointerClickObservable={this.props.resetCube} //todo add disable until reset complete
                                        onPointerEnterObservable={(b: Button) => b.background = "lightgrey"}
                                        onPointerOutObservable={(b: Button) => b.background = "grey"}>
                            <textBlock name={`resetLabelText`} text={`reset`} color='White' fontStyle="bold"
                                       fontSize={30}/>
                        </babylon-button>
                    </rectangle>
                    <rectangle key={`shuffleLabel`} name={`shuffleLabel`} height='80px' alpha={0.5} width='200px'
                               cornerRadius={20}
                               thickness={1}
                               verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                               horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}>
                        <babylon-button name={`button-for-shuffle`}
                                        background={"black"}
                                        onPointerClickObservable={this.props.shuffleCube} //todo add disable until reset complete
                                        onPointerEnterObservable={(b: Button) => b.background = "lightgrey"}
                                        onPointerOutObservable={(b: Button) => b.background = "grey"}>
                            <textBlock name={`shuffleLabelText`} text={`shuffle`} color='White' fontStyle="bold"
                                       fontSize={30}/>
                        </babylon-button>
                    </rectangle>
                </rectangle>
            </adtFullscreenUi>
            <sphere name={"sun"}
                    segments={20}
                    diameter={3}
                    position={new Vector3(7, 7, -7)}
                    onCreated={(s: Mesh) => {
                        s.actionManager = new ActionManager(s.getScene());
                        s.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, this.props.resetCube));
                    }}>
                <standardMaterial name={"sun-material"}
                                  diffuseColor={new Color3(1, 1, 1)}
                                  specularColor={new Color3(0.1, 0.1, 0.1)}
                                  ambientColor={new Color3(1, 1, 1)}
                                  emissiveColor={YELLOW}/>
            </sphere>
            <arcRotateCamera name={"camera"}
                             alpha={this.props.cameraProps.alpha}
                             beta={this.props.cameraProps.beta}
                             radius={this.props.cameraProps.radius}
                             target={new Vector3(0, 0, 0)}
                             upperRadiusLimit={20}
                             lowerRadiusLimit={10}
                             upperBetaLimit={3 * Math.PI / 4}
                             lowerBetaLimit={Math.PI / 4}
                             onCreated={this.cameraCreated}
                             onViewMatrixChangedObservable={this.onViewMatrixChangedObservable}/>
            <hemisphericLight name={"light"}
                              direction={new Vector3(5, 5, -5)}
                              intensity={0.5}/>
            <tiledGround name={"ground"}
                         onCreated={this.groundCreated}
                         edgesWidth={8.0}
                         edgesColor={Color4.FromColor3(Color3.Black())}
                         xmax={60} xmin={-60} zmax={60} zmin={-60}
                         subdivisions={{w: 30, h: 30}}
                         precision={{w: 1, h: 1}}
                         position={new Vector3(0, -15, 0)}>
                <standardMaterial name={"ground-material"}
                                  diffuseColor={new Color3(0.4, 0.4, 0.4)}
                                  specularColor={new Color3(0.1, 0.1, 0.1)}
                                  ambientColor={new Color3(1, 1, 1)}
                                  emissiveColor={GREEN}/>
            </tiledGround>
        </>
    }

    private onViewMatrixChangedObservable = () => {
        if (this.ground && this.camera) {
            this.ground.rotation = Vector3.Up().scale(0.2 - this.camera.alpha);
        }
    };

    private groundCreated = (g: Mesh) => {
        g.enableEdgesRendering();
        this.ground = g;
    };

    private cameraCreated = (c: Camera) => {
        this.camera = c as ArcRotateCamera;
    };

}