import * as React from 'react';
import RubiksScene, {SceneProps} from './rubiksScene';
import {Communication} from "./utilities/communication";

export default class RubiksGame extends React.PureComponent {
    render() {
        const sceneProps: SceneProps = {
            cameraProps: {alpha: 0, beta: 0},
            communication: new Communication()
        };
        return (
            <RubiksScene communication={sceneProps.communication} cameraProps={sceneProps.cameraProps}/>
        )
    }
}

