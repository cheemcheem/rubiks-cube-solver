import React from "react";
import {Color3, Color4, Mesh, Vector3} from "@babylonjs/core";
import {NO_ROTATION, X_ROTATION, Y_ROTATION, Z_ROTATION} from "./utilities/rotation";
import {Space} from "babylonjs";
import {Button} from "@babylonjs/gui";

export type CubeProps = {
    colours: Color3[],
    makeMove: (move: string) => void,
    buttonsEnabled: boolean
}

export class Cube extends React.Component<CubeProps, {}> {

    private static middle = (colour1: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
        </box>
    };

    private static edge = (colour1: Color3, colour2: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
            {Cube.face(2, colour2, new Vector3(0, 0, -0.5), Vector3.Up().scale(0))}
        </box>
    };

    private static corner = (colour1: Color3, colour2: Color3, colour3: Color3, position: Vector3, rotationAxis: Vector3) => {
        return <box name={`parent`} position={position} visibility={0} onCreated={p => Cube.rotate(rotationAxis, p)}>
            {Cube.face(1, colour1, new Vector3(0, 0.5, 0), Vector3.Right().scale(Math.PI / 2))}
            {Cube.face(2, colour2, new Vector3(0, 0, -0.5), Vector3.Up().scale(0))}
            {Cube.face(3, colour3, new Vector3(0.5, 0, 0), Vector3.Down().scale(Math.PI / 2))}
        </box>
    };

    render() {
        return this.props.colours ? this.renderCube() : <></>;
    }

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
    };

    renderCube = () => {
        return <box name={"cube"} visibility={0}>
            {this.renderCubeButtons()}
            {this.renderCubeBoxes()}
        </box>
    };

    private button = (position: Vector3, symbol: string, move: string, rotation = Vector3.Zero()) => {
        return <>
            <plane name="dialog"
                   size={1}
                   position={position}
                   rotation={rotation}>
                <advancedDynamicTexture name="dialogTexture"
                                        createForParentMesh={true}
                                        hasAlpha={false}
                                        height={1024}
                                        width={1024}>
                    <rectangle name={`rect-for-${move}`}
                               height={0.5}
                               width={0.8}
                               thickness={20}
                               cornerRadius={12}>
                        <babylon-button name={`button-for-${move}`}
                                        isEnabled={this.props.buttonsEnabled}
                                        background={this.props.buttonsEnabled ? "green" : "grey"}
                                        onPointerClickObservable={() => this.props.makeMove(move)}
                                        onPointerEnterObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "lightgreen" : "grey"}
                                        onPointerOutObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "green" : "grey"}>
                            <textBlock text={symbol}
                                       fontStyle="bold"
                                       fontSize={300}
                                       color={this.props.buttonsEnabled ? "white" : "darkgrey"}/>
                        </babylon-button>
                    </rectangle>
                </advancedDynamicTexture>
            </plane>
        </>
    };

    private renderCubeButtons = () => {
        // @formatter:off
        const buttonFaceDistance = 2;
        const buttonOtherDistance = 1.5;
        const yFlip = Vector3.Backward().scale(-Math.PI/2);
        const zFlip = yFlip.add(Vector3.Right().scale(Math.PI/2));
        return <>
            {this.button(new Vector3(-1,  buttonFaceDistance, -buttonOtherDistance), '\u25b2', "X_LEFT_UP")}
            {this.button(new Vector3( 0,  buttonFaceDistance, -buttonOtherDistance), '\u25b2', "X_MIDDLE_UP")}
            {this.button(new Vector3( 1,  buttonFaceDistance, -buttonOtherDistance), '\u25b2', "X_RIGHT_UP")}
            {this.button(new Vector3(-1, -buttonFaceDistance, -buttonOtherDistance), '\u25bc', "X_LEFT_DOWN")}
            {this.button(new Vector3( 0, -buttonFaceDistance, -buttonOtherDistance), '\u25bc', "X_MIDDLE_DOWN")}
            {this.button(new Vector3( 1, -buttonFaceDistance, -buttonOtherDistance), '\u25bc', "X_RIGHT_DOWN")}

            {this.button(new Vector3(-buttonFaceDistance, -1, -buttonOtherDistance), '\u25b2', "Y_BOTTOM_LEFT",  yFlip)}
            {this.button(new Vector3(-buttonFaceDistance,  0, -buttonOtherDistance), '\u25b2', "Y_MIDDLE_LEFT",  yFlip)}
            {this.button(new Vector3(-buttonFaceDistance,  1, -buttonOtherDistance), '\u25b2', "Y_TOP_LEFT",     yFlip)}
            {this.button(new Vector3( buttonFaceDistance, -1, -buttonOtherDistance), '\u25bc', "Y_BOTTOM_RIGHT", yFlip)}
            {this.button(new Vector3( buttonFaceDistance,  0, -buttonOtherDistance), '\u25bc', "Y_MIDDLE_RIGHT", yFlip)}
            {this.button(new Vector3( buttonFaceDistance,  1, -buttonOtherDistance), '\u25bc', "Y_TOP_RIGHT",    yFlip)}

            {this.button(new Vector3(-buttonFaceDistance,  buttonOtherDistance, -1), '\u25b2', "Z_NEAR_ANTICLOCKWISE",   zFlip)}
            {this.button(new Vector3(-buttonFaceDistance,  buttonOtherDistance,  0), '\u25b2', "Z_MIDDLE_ANTICLOCKWISE", zFlip)}
            {this.button(new Vector3(-buttonFaceDistance,  buttonOtherDistance,  1), '\u25b2', "Z_FAR_ANTICLOCKWISE",    zFlip)}
            {this.button(new Vector3( buttonFaceDistance,  buttonOtherDistance, -1), '\u25bc', "Z_NEAR_CLOCKWISE",       zFlip)}
            {this.button(new Vector3( buttonFaceDistance,  buttonOtherDistance,  0), '\u25bc', "Z_MIDDLE_CLOCKWISE",     zFlip)}
            {this.button(new Vector3( buttonFaceDistance,  buttonOtherDistance,  1), '\u25bc', "Z_FAR_CLOCKWISE",        zFlip)}
        </>
        //@formatter:on
    };


    private renderCubeBoxes = () => {
        const colours = this.props.colours;
        //@formatter:off
        return <>
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
        </>
        //@formatter:on
    };
}