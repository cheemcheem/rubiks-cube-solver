import React from "react";
import {Color3, Color4, Mesh, Vector3} from "@babylonjs/core";
import {NO_ROTATION, X_ROTATION, Y_ROTATION, Z_ROTATION} from "./utilities/rotation";
import {Space} from "babylonjs";

export type CubeProps = {
    colours: Color3[]
}

export class Cube extends React.Component<CubeProps, {}> {

    public static middle = (colour1: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
        </box>
    };

    public static edge = (colour1: Color3, colour2: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
            {Cube.face(2, colour2, new Vector3(0, 0, -0.5), Vector3.Up().scale(0))}
        </box>
    };

    public static corner = (colour1: Color3, colour2: Color3, colour3: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
            {Cube.face(2, colour2, new Vector3(0, 0, -0.5), Vector3.Up().scale(0))}
            {Cube.face(3, colour3, new Vector3(0.5, 0, 0), Vector3.Down().scale(Math.PI / 2))}
        </box>
    };

    private static rotate = (rotationAxis: Vector3, parent: Mesh) => {
        if (rotationAxis.x) {
            parent.rotate(Vector3.Right(), rotationAxis.x * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.y) {
            parent.rotate(Vector3.Up(), rotationAxis.y * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.z) {
            parent.rotate(Vector3.Forward(), rotationAxis.z * Math.PI / 2, Space.LOCAL);
        }
    };

    private static face = (id: any, colour: Color3, position: Vector3, rotation: Vector3) => {
        return <plane name={`face${String(id)}`} onCreated={f => f.enableEdgesRendering()} edgesWidth={2.0}
                      edgesColor={Color4.FromColor3(Color3.Black())} position={position} rotation={rotation}>
            <standardMaterial name={`material${String(id)}`} diffuseColor={new Color3(0.4, 0.4, 0.4)}
                              specularColor={new Color3(0.7, 0.7, 0.7)} emissiveColor={colour}/>
        </plane>
    }

    render() {
        return this.props.colours ? this.makeCube() : "";
    }

    public makeCube = () => {
        const colours = this.props.colours;
        //@formatter:off
        return <box name={"cube"} visibility={0}>
            {Cube.middle(colours[13], new Vector3( 0,  0,-1), X_ROTATION.scale(-1))}
            {Cube.middle(colours[ 4], new Vector3(-1,  0, 0), Z_ROTATION)}
            {Cube.middle(colours[31], new Vector3( 0,  0, 1), X_ROTATION)}
            {Cube.middle(colours[22], new Vector3( 1,  0, 0), Z_ROTATION.scale(-1))}
            {Cube.middle(colours[40], new Vector3( 0,  1, 0), NO_ROTATION)}
            {Cube.middle(colours[49], new Vector3( 0, -1, 0), X_ROTATION.scale(2))}

            {Cube.edge(colours[43], colours[10], new Vector3( 0,  1, -1), NO_ROTATION)}
            {Cube.edge(colours[37], colours[28], new Vector3( 0,  1,  1), Y_ROTATION.scale( 2))}
            {Cube.edge(colours[39], colours[ 1], new Vector3(-1,  1,  0), Y_ROTATION)}
            {Cube.edge(colours[41], colours[19], new Vector3( 1,  1,  0), Y_ROTATION.scale(-1))}
            {Cube.edge(colours[46], colours[16], new Vector3( 0, -1, -1), X_ROTATION.scale( 2).add(Y_ROTATION.scale( 2)))}
            {Cube.edge(colours[52], colours[34], new Vector3( 0, -1,  1), X_ROTATION.scale( 2))}
            {Cube.edge(colours[48], colours[ 7], new Vector3(-1, -1,  0), X_ROTATION.scale( 2).add(Y_ROTATION))}
            {Cube.edge(colours[50], colours[25], new Vector3( 1, -1,  0), X_ROTATION.scale( 2).add(Y_ROTATION.scale(-1)))}
            {Cube.edge(colours[ 5], colours[12], new Vector3(-1,  0, -1), Z_ROTATION)}
            {Cube.edge(colours[ 3], colours[32], new Vector3( -1, 0,  1), Y_ROTATION.scale( 2).add(Z_ROTATION.scale(-1)))}
            {Cube.edge(colours[30], colours[23], new Vector3( 1,  0,  1), X_ROTATION.add(Y_ROTATION.scale(-1)))}
            {Cube.edge(colours[21], colours[14], new Vector3( 1,  0, -1), Z_ROTATION.scale(-1))}

            {Cube.corner(colours[44], colours[11], colours[18], new Vector3( 1,  1, -1), NO_ROTATION)}
            {Cube.corner(colours[ 2], colours[ 9], colours[42], new Vector3(-1,  1, -1), Z_ROTATION)}
            {Cube.corner(colours[24], colours[17], colours[47], new Vector3( 1, -1, -1), Z_ROTATION.scale(-1))}
            {Cube.corner(colours[45], colours[15], colours[ 8], new Vector3(-1, -1, -1), Z_ROTATION.scale( 2))}
            {Cube.corner(colours[38], colours[20], colours[27], new Vector3( 1,  1,  1), Y_ROTATION.scale( 3))}
            {Cube.corner(colours[36], colours[29], colours[ 0], new Vector3(-1,  1,  1), Y_ROTATION.scale( 2))}
            {Cube.corner(colours[53], colours[33], colours[26], new Vector3( 1, -1,  1), X_ROTATION.scale( 2))}
            {Cube.corner(colours[35], colours[51], colours[ 6], new Vector3(-1, -1,  1), Y_ROTATION.scale( 2).add(X_ROTATION))}
        }
        </box>
        //@formatter:on
    };
}