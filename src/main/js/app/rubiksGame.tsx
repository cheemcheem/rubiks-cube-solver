import * as React from 'react';
import RubiksScene, {SceneEventArgs} from './rubiksScene';
import {SceneHandler} from "./utilities/SceneHandler";
import {Communication} from "./utilities/Communication";

export default class RubiksGame extends React.Component<{}, {}> {

    onSceneMount = (sceneEventArgs: SceneEventArgs) => {
        const sceneHandler = new SceneHandler(sceneEventArgs);
        const communication = new Communication();

        sceneHandler.createInitialObjects();
        sceneHandler.startEngine();

        communication!.authenticateAndGetCube().then(sceneHandler!.setColours);
    };


    render() {
        return (
            <RubiksScene onSceneMount={this.onSceneMount}/>
        )
    }
}

