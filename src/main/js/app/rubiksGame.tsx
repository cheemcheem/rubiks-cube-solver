import * as React from 'react';
import RubiksScene, {SceneEventArgs} from './rubiksScene';
import {Scene} from "babylonjs/scene";
import {ArcRotateCamera, Color3, Mesh, PointLight, Space, StandardMaterial, Vector3} from 'babylonjs';
import * as Cookie from "js-cookie";
import {AUTH_URL, GET_URL, MOVE_URL, MOVES, NEW_URL} from "./constants";

export default class RubiksGame extends React.Component<{}, {}> {
    private readonly RED = Color3.Red().scale(0.7);
    private readonly GREEN = Color3.Green().scale(0.5);
    private readonly BLUE = Color3.Blue().scale(0.5);
    private readonly WHITE = Color3.White().scale(0.9);
    private readonly ORANGE = Color3.Lerp(Color3.Red(), Color3.Yellow(), 0.5).scale(0.9);
    private readonly YELLOW = Color3.Yellow().scale(0.9);
    private readonly COLOUR_MAP = new Map([["RED", this.RED], ["GREEN", this.GREEN], ["BLUE", this.BLUE], ["WHITE", this.WHITE], ["ORANGE", this.ORANGE], ["YELLOW", this.YELLOW]]);

    private readonly NO_ROTATION = new Vector3(0, 0, 0);
    private readonly X_ROTATION = new Vector3(1, 0, 0);
    private readonly Y_ROTATION = new Vector3(0, 1, 0);
    private readonly Z_ROTATION = new Vector3(0, 0, 1);
    fetchX = (input: RequestInfo, init?: RequestInit) => {
        const xsrfCookie = this.getXSRFHeader();
        return fetch(input, {...init, ...xsrfCookie});
    };

    getXSRFHeader() {
        return {headers: {"X-XSRF-TOKEN": String(Cookie.get("XSRF-TOKEN"))}};
    }

    authenticateAndGetCube() {
        const transparentLog = <U extends any>(x: U) => {
            console.debug(x);
            return x
        };
        const createIfNotExist = (response: Response) => {
            if (response.status === 404) {
                return this.fetchX(NEW_URL, {method: "POST"})
                    .then(transparentLog)
                    .then(() => this.fetchX(GET_URL))
                    .then(response => {
                        if (response.status === 404) {
                            console.debug(response);
                            throw new Error("Failed to create a new cube.");
                        }
                        return response;
                    })
            } else {
                return response;
            }
        };

        const stringToColour = (value: string) => {
            const lookup = this.COLOUR_MAP.get(value);
            if (lookup === undefined) {
                throw new Error(`Could not find string '${value}' in the colour mappings '${this.COLOUR_MAP}'`);
            }
            return lookup;
        };

        return this.fetchX(AUTH_URL)
            .then(transparentLog)
            .then(() => this.fetchX(GET_URL))
            .then(createIfNotExist)
            .then(transparentLog)
            .then(() => this.fetchX(MOVE_URL + MOVES.X.LEFT.UP, {method: "PUT"}))
            .then(() => this.fetchX(GET_URL))
            .then(createIfNotExist)
            .then(response => response.text())
            .then(transparentLog)
            .then(colours => Array.from<string>(JSON.parse(colours).colours).map(stringToColour))
            .then(transparentLog)
            .catch(err => {
                transparentLog(err);
                return this.localColours;
            })
            ;
    }

    private readonly localColours = [
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.ORANGE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.WHITE,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.RED,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.YELLOW,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.BLUE,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN,
        this.GREEN
    ];

    onSceneMount = (e: SceneEventArgs) => {
        const {canvas, scene, engine} = e;

        // scene.clearColor = new Color4(100, 100, 100);

        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera("Camera", 0, -50, 10, new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new PointLight("light1", new Vector3(5, 5, -5), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = Mesh.CreateGround("ground1", 60, 60, 20, scene);
        ground.position = new Vector3(0, -10, 0);

        this.authenticateAndGetCube()
            .then(colours => this.setColours(colours, scene));

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    };

    setColours = (colours: Color3[], scene: any) => {
        this.corner(colours[44], colours[11], colours[18], scene, new Vector3(1, 1, -1), this.NO_ROTATION);
        this.corner(colours[2], colours[9], colours[42], scene, new Vector3(-1, 1, -1), this.Z_ROTATION);
        this.corner(colours[24], colours[17], colours[47], scene, new Vector3(1, -1, -1), this.Z_ROTATION.scale(-1));
        this.corner(colours[45], colours[15], colours[8], scene, new Vector3(-1, -1, -1), this.Z_ROTATION.scale(2));
        this.corner(colours[38], colours[20], colours[27], scene, new Vector3(1, 1, 1), this.Y_ROTATION.scale(3));
        this.corner(colours[36], colours[29], colours[0], scene, new Vector3(-1, 1, 1), this.Y_ROTATION.scale(2));
        this.corner(colours[53], colours[33], colours[26], scene, new Vector3(1, -1, 1), this.X_ROTATION.scale(2));
        this.corner(colours[35], colours[51], colours[6], scene, new Vector3(-1, -1, 1), this.Y_ROTATION.scale(2).add(this.X_ROTATION));
    };

    private corner = (colour1: Color3, colour2: Color3, colour3: Color3, scene: Scene, position: Vector3, rotationAxis: Vector3) => {
        const face1 = RubiksGame.face(1, scene, colour1);
        const face2 = RubiksGame.face(2, scene, colour2);
        const face3 = RubiksGame.face(3, scene, colour3);

        face1.rotate(Vector3.Right(), Math.PI / 2, Space.LOCAL);
        face2.rotate(Vector3.Up(), 0, Space.LOCAL);
        face3.rotate(Vector3.Down(), Math.PI / 2, Space.LOCAL);

        const parent = Mesh.CreateBox(`parent`, 1, scene);
        parent.position = position;
        face1.parent = parent;
        face2.parent = parent;
        face3.parent = parent;
        parent.isVisible = false;

        face1.position.y = 0.5;
        face2.position.z = -0.5;
        face3.position.x = 0.5;

        if (rotationAxis.x) {
            parent.rotate(Vector3.Right(), rotationAxis.x * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.y) {
            parent.rotate(Vector3.Up(), rotationAxis.y * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.z) {
            parent.rotate(Vector3.Forward(), rotationAxis.z * Math.PI / 2, Space.LOCAL);
        }

        return parent;
    };

    private static face(id: any, scene: Scene, colour: Color3) {
        const face1 = Mesh.CreatePlane(`corner${String(id)}`, 1, scene);
        const material1 = new StandardMaterial(`material${String(id)}`, scene);
        material1.diffuseColor = new Color3(0.4, 0.4, 0.4);
        material1.specularColor = new Color3(0.7, 0.7, 0.7);
        material1.emissiveColor = colour;
        face1.material = material1;
        return face1;
    }

    render() {
        return (
            <RubiksScene onSceneMount={this.onSceneMount}/>
        )
    }
}

