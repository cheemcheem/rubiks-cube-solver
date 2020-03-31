import React from "react";
import {Control} from "@babylonjs/gui";
import {StaticButton} from "./staticButton";

export type StaticButtonsProps = {
    buttonsEnabled: boolean,
    resetCube: () => void,
    shuffleCube: () => void,
    solveCube: () => void,
}

export default class StaticButtons extends React.PureComponent<StaticButtonsProps> {
    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle key={"labelContainer"} name={"labelContainer"} thickness={0} width={"1000px"}>
                    <StaticButton name={"reset"}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.resetCube}
                    />
                    <StaticButton name={"solve"}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_CENTER}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.solveCube}
                    />
                    <StaticButton name={"shuffle"}
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