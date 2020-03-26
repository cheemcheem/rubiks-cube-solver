import React from "react";
import {Face} from "./face";
import {Color3, Vector3} from "@babylonjs/core";
import {rotate} from "../utilities/rotation";

export type EdgeProps = {
    colour1: Color3,
    colour2: Color3,
    position: Vector3,
    rotationAxis: Vector3
}

export class Edge extends React.PureComponent<EdgeProps> {
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
                <Face id={2}
                      colour={this.props.colour2}
                      position={new Vector3(0, 0, -0.5)}
                      rotation={Vector3.Up().scale(0)}
                />
            </box>
        </>
    }
}