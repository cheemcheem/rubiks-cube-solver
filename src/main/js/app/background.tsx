import React from "react";
import {Vector3} from "@babylonjs/core";

export default class Background extends React.PureComponent {
    render() {
        return <>
            <arcRotateCamera name={"camera"}
                             alpha={0}
                             beta={0}
                             radius={15}
                             target={new Vector3(0, 0, 0)}
                             upperRadiusLimit={15}
                             lowerRadiusLimit={15}
                             upperBetaLimit={3 * Math.PI / 4}
                             lowerBetaLimit={Math.PI / 4}/>
            <directionalLight name={"light"}
                              direction={new Vector3(5, -5, 5)}
                              intensity={1}
            />
            <directionalLight name={"light"}
                              direction={new Vector3(0, -5, 0)}
                              intensity={1}
            />
            <directionalLight name={"light"}
                              direction={new Vector3(-5, -5, -5)}
                              intensity={1}
            />
        </>
    }
}