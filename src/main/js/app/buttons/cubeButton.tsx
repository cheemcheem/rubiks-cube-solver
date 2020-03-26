import {Vector3} from "@babylonjs/core";
import React from "react";
import {Button} from "@babylonjs/gui";

export type CubeButtonProps = {
    position: Vector3
    symbol: string
    move: string
    rotation: Vector3
    buttonsEnabled: boolean
    makeMove: (move: string) => void
}

export class CubeButton extends React.PureComponent<CubeButtonProps> {
    render() {
        return <>
            <plane name="dialog"
                   size={1}
                   position={this.props.position}
                   rotation={this.props.rotation}>
                <advancedDynamicTexture name="dialogTexture"
                                        createForParentMesh={true}
                                        hasAlpha={false}
                                        height={1024}
                                        width={1024}>
                    <rectangle name={`${this.props.move}MoveRect`}
                               height={0.5}
                               width={0.8}
                               thickness={20}
                               cornerRadius={12}>
                        <babylon-button name={`${this.props.move}MoveButton`}
                                        isEnabled={this.props.buttonsEnabled}
                                        background={this.props.buttonsEnabled ? "green" : "grey"}
                                        onPointerClickObservable={() => this.props.makeMove(this.props.move)}
                                        onPointerEnterObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "lightgreen" : "grey"}
                                        onPointerOutObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "green" : "grey"}>
                            <textBlock text={this.props.symbol}
                                       fontStyle="bold"
                                       fontSize={300}
                                       color={this.props.buttonsEnabled ? "white" : "darkgrey"}
                            />
                        </babylon-button>
                    </rectangle>
                </advancedDynamicTexture>
            </plane>
        </>
    }
}