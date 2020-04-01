import * as React from 'react';
import Scene from './scene';
import Communication from "./utilities/communication";
import Cookies from "js-cookie";

type GameState = {
    acceptedCookies: boolean
}

export default class Game extends React.PureComponent<{}, GameState> {

    private readonly cookieConsent = "cookie-consent";

    constructor(props: any) {
        super(props);
        console.log(Cookies.getJSON());
        if (Cookies.get(this.cookieConsent)) {
            if (Cookies.get(this.cookieConsent) === "true") {
                this.state = {acceptedCookies: true};
            } else {
                this.state = {acceptedCookies: false};
            }
        } else {
            Cookies.set(this.cookieConsent, "false");
        }
    }

    setAcceptedCookies = () => {
        Cookies.set(this.cookieConsent, "true");
        this.setState({acceptedCookies: true});
    };

    render() {
        return (
            <Scene communication={new Communication()}
                   acceptedCookies={this.state?.acceptedCookies ?? false}
                   setAcceptedCookies={this.setAcceptedCookies}/>
        )
    }
}

