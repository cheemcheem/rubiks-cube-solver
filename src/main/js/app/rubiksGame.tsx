import * as React from 'react';
import RubiksScene, {SceneEventArgs} from './rubiksScene';
import {SceneHandler} from "./utilities/SceneHandler";

export default class RubiksGame extends React.Component<{}, {}> {

    onSceneMount = (sceneEventArgs: SceneEventArgs) => {
        const sceneHandler = new SceneHandler(sceneEventArgs);

        sceneHandler.startEngine();
        sceneHandler.createInitialObjects();

    };


    render() {
        return (
            <RubiksScene onSceneMount={this.onSceneMount}/>
        )
    }
}

