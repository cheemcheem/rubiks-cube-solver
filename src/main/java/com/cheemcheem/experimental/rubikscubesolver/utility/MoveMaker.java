package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MoveMaker {
  private final State state;

  public void makeMove(Move move) {
    switch (move) {
      case X_LEFT_UP:
        xLeftUp();
        break;
      case X_LEFT_DOWN:
        xLeftDown();
        break;
      case X_MIDDLE_UP:
        xMiddleUp();
        break;
      case X_MIDDLE_DOWN:
        xMiddleDown();
        break;
      case X_RIGHT_UP:
        xRightUp();
        break;
      case X_RIGHT_DOWN:
        xRightDown();
        break;
      case Y_TOP_RIGHT:
        yTopRight();
        break;
      case Y_TOP_LEFT:
        yTopLeft();
        break;
      case Y_MIDDLE_RIGHT:
        yMiddleRight();
        break;
      case Y_MIDDLE_LEFT:
        yMiddleLeft();
        break;
      case Y_BOTTOM_RIGHT:
        yBottomRight();
        break;
      case Y_BOTTOM_LEFT:
        yBottomLeft();
        break;
      case Z_NEAR_CLOCKWISE:
        zNearClockwise();
        break;
      case Z_NEAR_ANTICLOCKWISE:
        zNearAntiClockwise();
        break;
      case Z_MIDDLE_CLOCKWISE:
        zMiddleClockwise();
        break;
      case Z_MIDDLE_ANTICLOCKWISE:
        zMiddleAntiClockwise();
        break;
      case Z_FAR_CLOCKWISE:
        zFarClockwise();
        break;
      case Z_FAR_ANTICLOCKWISE:
        zFarAntiClockwise();
        break;
    }
  }

  /**
   * Switches the colour at the given indices in the state around.
   * E.g 9,10,11 would replace index 10 with 9's colour, index 11 with 10's colour, and index 9 with 11's colour.
   * <p>
   * Can also reverse the order using the reversed param.
   *
   * @param reversed Indicates if it should replace the colours in the reverse order.
   * @param indices  Indices from the state .
   * @throws IndexOutOfBoundsException if any of the indices are greater than 53, or if the indices array is empty.
   */
  private void switchPlaces(boolean reversed, int... indices) {
    var colours = this.state.getColours();

    if (reversed) {
      var firstColour = colours.get(indices[0]);

      for (int i = 0; i < indices.length - 1; i++) {
        var currentIndex = indices[i];
        var nextColour = colours.get(indices[i + 1]);
        colours.set(currentIndex, nextColour);
      }
      var lastIndex = indices[indices.length - 1];
      colours.set(lastIndex, firstColour);
    } else {
      var lastColour = colours.get(indices[indices.length - 1]);

      for (int i = indices.length - 1; i > 0; i--) {
        var currentIndex = indices[i];
        var previousColour = colours.get(indices[i - 1]);
        colours.set(currentIndex, previousColour);
      }
      var firstIndex = indices[0];
      colours.set(firstIndex, lastColour);
    }


  }

  private void xLeftUp() {
    switchPlaces(false, 9, 36, 35, 45);
    switchPlaces(false, 12, 39, 32, 48);
    switchPlaces(false, 15, 42, 29, 51);
    switchPlaces(false, 2, 0, 6, 8);
    switchPlaces(false, 2, 3, 7, 5);
  }

  private void xLeftDown() {
    switchPlaces(true, 9, 36, 35, 45);
    switchPlaces(true, 12, 39, 32, 48);
    switchPlaces(true, 15, 42, 29, 51);
    switchPlaces(true, 2, 0, 6, 8);
    switchPlaces(true, 2, 3, 7, 5);
  }

  private void xMiddleUp() {

  }

  private void xMiddleDown() {

  }

  private void xRightUp() {

  }

  private void xRightDown() {

  }

  private void yTopRight() {

  }

  private void yTopLeft() {

  }

  private void yMiddleRight() {

  }

  private void yMiddleLeft() {

  }

  private void yBottomRight() {

  }

  private void yBottomLeft() {

  }

  private void zNearClockwise() {

  }

  private void zNearAntiClockwise() {

  }

  private void zMiddleClockwise() {

  }

  private void zMiddleAntiClockwise() {

  }

  private void zFarClockwise() {

  }

  private void zFarAntiClockwise() {

  }
}
