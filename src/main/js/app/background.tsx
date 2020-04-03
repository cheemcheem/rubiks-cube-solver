import React from "react";
import {Vector3} from "@babylonjs/core";

export default class Background extends React.PureComponent {

    render() {
        return <>
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