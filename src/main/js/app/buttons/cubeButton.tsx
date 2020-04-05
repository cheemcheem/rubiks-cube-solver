import {Vector3} from "@babylonjs/core";
import React from "react";
import {Button} from "@babylonjs/gui";
import {BUTTON_COLOURS} from "../utilities/constants";
import {GenericCubeButtonProps} from "../utilities/types";

const {CURRENT_MOVE_COLOUR, HIGHLIGHTED_COLOUR, READY_COLOUR, UNAVAILABLE_COLOUR} = BUTTON_COLOURS;

export type CubeButtonProps = {
    position: Vector3
    symbol: string
    move: string
    rotation: Vector3
} & GenericCubeButtonProps

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
                                        background={this.props.currentMove === this.props.move
                                            ? CURRENT_MOVE_COLOUR
                                            : this.props.buttonsEnabled
                                                ? READY_COLOUR
                                                : UNAVAILABLE_COLOUR
                                        }
                                        onPointerClickObservable={() => this.props.makeMove(this.props.move)}
                                        onPointerEnterObservable={(b: Button) => {
                                            b.background = this.props.currentMove === this.props.move
                                                ? CURRENT_MOVE_COLOUR
                                                : this.props.buttonsEnabled
                                                    ? HIGHLIGHTED_COLOUR
                                                    : UNAVAILABLE_COLOUR
                                        }}
                                        onPointerOutObservable={(b: Button) => {
                                            b.background = this.props.currentMove === this.props.move
                                                ? CURRENT_MOVE_COLOUR
                                                : this.props.buttonsEnabled
                                                    ? READY_COLOUR
                                                    : UNAVAILABLE_COLOUR
                                        }}>
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