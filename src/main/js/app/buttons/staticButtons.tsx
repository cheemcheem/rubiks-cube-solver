import React from "react";
import {Control} from "@babylonjs/gui";
import {StaticButton} from "./staticButton";

export type StaticButtonsProps = {
    buttonsEnabled: boolean,
    resetCube: () => void,
    shuffleCube: () => void,
}

export default class StaticButtons extends React.PureComponent<StaticButtonsProps> {
    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle key={"labelContainer"} name={"labelContainer"} thickness={0} width={"700px"}>
                    <StaticButton name={"reset"}
                                  verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                                  horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                                  buttonsEnabled={this.props.buttonsEnabled}
                                  onPointerClickObservable={this.props.resetCube}
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