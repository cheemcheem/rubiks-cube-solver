import * as React from 'react';
import RubiksScene, {SceneEventArgs} from './rubiksScene';
import {LogLevel, transparentLog} from "./utilities/logging";
import {convertResponse, createCubeIfNeededRequest, fetchCubeRequest, logInRequest} from "./utilities/communication";
import {localColours} from "./utilities/colour";
import {SceneHandler} from "./utilities/SceneHandler";

export default class RubiksGame extends React.Component<{}, {}> {
    private sceneHandler?: SceneHandler;
    private authenticateAndGetCube() {
        return logInRequest()
            .then(fetchCubeRequest)
            .then(createCubeIfNeededRequest)
            .then(convertResponse)
            .catch(err => {
                transparentLog(err, LogLevel.ERROR);
                transparentLog("Can't connect to back end, running with no saved state.", LogLevel.WARN);
                return localColours;
            })
            ;
    }

    onSceneMount = (e: SceneEventArgs) => {
        const {canvas, scene, engine} = e;
        this.sceneHandler = new SceneHandler(canvas, scene, engine);
        this.sceneHandler.createInitialObjects();
        this.authenticateAndGetCube().then(this.sceneHandler!.setColours);
        this.sceneHandler.startEngine();
    };

    render() {
        return (
            <RubiksScene onSceneMount={this.onSceneMount}/>
        )
    }
}

