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
    switchPlaces(false, 1, 3, 7, 5);
  }

  private void xLeftDown() {
    switchPlaces(true, 9, 36, 35, 45);
    switchPlaces(true, 12, 39, 32, 48);
    switchPlaces(true, 15, 42, 29, 51);
    switchPlaces(true, 2, 0, 6, 8);
    switchPlaces(true, 1, 3, 7, 5);
  }

  private void xMiddleUp() {
    switchPlaces(false, 10, 37, 34, 46);
    switchPlaces(false, 13, 40, 31, 49);
    switchPlaces(false, 16, 43, 28, 52);
  }

  private void xMiddleDown() {
    switchPlaces(true, 10, 37, 34, 46);
    switchPlaces(true, 13, 40, 31, 49);
    switchPlaces(true, 16, 43, 28, 52);
  }

  private void xRightUp() {
    switchPlaces(false, 11, 38, 33, 47);
    switchPlaces(false, 14, 41, 30, 50);
    switchPlaces(false, 17, 44, 27, 53);
    switchPlaces(false, 18, 20, 26, 24);
    switchPlaces(false, 19, 23, 25, 21);
  }

  private void xRightDown() {
    switchPlaces(true, 11, 38, 33, 47);
    switchPlaces(true, 14, 41, 30, 50);
    switchPlaces(true, 17, 44, 27, 53);
    switchPlaces(true, 18, 20, 26, 24);
    switchPlaces(true, 19, 23, 25, 21);
  }

  private void yTopRight() {
    switchPlaces(false, 9, 18, 27, 0);
    switchPlaces(false, 10, 19, 28, 1);
    switchPlaces(false, 11, 20, 29, 2);
    switchPlaces(false, 42, 44, 38, 36);
    switchPlaces(false, 43, 41, 37, 39);
  }

  private void yTopLeft() {
    switchPlaces(true, 9, 18, 27, 0);
    switchPlaces(true, 10, 19, 28, 1);
    switchPlaces(true, 11, 20, 29, 2);
    switchPlaces(true, 42, 44, 38, 36);
    switchPlaces(true, 43, 41, 37, 39);
  }

  private void yMiddleRight() {
    switchPlaces(false, 12, 21, 30, 3);
    switchPlaces(false, 13, 22, 31, 4);
    switchPlaces(false, 14, 23, 32, 5);
  }

  private void yMiddleLeft() {
    switchPlaces(true, 12, 21, 30, 3);
    switchPlaces(true, 13, 22, 31, 4);
    switchPlaces(true, 14, 23, 32, 5);
  }

  private void yBottomRight() {
    switchPlaces(false, 15, 24, 33, 6);
    switchPlaces(false, 16, 25, 34, 7);
    switchPlaces(false, 17, 26, 35, 8);
    switchPlaces(false, 45, 47, 53, 51);
    switchPlaces(false, 46, 50, 52, 48);
  }

  private void yBottomLeft() {
    switchPlaces(true, 15, 24, 33, 6);
    switchPlaces(true, 16, 25, 34, 7);
    switchPlaces(true, 17, 26, 35, 8);
    switchPlaces(true, 45, 47, 53, 51);
    switchPlaces(true, 46, 50, 52, 48);
  }

  private void zNearClockwise() {
    switchPlaces(false, 42, 18, 47, 8);
    switchPlaces(false, 43, 21, 46, 5);
    switchPlaces(false, 44, 24, 45, 2);
    switchPlaces(false, 9, 11, 17, 15);
    switchPlaces(false, 10, 14, 16, 12);
  }

  private void zNearAntiClockwise() {
    switchPlaces(true, 42, 18, 47, 8);
    switchPlaces(true, 43, 21, 46, 5);
    switchPlaces(true, 44, 24, 45, 2);
    switchPlaces(true, 9, 11, 17, 15);
    switchPlaces(true, 10, 14, 16, 12);
  }

  private void zMiddleClockwise() {
    switchPlaces(false, 39, 19, 50, 7);
    switchPlaces(false, 40, 22, 49, 4);
    switchPlaces(false, 41, 25, 48, 1);
  }

  private void zMiddleAntiClockwise() {
    switchPlaces(true, 39, 19, 50, 7);
    switchPlaces(true, 40, 22, 49, 4);
    switchPlaces(true, 41, 25, 48, 1);
  }

  private void zFarClockwise() {
    switchPlaces(false, 36, 20, 53, 6);
    switchPlaces(false, 37, 23, 52, 3);
    switchPlaces(false, 38, 26, 51, 0);
    switchPlaces(false, 27, 33, 35, 29);
    switchPlaces(false, 28, 30, 34, 32);
  }

  private void zFarAntiClockwise() {
    switchPlaces(true, 36, 20, 53, 6);
    switchPlaces(true, 37, 23, 52, 3);
    switchPlaces(true, 38, 26, 51, 0);
    switchPlaces(true, 27, 33, 35, 29);
    switchPlaces(true, 28, 30, 34, 32);
  }
}
