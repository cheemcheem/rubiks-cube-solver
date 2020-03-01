import React from 'react';
import './resources/App.css';
import RubiksGame from "./app/rubiksGame";

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <RubiksGame/>
        )
    }
}

export default App;
