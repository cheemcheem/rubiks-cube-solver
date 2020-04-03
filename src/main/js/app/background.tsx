import React from "react";
import {Vector3} from "@babylonjs/core";

export type BackgroundProps = {
    spin: boolean
}
export default class Background extends React.PureComponent<BackgroundProps> {

    render() {
        return <>
            <arcRotateCamera name={"camera"}
                             useAutoRotationBehavior={this.props.spin}
                             lockedTarget
                             panningSensibility={0}
                             alpha={-Math.PI / 2}
                             beta={Math.PI / 3}
                             radius={15}
                             target={new Vector3(0, 0, 0)}
                             upperRadiusLimit={15}
                             lowerRadiusLimit={15}
                             upperBetaLimit={3 * Math.PI / 4}
                             lowerBetaLimit={Math.PI / 4}/>
            <directionalLight name={"light"}
                              direction={new Vector3(5, 5, 5)}
                              intensity={1}
            />
            <directionalLight name={"light"}
                              direction={new Vector3(-5, -5, -5)}
                              intensity={1}
            />
        </>
    }
}