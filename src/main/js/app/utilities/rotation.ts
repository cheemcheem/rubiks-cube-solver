import {Mesh, Vector3} from "@babylonjs/core";
import {Space} from "babylonjs";

export const NO_ROTATION = new Vector3(0, 0, 0);
export const X_ROTATION = new Vector3(1, 0, 0);
export const Y_ROTATION = new Vector3(0, 1, 0);
export const Z_ROTATION = new Vector3(0, 0, 1);
export const rotate = (rotationAxis: Vector3, parent: Mesh) => {
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