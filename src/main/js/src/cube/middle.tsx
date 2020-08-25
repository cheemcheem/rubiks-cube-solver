import {Vector3} from "@babylonjs/core";
import React from "react";
import {Face, FaceProps} from "./face";
import {rotate} from "../utilities/constants";

export type MiddleProps = FaceProps

export class Middle extends React.PureComponent<MiddleProps> {
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
            </box>
        </>
    }
}