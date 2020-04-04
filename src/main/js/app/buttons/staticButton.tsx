import React from "react";
import {Button} from "@babylonjs/gui";
import {
    BUTTON_TYPE,
    CURRENT_MOVE_COLOUR,
    HIGHLIGHTED_COLOUR,
    READY_COLOUR,
    UNAVAILABLE_COLOUR
} from "../utilities/constants";

export type StaticButtonProps = {
    name: string
    verticalAlignment: number | undefined
    horizontalAlignment: number | undefined
    buttonsEnabled: boolean
    onPointerClickObservable: () => void
} & BUTTON_TYPE

export class StaticButton extends React.PureComponent<StaticButtonProps> {
    render() {
        return <>
            <rectangle key={`${this.props.name}Rect`}
                       name={`${this.props.name}Rect`}
                       height='80px'
                       alpha={0.5}
                       width='300px'
                       cornerRadius={0}
                       thickness={3}
                       verticalAlignment={this.props.verticalAlignment}
                       horizontalAlignment={this.props.horizontalAlignment}>
                <babylon-button name={`${this.props.name}Button`}
                                background={this.props.name === this.props.currentButton
                                    ? CURRENT_MOVE_COLOUR
                                    : this.props.buttonsEnabled
                                        ? READY_COLOUR
                                        : UNAVAILABLE_COLOUR}
                                isEnabled={this.props.buttonsEnabled}
                                onPointerClickObservable={this.props.onPointerClickObservable}
                                onPointerEnterObservable={(b: Button) => b.background = this.props.name === this.props.currentButton
                                    ? CURRENT_MOVE_COLOUR
                                    : this.props.buttonsEnabled
                                        ? HIGHLIGHTED_COLOUR
                                        : UNAVAILABLE_COLOUR}
                                onPointerOutObservable={(b: Button) => b.background = this.props.name === this.props.currentButton
                                    ? CURRENT_MOVE_COLOUR
                                    : this.props.buttonsEnabled
                                        ? READY_COLOUR
                                        : UNAVAILABLE_COLOUR}>
                    <textBlock name={`${this.props.name}Text`}
                               text={this.props.name}
                               color='white'
                               fontSize={30}
                    />
                </babylon-button>
            </rectangle>
        </>
    }
}