import React from "react";
import {Face} from "./face";
import {Color3, Vector3} from "@babylonjs/core";
import {rotate} from "../utilities/constants";
import {EdgeProps} from "./edge";

export type CornerProps = { colour3: Color3, } & EdgeProps

export class Corner extends React.PureComponent<CornerProps> {
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
                <Face colour1={this.props.colour3}
                      position={new Vector3(0.5, 0, 0)}
                      rotation={Vector3.Down().scale(Math.PI / 2)}
                />
            </box>
        </>
    }
}