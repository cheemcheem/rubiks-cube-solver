import * as React from 'react';
import Scene from './scene';
import Communication from "./utilities/communication";


export default class Game extends React.PureComponent {
    render() {
        return (
            <Scene communication={new Communication()}/>
        )
    }
}

