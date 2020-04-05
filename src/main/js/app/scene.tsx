import {Engine, Scene as BabylonScene} from 'react-babylonjs'
import React from "react";
import {ArcRotateCamera, Color3, Color4} from "@babylonjs/core";
import '@babylonjs/core/Rendering/edgesRenderer'; // enables borders support in react-babylon
import Communication from "./utilities/communication";
import {LOCAL_COLOURS} from "./utilities/colour";
import "regenerator-runtime/runtime.js"; // async function support in babel
import Cube, {CubeProps} from './cube/cube';
import Background from "./background";
import Buttons, {ButtonsProps} from "./buttons/buttons";
import {CookieDialogue, CookieDialogueProps} from "./cookies";
import Cookies from "js-cookie";
import {COOKIES} from "./utilities/constants";
import {ButtonTypeProps, RequiresWindowWidthProps} from "./utilities/types";

const {CONSENT_COOKIE} = COOKIES;

export type SceneProps = {
    communication: Communication
};

type SceneState =
    { acceptedCookies: boolean, }
    & ButtonTypeProps
    & RequiresWindowWidthProps
    & CubeProps
    & ButtonsProps
    & CookieDialogueProps

export default class Scene extends React.PureComponent<SceneProps, SceneState> {
    private mouseDown = 0;
    private camera?: ArcRotateCamera;

    constructor(props: SceneProps) {
        super(props);

        this.state = {
            colours: LOCAL_COLOURS,
            buttonsEnabled: true,
            acceptedCookies: Cookies.get(CONSENT_COOKIE) === "true",
            cubeButtonRotation: 0,
            currentMove: "none",
            windowWidth: window.innerWidth,
            makeMove: this.makeMove,
            resetCube: this.resetCube,
            shuffleCube: this.shuffleCube,
            solveCube: this.solveCube,
            currentButton: "none",
            setAcceptedCookies: this.setAcceptedCookies
        };

    }

    componentDidMount = async () => {
        if (this.state.acceptedCookies) {
            await this.retrieveCube();
        }
        window.onresize = this.onResize
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    render() {
        return <>
            <Engine canvasId="renderCanvas"
                    antialias
                    adaptToDeviceRatio>
                <BabylonScene onPointerDown={() => ++this.mouseDown}
                              onPointerUp={() => --this.mouseDown}
                              pointerMovePredicate={() => !this.mouseDown}
                              beforeRender={this.beforeRenderNewFrame}
                              clearColor={Color4.FromColor3(Color3.FromHexString("#0a100d"))}
                              onSceneMount={e => {
                                  e.scene.onActiveCameraChanged.add(scene => this.camera = scene.getCameraByID("camera") as ArcRotateCamera);
                              }}>
                    {
                        (this.state.acceptedCookies)
                            ? <Buttons windowWidth={this.state.windowWidth}
                                       currentButton={this.state.currentButton}
                                       currentMove={this.state.currentMove}
                                       cubeButtonRotation={this.state.cubeButtonRotation}
                                       buttonsEnabled={this.state?.buttonsEnabled}
                                       resetCube={this.state.resetCube}
                                       shuffleCube={this.state.shuffleCube}
                                       solveCube={this.state.solveCube}
                                       makeMove={this.state.makeMove}
                            />
                            : <CookieDialogue windowWidth={this.state.windowWidth}
                                              setAcceptedCookies={this.state.setAcceptedCookies}/>
                    }
                    <Background spin={!this.state.acceptedCookies}/>
                    <Cube colours={this.state?.colours}/>
                </BabylonScene>
            </Engine>
        </>
    }

    private onResize = () => this.setState({windowWidth: window.innerWidth});

    private setAcceptedCookies = async () => {
        Cookies.set(CONSENT_COOKIE, "true");
        this.setState({acceptedCookies: true});
        await this.retrieveCube();
    };

    private beforeRenderNewFrame = () => {
        // function that controls speed of cube popping into place
        const interpolate = (min: number, current: number, max: number) => {
            return (max - current) / Math.pow((max - min), 2);
        };

        // function that determines the direction (X or Z axis unit vector) which is closest to the camera's angle
        const target = (current: number) => {
            if (current > 0 && current < Math.PI / 2) {
                if (current > (Math.PI / 2 - current)) {
                    return Math.PI / 2;
                } else {
                    return 0;
                }
            } else if (current > Math.PI / 2 && current < Math.PI) {
                if ((current - Math.PI / 2) > (Math.PI - current)) {
                    return Math.PI;
                } else {
                    return Math.PI / 2;
                }
            } else if (current > Math.PI && current < (3 * Math.PI / 2)) {
                if ((current - Math.PI) > ((3 * Math.PI / 2) - current)) {
                    return (3 * Math.PI / 2);
                } else {
                    return Math.PI;
                }
            } else if (current > (3 * Math.PI / 2) && current < (2 * Math.PI)) {
                if ((current - (3 * Math.PI / 2)) > ((2 * Math.PI) - current)) {
                    return (2 * Math.PI);
                } else {
                    return (3 * Math.PI / 2);
                }
            }

            return current;
        };

        // pop cube back into place when cookies are accepted and camera is initialised
        if (this.state.acceptedCookies && this.camera) {
            // convert negative angles into positive, as Babylon uses negative as well but that is not required for this
            const currentAngle = this.camera.alpha > 0 ? ((this.camera.alpha) % (2 * Math.PI)) : (2 * Math.PI) - Math.abs((this.camera.alpha) % (2 * Math.PI));
            const targetAngle = target(currentAngle);

            // set the cube move buttons to pop to the angle that the cube is going to pop to
            this.setState({cubeButtonRotation: (3 * Math.PI / 2) - targetAngle});

            const change = targetAngle - currentAngle;
            // pop the cube in place if there is enough of a meaningful change, otherwise will go on for too long
            if (this.mouseDown === 0 && Math.abs(change) > 0.01) {
                this.camera.alpha += change * interpolate(0, Math.abs(change), Math.PI / 2) / 10;
            }
        }
    };

    private retrieveCube = () => {
        return this.props.communication.authenticateAndGetCube().then(colours => this.setState({colours}));
    };

    private makeMove = (move: string) => {
        this.setState({buttonsEnabled: false, currentMove: move});
        this.props.communication.makeMove(move)
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true, currentMove: "none"}))
    };

    private resetCube = () => {
        this.setState({buttonsEnabled: false, currentButton: "reset"});
        this.props.communication.newCube()
            .then(this.props.communication.getCube)
            .then(colours => this.setState({colours, buttonsEnabled: true, currentButton: "none"}))
    };

    private shuffleCube = () => {
        this.setState({buttonsEnabled: false, currentButton: "shuffle"});
        this.props.communication.shuffleCube()
            .then(this.makeMultipleMoves)
            .then(() => this.setState({buttonsEnabled: true, currentMove: "none", currentButton: "none"}));
    };

    private solveCube = () => {
        this.setState({buttonsEnabled: false, currentButton: "solve"});
        this.props.communication.solveCube()
            .then(moves => this.makeMultipleMoves(moves, 500))
            .then(() => this.setState({buttonsEnabled: true, currentMove: "none", currentButton: "none"}));
    };

    private makeMultipleMoves = async (moves: string[], delayBetweenMoves: number = 0) => {
        while (moves.length > 0) {
            const move = moves.pop() ?? "none";
            this.setState({currentMove: move});
            await new Promise(resolve => setTimeout(resolve, delayBetweenMoves));
            await this.props.communication.makeMove(move!)
                .then(this.props.communication.getCube)
                .then(colours => this.setState({colours}));
        }
    };
}