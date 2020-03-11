import {ArcRotateCamera, Color3, Color4, HemisphericLight, Mesh, Space, StandardMaterial, Vector3} from "babylonjs";
import {AdvancedDynamicTexture, Button, StackPanel} from "babylonjs-gui"
import {NO_ROTATION, X_ROTATION, Y_ROTATION, Z_ROTATION} from "./rotation";
import {Scene} from "babylonjs/scene";
import {GREEN, YELLOW} from "./colour";
import {Engine} from "babylonjs/Engines/engine";
import {SceneEventArgs} from "../rubiksScene";
import {Communication} from "./Communication";
import {transparentLog} from "./logging";

export class SceneHandler {

    private readonly canvas: HTMLCanvasElement;
    private readonly scene: Scene;
    private readonly engine: Engine;
    private ground!: Mesh;
    private communication: Communication;

    constructor(sceneEventArgs: SceneEventArgs) {
        const {canvas, scene, engine} = sceneEventArgs;
        this.canvas = canvas;
        this.scene = scene;
        this.engine = engine;
        this.communication = new Communication();
    }

    // todo extract colours, edges, centers to another class if needed
    setColours = (colours: Color3[]) => {
        //@formatter:off
        this.middle(colours[13], this.scene, new Vector3( 0,  0,-1), X_ROTATION.scale(-1));
        this.middle(colours[ 4], this.scene, new Vector3(-1,  0, 0), Z_ROTATION);
        this.middle(colours[31], this.scene, new Vector3( 0,  0, 1), X_ROTATION);
        this.middle(colours[22], this.scene, new Vector3( 1,  0, 0), Z_ROTATION.scale(-1));
        this.middle(colours[40], this.scene, new Vector3( 0,  1, 0), NO_ROTATION);
        this.middle(colours[49], this.scene, new Vector3( 0, -1, 0), X_ROTATION.scale(2));

        this.edge(colours[43], colours[10], this.scene, new Vector3( 0,  1, -1), NO_ROTATION);
        this.edge(colours[37], colours[28], this.scene, new Vector3( 0,  1,  1), Y_ROTATION.scale( 2));
        this.edge(colours[39], colours[ 1], this.scene, new Vector3(-1,  1,  0), Y_ROTATION);
        this.edge(colours[41], colours[19], this.scene, new Vector3( 1,  1,  0), Y_ROTATION.scale(-1));
        this.edge(colours[46], colours[16], this.scene, new Vector3( 0, -1, -1), X_ROTATION.scale( 2).add(Y_ROTATION.scale( 2)));
        this.edge(colours[52], colours[34], this.scene, new Vector3( 0, -1,  1), X_ROTATION.scale( 2));
        this.edge(colours[48], colours[ 7], this.scene, new Vector3(-1, -1,  0), X_ROTATION.scale( 2).add(Y_ROTATION));
        this.edge(colours[50], colours[25], this.scene, new Vector3( 1, -1,  0), X_ROTATION.scale( 2).add(Y_ROTATION.scale(-1)));
        this.edge(colours[ 5], colours[12], this.scene, new Vector3(-1,  0, -1), Z_ROTATION);
        this.edge(colours[ 3], colours[32], this.scene, new Vector3( -1, 0,  1), Y_ROTATION.scale( 2).add(Z_ROTATION.scale(-1)));
        this.edge(colours[30], colours[23], this.scene, new Vector3( 1,  0,  1), X_ROTATION.add(Y_ROTATION.scale(-1)));
        this.edge(colours[21], colours[14], this.scene, new Vector3( 1,  0, -1), Z_ROTATION.scale(-1));

        this.corner(colours[44], colours[11], colours[18], this.scene, new Vector3( 1,  1, -1), NO_ROTATION);
        this.corner(colours[ 2], colours[ 9], colours[42], this.scene, new Vector3(-1,  1, -1), Z_ROTATION);
        this.corner(colours[24], colours[17], colours[47], this.scene, new Vector3( 1, -1, -1), Z_ROTATION.scale(-1));
        this.corner(colours[45], colours[15], colours[ 8], this.scene, new Vector3(-1, -1, -1), Z_ROTATION.scale( 2));
        this.corner(colours[38], colours[20], colours[27], this.scene, new Vector3( 1,  1,  1), Y_ROTATION.scale( 3));
        this.corner(colours[36], colours[29], colours[ 0], this.scene, new Vector3(-1,  1,  1), Y_ROTATION.scale( 2));
        this.corner(colours[53], colours[33], colours[26], this.scene, new Vector3( 1, -1,  1), X_ROTATION.scale( 2));
        this.corner(colours[35], colours[51], colours[ 6], this.scene, new Vector3(-1, -1,  1), Y_ROTATION.scale( 2).add(X_ROTATION));
        //@formatter:on
    };

    public createInitialObjects = () => {
        this.createCamera();
        this.createLight();
        this.createLightObj();
        this.createGround();
        try {
            this.addGUIElement();
        } catch (e) {
            transparentLog(e);
            transparentLog(e.stackTrace);
        }
    };

    public startEngine = () => {
        this.engine.runRenderLoop(() => this.scene ? this.scene.render() : null);
        this.communication.authenticateAndGetCube().then(this.setColours);
    };

    private addGUIElement = () => {
        transparentLog(this.scene.getEngine());

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("help", true, this.scene);
        const panel = new StackPanel();
        // panel.width = 1;
        // panel.height = 1;
        // panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        // panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(panel);

        const addButton = (text: string, parent: any) => {
            const button = Button.CreateSimpleButton(`makeMove${text}`, text);
            button.textBlock!.fontSize = 80;
            button.width = "600px";
            button.height = "160px";
            button.scaleX = 0.25;
            button.scaleY = 0.25;
            button.color = "white";
            button.background = "green";
            button.onPointerClickObservable.add((_) => {
                this.communication.makeMove(text).then(transparentLog).then(() => window.location.reload());
            });
            parent.addControl(button);
        };

        addButton("X_LEFT_UP", panel);
        addButton("X_LEFT_DOWN", panel);
    };

