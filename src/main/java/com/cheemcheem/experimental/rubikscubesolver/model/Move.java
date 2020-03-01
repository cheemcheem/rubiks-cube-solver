package com.cheemcheem.experimental.rubikscubesolver.model;

/**
 * List of possible moves that can be made on a Rubik's cube.
 * <p>
 * <ol>
 * <li>
 * The first descriptor (X,Y,Z) indicates axis of movement. For example, X indicates that a slice of the cube will be rotating around the x-axis.
 *  * </li>
 *  * <li>
 *  * The second descriptor (LEFT,RIGHT,TOP,BOTTOM,NEAR,FAR,MIDDLE) indicates which slice will be rotated around the chosen axis. For example, X_LEFT indicates that the left face of the cube will be rotating.
 *  * </li>
 *  * <li>
 *  * The third descriptor (UP,DOWN,RIGHT,LEFT,CLOCKWISE,ANTICLOCKWISE) indicates which direction the slice of the cube will be pivoting. For example, X_LEFT_UP indicates that the left face of the cube will be rotating upwards from the perspective of looking at the front face.
 *  * </li>
 * </ol>
 *
 * @see State#getColours()
 */
public enum Move {
  X_LEFT_UP,
  X_LEFT_DOWN,
  X_MIDDLE_UP,
  X_MIDDLE_DOWN,
  X_RIGHT_UP,
  X_RIGHT_DOWN,
  Y_TOP_RIGHT,
  Y_TOP_LEFT,
  Y_MIDDLE_RIGHT,
  Y_MIDDLE_LEFT,
  Y_BOTTOM_RIGHT,
  Y_BOTTOM_LEFT,
  Z_NEAR_CLOCKWISE,
  Z_NEAR_ANTICLOCKWISE,
  Z_MIDDLE_CLOCKWISE,
  Z_MIDDLE_ANTICLOCKWISE,
  Z_FAR_CLOCKWISE,
  Z_FAR_ANTICLOCKWISE
}
