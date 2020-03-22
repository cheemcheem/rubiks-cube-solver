import * as React from 'react';
import RubiksScene from './rubiksScene';
import {Communication} from "./utilities/communication";

export default class RubiksGame extends React.Component<{}, {}> {
    render() {
        return (
            <RubiksScene communication={new Communication()} cameraProps={{alpha: 0, beta: 0, radius: 0}}/>
        )
    }
}