    private rotate = (rotationAxis: Vector3, parent: Mesh) => {
        if (rotationAxis.x) {
            parent.rotate(Vector3.Right(), rotationAxis.x * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.y) {
            parent.rotate(Vector3.Up(), rotationAxis.y * Math.PI / 2, Space.LOCAL);
        }
        if (rotationAxis.z) {
            parent.rotate(Vector3.Forward(), rotationAxis.z * Math.PI / 2, Space.LOCAL);
        }
    };

    private middle = (colour1: Color3, scene: Scene, position: Vector3, rotationAxis: Vector3) => {
        const face1 = this.face(1, scene, colour1);

        face1.rotate(Vector3.Right(), Math.PI / 2, Space.LOCAL);

        const parent = Mesh.CreateBox(`parent`, 1, scene);
        parent.position = position;
        face1.parent = parent;
        parent.isVisible = false;

        face1.position.y = 0.5;

        this.rotate(rotationAxis, parent);

        return parent;
    };

    private edge = (colour1: Color3, colour2: Color3, scene: Scene, position: Vector3, rotationAxis: Vector3) => {
        const face1 = this.face(1, scene, colour1);
        const face2 = this.face(2, scene, colour2);

        face1.rotate(Vector3.Right(), Math.PI / 2, Space.LOCAL);
        face2.rotate(Vector3.Up(), 0, Space.LOCAL);

        const parent = Mesh.CreateBox(`parent`, 1, scene);
        parent.position = position;
        face1.parent = parent;
        face2.parent = parent;
        parent.isVisible = false;

        face1.position.y = 0.5;
        face2.position.z = -0.5;

        this.rotate(rotationAxis, parent);

        return parent;
    };

    private corner = (colour1: Color3, colour2: Color3, colour3: Color3, scene: Scene, position: Vector3, rotationAxis: Vector3) => {
        const face1 = this.face(1, scene, colour1);
        const face2 = this.face(2, scene, colour2);
        const face3 = this.face(3, scene, colour3);

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

        this.rotate(rotationAxis, parent);

        return parent;
    };

    private face = (id: any, scene: Scene, colour: Color3) => {

        const faceMaterial = new StandardMaterial(`material${String(id)}`, scene);
        faceMaterial.diffuseColor = new Color3(0.4, 0.4, 0.4);
        faceMaterial.specularColor = new Color3(0.7, 0.7, 0.7);
        faceMaterial.emissiveColor = colour;

        const face = Mesh.CreatePlane(`corner${String(id)}`, 1, scene);
        face.enableEdgesRendering();
        face.edgesWidth = 2.0;
        face.edgesColor = Color4.FromColor3(Color3.Black());
        face.material = faceMaterial;

        return face;
    };

    private createCamera = () => {
        const camera = new ArcRotateCamera("Camera", 0, -50, 10, new Vector3(0, 5, -10), this.scene!);

        camera.setTarget(Vector3.Zero());

        camera.upperRadiusLimit = 20;
        camera.lowerRadiusLimit = 10;
        camera.upperBetaLimit = 2 * Math.PI / 3;
        camera.lowerBetaLimit = Math.PI / 3;
        camera.attachControl(this.canvas!, true);

        document.cookie.split(";").filter(c => c.trim().startsWith("camera.")).forEach(c => {
            transparentLog(c);
            const [axis, value] = c.split("=");
            if (axis.endsWith("alpha")) {
                camera.alpha = Number(value);
            }
            if (axis.endsWith("beta")) {
                camera.beta = Number(value);
            }
            if (axis.endsWith("radius")) {
                camera.radius = Number(value);
            }
        });
        camera.onViewMatrixChangedObservable.add(() => {
            this.ground.rotation = Vector3.Up().scale(-camera.alpha);
            document.cookie = `camera.alpha=${camera.alpha}`;
            document.cookie = `camera.beta=${camera.beta}`;
            document.cookie = `camera.radius=${camera.radius}`;
        });
    };

    private createLight = () => {
        // const light = new PointLight("light", new Vector3(5, 5, -5), this.scene!);
        const light = new HemisphericLight("light", new Vector3(5, 5, -5), this.scene!);

        light.intensity = 0.5;
    };

    private createLightObj = () => {
        const lightObj = Mesh.CreateSphere("lightObj", 20, 3, this.scene!);
        lightObj.position = new Vector3(7, 7, -7);

        const lightObjMaterial = new StandardMaterial(`material-lightObj`, this.scene!);
        lightObjMaterial.diffuseColor = new Color3(1, 1, 1);
        lightObjMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        lightObjMaterial.ambientColor = new Color3(1, 1, 1);
        lightObjMaterial.emissiveColor = YELLOW;
        lightObj.material = lightObjMaterial;
    };

    private createGround = () => {

        const groundMaterial = new StandardMaterial(`material-ground`, this.scene!);
        groundMaterial.diffuseColor = new Color3(0.4, 0.5, 0.4);
        groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        groundMaterial.emissiveColor = GREEN;

        const ground = Mesh.CreateTiledGround("ground", -60, -60, 60, 60, {w: 30, h: 30}, {w: 1, h: 1}, this.scene!);
        ground.enableEdgesRendering();
        ground.edgesWidth = 8.0;
        ground.edgesColor = Color4.FromColor3(Color3.Black());
        ground.material = groundMaterial;

        ground.position = new Vector3(0, -10, 0);

        this.ground = ground;

    };
}