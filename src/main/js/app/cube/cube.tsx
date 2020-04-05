import React from "react";
import {Color3, Vector3} from "@babylonjs/core";
import {ROTATIONS} from "../utilities/constants";
import {Middle} from "./middle";
import {Edge} from "./edge";
import {Corner} from "./corner";

const {NO_ROTATION, X_ROTATION, Y_ROTATION, Z_ROTATION} = ROTATIONS;

export type CubeProps = { colours: Color3[] }

export default class Cube extends React.PureComponent<CubeProps> {

    render() {
        return <>
            <box name={"cube"} visibility={0}>
                {this.props.colours ? this.renderCubeBoxes() : <></>}
            </box>
        </>;
    }

    private renderCubeBoxes = () => {
        const colours = this.props.colours;
        return <>
            <Middle colour1={colours[13]}
                    position={new Vector3(0, 0, -1)}
                    rotation={X_ROTATION.scale(-1)}
            />
            <Middle colour1={colours[4]}
                    position={new Vector3(-1, 0, 0)}
                    rotation={Z_ROTATION}
            />
            <Middle colour1={colours[31]}
                    position={new Vector3(0, 0, 1)}
                    rotation={X_ROTATION}
            />
            <Middle colour1={colours[22]}
                    position={new Vector3(1, 0, 0)}
                    rotation={Z_ROTATION.scale(-1)}
            />
            <Middle colour1={colours[40]}
                    position={new Vector3(0, 1, 0)}
                    rotation={NO_ROTATION}
            />
            <Middle colour1={colours[49]}
                    position={new Vector3(0, -1, 0)}
                    rotation={X_ROTATION.scale(2)}
            />

            <Edge colour1={colours[43]}
                  colour2={colours[10]}
                  position={new Vector3(0, 1, -1)}
                  rotation={NO_ROTATION}
            />
            <Edge colour1={colours[37]}
                  colour2={colours[28]}
                  position={new Vector3(0, 1, 1)}
                  rotation={Y_ROTATION.scale(2)}
            />
            <Edge colour1={colours[39]}
                  colour2={colours[1]}
                  position={new Vector3(-1, 1, 0)}
                  rotation={Y_ROTATION}
            />
            <Edge colour1={colours[41]}
                  colour2={colours[19]}
                  position={new Vector3(1, 1, 0)}
                  rotation={Y_ROTATION.scale(-1)}
            />
            <Edge colour1={colours[46]}
                  colour2={colours[16]}
                  position={new Vector3(0, -1, -1)}
                  rotation={X_ROTATION.scale(2).add(Y_ROTATION.scale(2))}
            />
            <Edge colour1={colours[52]}
                  colour2={colours[34]}
                  position={new Vector3(0, -1, 1)}
                  rotation={X_ROTATION.scale(2)}
            />
            <Edge colour1={colours[48]}
                  colour2={colours[7]}
                  position={new Vector3(-1, -1, 0)}
                  rotation={X_ROTATION.scale(2).add(Y_ROTATION)}
            />
            <Edge colour1={colours[50]}
                  colour2={colours[25]}
                  position={new Vector3(1, -1, 0)}
                  rotation={X_ROTATION.scale(2).add(Y_ROTATION.scale(-1))}
            />
            <Edge colour1={colours[5]}
                  colour2={colours[12]}
                  position={new Vector3(-1, 0, -1)}
                  rotation={Z_ROTATION}
            />
            <Edge colour1={colours[3]}
                  colour2={colours[32]}
                  position={new Vector3(-1, 0, 1)}
                  rotation={Y_ROTATION.scale(2).add(Z_ROTATION.scale(-1))}
            />
            <Edge colour1={colours[30]}
                  colour2={colours[23]}
                  position={new Vector3(1, 0, 1)}
                  rotation={X_ROTATION.add(Y_ROTATION.scale(-1))}
            />
            <Edge colour1={colours[21]}
                  colour2={colours[14]}
                  position={new Vector3(1, 0, -1)}
                  rotation={Z_ROTATION.scale(-1)}
            />

            <Corner colour1={colours[44]}
                    colour2={colours[11]}
                    colour3={colours[18]}
                    position={new Vector3(1, 1, -1)}
                    rotation={NO_ROTATION}
            />
            <Corner colour1={colours[2]}
                    colour2={colours[9]}
                    colour3={colours[42]}
                    position={new Vector3(-1, 1, -1)}
                    rotation={Z_ROTATION}
            />
            <Corner colour1={colours[24]}
                    colour2={colours[17]}
                    colour3={colours[47]}
                    position={new Vector3(1, -1, -1)}
                    rotation={Z_ROTATION.scale(-1)}
            />
            <Corner colour1={colours[45]}
                    colour2={colours[15]}
                    colour3={colours[8]}
                    position={new Vector3(-1, -1, -1)}
                    rotation={Z_ROTATION.scale(2)}
            />
            <Corner colour1={colours[38]}
                    colour2={colours[20]}
                    colour3={colours[27]}
                    position={new Vector3(1, 1, 1)}
                    rotation={Y_ROTATION.scale(3)}
            />
            <Corner colour1={colours[36]}
                    colour2={colours[29]}
                    colour3={colours[0]}
                    position={new Vector3(-1, 1, 1)}
                    rotation={Y_ROTATION.scale(2)}
            />
            <Corner colour1={colours[53]}
                    colour2={colours[33]}
                    colour3={colours[26]}
                    position={new Vector3(1, -1, 1)}
                    rotation={X_ROTATION.scale(2)}
            />
            <Corner colour1={colours[35]}
                    colour2={colours[51]}
                    colour3={colours[6]}
                    position={new Vector3(-1, -1, 1)}
                    rotation={Y_ROTATION.scale(2).add(X_ROTATION)}
            />
        </>
    };
}