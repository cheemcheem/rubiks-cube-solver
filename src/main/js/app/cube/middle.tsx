import {Color3, Vector3} from "@babylonjs/core";
import React from "react";
import {Face} from "./face";
import {rotate} from "../utilities/rotation";

export type MiddleProps = {
    colour1: Color3,
    position: Vector3,
    rotationAxis: Vector3
}

export class Middle extends React.PureComponent<MiddleProps> {
    render() {
        return <>
            <box name={`parent`}
                 position={this.props.position}
                 visibility={0}
                 onCreated={p => rotate(this.props.rotationAxis, p)}>
                <Face id={1}
                      colour={this.props.colour1}
                      position={new Vector3(0, 0.5, 0)}
                      rotation={Vector3.Right().scale(Math.PI / 2)}
                />
            </box>
        </>
    }
}