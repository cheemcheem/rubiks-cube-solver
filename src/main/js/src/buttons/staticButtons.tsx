import React from "react";
import {Control} from "@babylonjs/gui";
import {StaticButton} from "./staticButton";
import {button} from "../utilities/constants";
import {ButtonTypeProps, RequiresWindowWidthProps} from "../utilities/types";

export type StaticButtonsProps = {
    buttonsEnabled: boolean,
    resetCube: () => void,
    shuffleCube: () => void,
    solveCube: () => void
} & ButtonTypeProps & RequiresWindowWidthProps


export default class StaticButtons extends React.PureComponent<StaticButtonsProps> {

    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle paddingTopInPixels={30} key={"labelContainer"} name={"labelContainer"} thickness={0}
                           paddingLeftInPixels={this.paddingSides()} paddingRightInPixels={this.paddingSides()}>
                    <StaticButton windowWidth={this.props.windowWidth}
                                  currentButton={this.props.currentButton}
                                  name={button({currentButton: "reset"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.resetCube}
                    />
                    <StaticButton windowWidth={this.props.windowWidth}
                                  currentButton={this.props.currentButton}
                                  name={button({currentButton: "solve"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.solveCube}
                    />
                    <StaticButton windowWidth={this.props.windowWidth}
                                  currentButton={this.props.currentButton}
                                  name={button({currentButton: "shuffle"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.shuffleCube}
                    />
                </rectangle>
            </adtFullscreenUi>
        </>
    }

    private paddingSides = () => {
        return this.props.windowWidth > 1000
            ? 400
            : this.props.windowWidth < 700
                ? 50
                : 100;
    }
}