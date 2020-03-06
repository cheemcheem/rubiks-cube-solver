import {ArcRotateCamera, Color3, Color4, Mesh, PointLight, Space, StandardMaterial, Vector3} from "babylonjs";
import {NO_ROTATION, X_ROTATION, Y_ROTATION, Z_ROTATION} from "./rotation";
import {Scene} from "babylonjs/scene";
import {GREEN, YELLOW} from "./colour";
import {Engine} from "babylonjs/Engines/engine";

export class SceneHandler {

    private readonly canvas: HTMLCanvasElement;
    private readonly scene: Scene;
    private readonly engine: Engine;

    constructor(canvas: HTMLCanvasElement, scene: Scene, engine: Engine) {
        this.canvas = canvas;
        this.scene = scene;
        this.engine = engine;
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
    };

    public startEngine = () => {
        this.engine!.runRenderLoop(() => {
            if (this.scene) {
                this.scene!.render();
            }
        });
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
        const face1 = Mesh.CreatePlane(`corner${String(id)}`, 1, scene);
        const material1 = new StandardMaterial(`material${String(id)}`, scene);
        material1.diffuseColor = new Color3(0.4, 0.4, 0.4);
        material1.specularColor = new Color3(0.7, 0.7, 0.7);
        material1.emissiveColor = colour;
        face1.enableEdgesRendering();
        face1.edgesWidth = 2.0;
        face1.edgesColor = Color4.FromColor3(Color3.Black());
        face1.material = material1;
        return face1;
    };

    private createCamera = () => {
        // scene.clearColor = new Color4(100, 100, 100);

        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera("Camera", 0, -50, 10, new Vector3(0, 5, -10), this.scene!);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(this.canvas!, true);
    };

    private createLight = () => {
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new PointLight("light", new Vector3(5, 5, -5), this.scene!);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1;
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
        const ground = Mesh.CreateTiledGround("ground", -60, -60, 60, 60, {w: 30, h: 30}, {w: 1, h: 1}, this.scene!);
        const groundMaterial = new StandardMaterial(`material-ground`, this.scene!);
        groundMaterial.diffuseColor = new Color3(0.4, 0.5, 0.4);
        groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        groundMaterial.emissiveColor = GREEN;
        ground.enableEdgesRendering();
        ground.edgesWidth = 8.0;
        ground.edgesColor = Color4.FromColor3(Color3.Black());
        ground.material = groundMaterial;
        ground.position = new Vector3(0, -10, 0);
    };
}