import * as React from 'react';
import RubiksScene, {SceneProps} from './rubiksScene';
import {Communication} from "./utilities/communication";
import {transparentLog} from "./utilities/logging";

export default class RubiksGame extends React.PureComponent {
    render() {
        const sceneProps: SceneProps = {
            cameraProps: {alpha: 0, beta: 0},
            communication: new Communication()
        };
        const {cameraProps} = sceneProps;
        document.cookie.split(";").filter(c => c.trim().startsWith("camera.")).forEach(c => {
            transparentLog(c);
            const [axis, value] = c.split("=");
            if (axis.endsWith("alpha")) {
                cameraProps.alpha = Number(value);
            }
            if (axis.endsWith("beta")) {
                cameraProps.beta = Number(value);
            }
        });
        return (
            <RubiksScene communication={sceneProps.communication} cameraProps={sceneProps.cameraProps}/>
        )
    }
}

