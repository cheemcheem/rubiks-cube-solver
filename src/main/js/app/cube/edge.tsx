import React from "react";
import {Face} from "./face";
import {Color3, Vector3} from "@babylonjs/core";
import {rotate} from "../utilities/constants";
import {MiddleProps} from "./middle";

export type EdgeProps = { colour2: Color3 } & MiddleProps

export class Edge extends React.PureComponent<EdgeProps> {
    render() {
        return <>
            <box name={`parent`}
                 position={this.props.position}
                 visibility={0}
                 onCreated={p => rotate(this.props.rotation, p)}>
                <Face colour1={this.props.colour1}
                      position={new Vector3(0, 0.5, 0)}
                      rotation={Vector3.Right().scale(Math.PI / 2)}
                />
                <Face colour1={this.props.colour2}
                      position={new Vector3(0, 0, -0.5)}
                      rotation={Vector3.Up().scale(0)}
                />
            </box>
        </>
    }
}