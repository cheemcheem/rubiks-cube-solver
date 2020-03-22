import React from "react";
import {ArcRotateCamera, Camera, Color3, Color4, Mesh, Vector3} from "@babylonjs/core";
import {GREEN, YELLOW} from "./utilities/colour";

export type BackgroundProps = {
    cameraProps: { alpha: number, beta: number, radius: number },
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
            <sphere name={"sun"}
                    segments={20}
                    diameter={3}
                    position={new Vector3(7, 7, -7)}>
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
                             upperBetaLimit={2 * Math.PI / 3}
                             lowerBetaLimit={Math.PI / 3}
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
                         position={new Vector3(0, -10, 0)}>
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
            this.ground.rotation = Vector3.Up().scale(-this.camera.alpha);
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