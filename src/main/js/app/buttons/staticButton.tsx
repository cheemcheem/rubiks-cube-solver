import React from "react";
import {Button} from "@babylonjs/gui";

export type StaticButtonProps = {
    name: string
    verticalAlignment: number | undefined
    horizontalAlignment: number | undefined
    buttonsEnabled: boolean
    onPointerClickObservable: () => void
}

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
                                background={this.props.buttonsEnabled ? "red" : "grey"}
                                isEnabled={this.props.buttonsEnabled}
                                onPointerClickObservable={this.props.onPointerClickObservable}
                                onPointerEnterObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "lightgrey" : "grey"}
                                onPointerOutObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "red" : "grey"}>
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