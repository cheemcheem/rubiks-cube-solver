import React from "react";
import {Control} from "@babylonjs/gui";
import {StaticButton} from "./staticButton";
import {BUTTON, BUTTON_TYPE} from "../utilities/constants";

export type StaticButtonsProps = {
    buttonsEnabled: boolean,
    resetCube: () => void,
    shuffleCube: () => void,
    solveCube: () => void
} & BUTTON_TYPE

export default class StaticButtons extends React.PureComponent<StaticButtonsProps> {
    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle key={"labelContainer"} name={"labelContainer"} thickness={0} width={"1000px"}>
                    <StaticButton currentButton={this.props.currentButton}
                                  name={BUTTON({currentButton: "reset"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.resetCube}
                    />
                    <StaticButton currentButton={this.props.currentButton}
                                  name={BUTTON({currentButton: "solve"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.solveCube}
                    />
                    <StaticButton currentButton={this.props.currentButton}
                                  name={BUTTON({currentButton: "shuffle"})}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.shuffleCube}
                    />
                </rectangle>
            </adtFullscreenUi>
        </>
    }
}