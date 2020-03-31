package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.GREEN;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.ORANGE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.RED;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.YELLOW;

@RequiredArgsConstructor
public class CubeValidator {

  private final Logger logger = LoggerFactory.getLogger(CubeValidator.class);

  private final State state;

  public boolean validateCube() {
    var corners = checkCorners(Colour.ORANGE, Colour.WHITE, Colour.BLUE, state)
            && checkCorners(Colour.ORANGE, Colour.WHITE, GREEN, state)
            && checkCorners(Colour.ORANGE, Colour.YELLOW, Colour.BLUE, state)
            && checkCorners(Colour.ORANGE, Colour.YELLOW, GREEN, state)
            && checkCorners(RED, Colour.WHITE, Colour.BLUE, state)
            && checkCorners(RED, Colour.WHITE, GREEN, state)
            && checkCorners(RED, Colour.YELLOW, Colour.BLUE, state)
            && checkCorners(RED, Colour.YELLOW, GREEN, state);
    if (!corners) {
      logger.warn("State has invalid corners.");
      return false;
    }

    var edges = checkEdges(Colour.ORANGE, Colour.BLUE, state)
            && checkEdges(Colour.ORANGE, Colour.WHITE, state)
            && checkEdges(Colour.ORANGE, GREEN, state)
            && checkEdges(Colour.ORANGE, Colour.YELLOW, state)
            && checkEdges(Colour.WHITE, GREEN, state)
            && checkEdges(GREEN, Colour.YELLOW, state)
            && checkEdges(Colour.YELLOW, Colour.BLUE, state)
            && checkEdges(Colour.BLUE, Colour.WHITE, state)
            && checkEdges(RED, Colour.BLUE, state)
            && checkEdges(RED, Colour.WHITE, state)
            && checkEdges(RED, GREEN, state)
            && checkEdges(RED, Colour.YELLOW, state);

    if (!edges) {
      logger.warn("State has invalid edges.");
      return false;
    }

    var middles = checkMiddles();
    if (!middles) {
      logger.warn("State has invalid middles.");
      return false;
    }

    logger.warn("State is valid.");
    return true;
  }

  private boolean checkMiddles() {
    // check all middle colours exist

    var stateCopy = new StateBuilder().setColours(this.state.getColours()).createState();
    var colours = stateCopy.getColours();

    var cubeOrientationSorter = new CubeOrientationSorter(stateCopy);
    cubeOrientationSorter.orientCube(false);

    return colours.get(4) == ORANGE
            && colours.get(22) == RED
            && colours.get(31) == YELLOW
            && colours.get(49) == GREEN;
  }

  private boolean checkEdges(Colour colour1, Colour colour2,
                             State state) {
    // todo this can be more efficient by not having parameters and using global/final variables
    var list = List.of(colour1, colour2);

    var positions = List.of(
            1, 39, // O face
            5, 12,
            7, 48,
            3, 32,
            43, 10, // W G Y B faces
            16, 46,
            52, 34,
            28, 37,
            19, 41, // R face
            21, 14,
            25, 50,
            23, 30
    );

    var maxIndexForLoop = 12 * 2;

    for (int i = 0; i < maxIndexForLoop; i += 2) {
      var first = positions.get(i);
      var second = positions.get(i + 1);

      var firstColour = state.colourAt(first);
      var secondColour = state.colourAt(second);

      if (list.contains(firstColour) && list.contains(secondColour)) {
        return true;
      }
    }

    return false;
  }

  private boolean checkCorners(Colour colour1, Colour colour2, Colour colour3,
                               State state) {
    // todo this can be more efficient by not having parameters and using global/final variables
    var list = List.of(colour1, colour2, colour3);

    var positions = List.of(
            2, 9, 42,
            8, 15, 45,
            0, 29, 36,
            6, 35, 51,
            18, 12, 44,
            24, 17, 47,
            20, 27, 38,
            26, 33, 53
    );

    var maxIndexForLoop = 24;
    for (int i = 0; i < maxIndexForLoop; i += 3) {
      var first = positions.get(i);
      var second = positions.get(i + 1);
      var third = positions.get(i + 2);

      var firstColour = state.colourAt(first);
      var secondColour = state.colourAt(second);
      var thirdColour = state.colourAt(third);
      if (list.contains(firstColour) && list.contains(secondColour) && list.contains(thirdColour)) {
        return true;
      }
    }

    return false;
  }

}
