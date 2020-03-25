import React from "react";
import {Vector3} from "@babylonjs/core";
import {Button, Control} from "@babylonjs/gui";
import "regenerator-runtime/runtime.js";

export type BackgroundProps = {
    cameraProps: { alpha: number, beta: number },
    resetCube: () => void,
    shuffleCube: () => void,
    buttonsEnabled: boolean
}

export class Background extends React.PureComponent<BackgroundProps> {
    render() {
        return <>
            <adtFullscreenUi name={"fullScreenUI"}>
                <rectangle key={"labelContainer"} name={"labelContainer"} thickness={0} width={"700px"}>
                    <rectangle key={`resetLabel`} name={`resetLabel`} height='80px' alpha={0.5} width='300px'
                               cornerRadius={0}
                               thickness={3}
                               verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                               horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}>
                        <babylon-button name={`button-for-reset`}
                                        background={this.props.buttonsEnabled ? "red" : "grey"}
                                        isEnabled={this.props.buttonsEnabled}
                                        onPointerClickObservable={this.props.resetCube}
                                        onPointerEnterObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "lightgrey" : "grey"}
                                        onPointerOutObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "red" : "grey"}>
                            <textBlock name={`resetLabelText`} text={`reset`} color='White' fontSize={30}/>
                        </babylon-button>
                    </rectangle>
                    <rectangle key={`shuffleLabel`} name={`shuffleLabel`} height='80px' alpha={0.5} width='300px'
                               cornerRadius={0}
                               thickness={3}
                               verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                               horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_RIGHT}>
                        <babylon-button name={`button-for-shuffle`}
                                        background={this.props.buttonsEnabled ? "blue" : "grey"}
                                        isEnabled={this.props.buttonsEnabled}
                                        onPointerClickObservable={this.props.shuffleCube}
                                        onPointerEnterObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "lightgrey" : "grey"}
                                        onPointerOutObservable={(b: Button) => b.background = this.props.buttonsEnabled ? "blue" : "grey"}>
                            <textBlock name={`shuffleLabelText`} text={`shuffle`} color='White' fontSize={30}/>
                        </babylon-button>
                    </rectangle>
                </rectangle>
            </adtFullscreenUi>
            <arcRotateCamera name={"camera"}
                             alpha={this.props.cameraProps.alpha}
                             beta={this.props.cameraProps.beta}
                             radius={15}
                             target={new Vector3(0, 0, 0)}
                             upperRadiusLimit={15}
                             lowerRadiusLimit={15}
                             upperBetaLimit={3 * Math.PI / 4}
                             lowerBetaLimit={Math.PI / 4}/>
            <directionalLight name={"light"} direction={new Vector3(5, -5, 5)} intensity={1}/>
            <directionalLight name={"light"} direction={new Vector3(0, -5, 0)} intensity={1}/>
            <directionalLight name={"light"} direction={new Vector3(-5, -5, -5)} intensity={1}/>
        </>
    }
}