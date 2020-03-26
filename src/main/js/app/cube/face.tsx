import React from "react";
import {Color3, Color4, Vector3} from "@babylonjs/core";

export type FaceProps = {
    id: any,
    colour: Color3,
    position: Vector3,
    rotation: Vector3
}

export class Face extends React.PureComponent<FaceProps> {
    render() {
        return <>
            <plane name={`face${String(this.props.id)}`}
                   onCreated={f => f.enableEdgesRendering()}
                   edgesWidth={2.0}
                   edgesColor={Color4.FromColor3(Color3.Black())}
                   position={this.props.position}
                   rotation={this.props.rotation}>
                <standardMaterial name={`material${String(this.props.id)}`}
                                  diffuseColor={this.props.colour}
                                  emissiveColor={this.props.colour.scale(0.5)}
                                  specularColor={new Color3(0, 0, 0)}
                />
            </plane>
        </>
    }
}