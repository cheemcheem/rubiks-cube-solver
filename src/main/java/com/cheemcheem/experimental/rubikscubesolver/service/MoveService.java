package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MoveService {
  private static final Logger logger = LoggerFactory.getLogger(MoveService.class);

  private final StateService stateService;

  @Transactional
  public void makeMove(Move move, Long stateId) {
    logger.info("MoveService.makeMove");
    logger.debug("Make move '{}' on state with id '{}'.", move, stateId);
    var optionalState = this.stateService.getStateById(stateId);

    if (optionalState.isEmpty()) {
      logger.warn("State with id '{}' does not exist.", stateId);
      return;
    }

    var state = optionalState.get();
    switch (move) {
      case X_LEFT_UP:
        xLeftUp(state);
        break;
      case X_LEFT_DOWN:
        xLeftDown(state);
        break;
      case X_MIDDLE_UP:
        xMiddleUp(state);
        break;
      case X_MIDDLE_DOWN:
        xMiddleDown(state);
        break;
      case X_RIGHT_UP:
        xRightUp(state);
        break;
      case X_RIGHT_DOWN:
        xRightDown(state);
        break;
      case Y_TOP_RIGHT:
        yTopRight(state);
        break;
      case Y_TOP_LEFT:
        yTopLeft(state);
        break;
      case Y_MIDDLE_RIGHT:
        yMiddleRight(state);
        break;
      case Y_MIDDLE_LEFT:
        yMiddleLeft(state);
        break;
      case Y_BOTTOM_RIGHT:
        yBottomRight(state);
        break;
      case Y_BOTTOM_LEFT:
        yBottomLeft(state);
        break;
      case Z_NEAR_CLOCKWISE:
        zNearClockwise(state);
        break;
      case Z_NEAR_ANTICLOCKWISE:
        zNearAntiClockwise(state);
        break;
      case Z_MIDDLE_CLOCKWISE:
        zMiddleClockwise(state);
        break;
      case Z_MIDDLE_ANTICLOCKWISE:
        zMiddleAntiClockwise(state);
        break;
      case Z_FAR_CLOCKWISE:
        zFarClockwise(state);
        break;
      case Z_FAR_ANTICLOCKWISE:
        zFarAntiClockwise(state);
        break;
    }

    logger.debug("Saving state after move.");
    this.stateService.saveExistingState(state);
  }

  /**
   * Switches the colour at the given indices in the state around.
   * E.g 9,10,11 would replace index 10 with 9's colour, index 11 with 10's colour, and index 9 with 11's colour.
   * <p>
   * Can also reverse the order using the reversed param.
   *
   * @param state    State to get colour list from.
   * @param reversed Indicates if it should replace the colours in the reverse order.
   * @param indices  Indices from the state.
   * @throws IndexOutOfBoundsException if any of the indices are greater than 53, or if the indices array is empty.
   */
  private void switchPlaces(State state, boolean reversed, int... indices) {
    var colours = state.getColours();

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

  private void xLeftUp(State state) {
    switchPlaces(state, false, 9, 36, 35, 45);
    switchPlaces(state, false, 12, 39, 32, 48);
    switchPlaces(state, false, 15, 42, 29, 51);
    switchPlaces(state, false, 2, 0, 6, 8);
    switchPlaces(state, false, 2, 3, 7, 5);
  }

  private void xLeftDown(State state) {
    switchPlaces(state, true, 9, 36, 35, 45);
    switchPlaces(state, true, 12, 39, 32, 48);
    switchPlaces(state, true, 15, 42, 29, 51);
    switchPlaces(state, true, 2, 0, 6, 8);
    switchPlaces(state, true, 2, 3, 7, 5);
  }

  private void xMiddleUp(State state) {

  }

  private void xMiddleDown(State state) {

  }

  private void xRightUp(State state) {

  }

  private void xRightDown(State state) {

  }

  private void yTopRight(State state) {

  }

  private void yTopLeft(State state) {

  }

  private void yMiddleRight(State state) {

  }

  private void yMiddleLeft(State state) {

  }

  private void yBottomRight(State state) {

  }

  private void yBottomLeft(State state) {

  }

  private void zNearClockwise(State state) {

  }

  private void zNearAntiClockwise(State state) {

  }

  private void zMiddleClockwise(State state) {

  }

  private void zMiddleAntiClockwise(State state) {

  }

  private void zFarClockwise(State state) {

  }

  private void zFarAntiClockwise(State state) {

  }

}
