package com.cheemcheem.experimental.rubikscubesolver.service;


import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ValidatorService {

  private static final Logger logger = LoggerFactory.getLogger(ValidatorService.class);

  private final StateService stateService;

  /**
   * Checks that all of the colours of the cube are in valid positions.
   * I.e. all of the pieces of a normal rubiks cube are present in this cube.
   * <p>
   * Transactional annotation required due to lazy loading of state.get().
   *
   * @param stateId State ID to retrieve state from StateService.
   * @return Optional.empty() if no State exists for stateId. Optional.of(true) if valid, Optional.of(false) if invalid.
   */
  @Transactional
  public Optional<Boolean> validateState(Long stateId) {
    var optionalState = stateService.getStateById(stateId);

    if (logger.isDebugEnabled()) {
      if (optionalState.isPresent()) {
        logger.debug("State found '{}' for id '{}'.", optionalState, stateId);
      } else {
        logger.debug("State not found for id '{}'.", stateId);
      }
    }

    if (optionalState.isEmpty()) {
      return Optional.empty();
    }

    var state = optionalState.get();
    var corners = checkCorners(Colour.ORANGE, Colour.WHITE, Colour.BLUE, state)
            && checkCorners(Colour.ORANGE, Colour.WHITE, Colour.GREEN, state)
            && checkCorners(Colour.ORANGE, Colour.YELLOW, Colour.BLUE, state)
            && checkCorners(Colour.ORANGE, Colour.YELLOW, Colour.GREEN, state)
            && checkCorners(Colour.RED, Colour.WHITE, Colour.BLUE, state)
            && checkCorners(Colour.RED, Colour.WHITE, Colour.GREEN, state)
            && checkCorners(Colour.RED, Colour.YELLOW, Colour.BLUE, state)
            && checkCorners(Colour.RED, Colour.YELLOW, Colour.GREEN, state);
    if (!corners) {
      logger.warn("State has invalid corners.");
      return Optional.of(false);
    }

    var edges = checkEdges(Colour.ORANGE, Colour.BLUE, state)
            && checkEdges(Colour.ORANGE, Colour.WHITE, state)
            && checkEdges(Colour.ORANGE, Colour.GREEN, state)
            && checkEdges(Colour.ORANGE, Colour.YELLOW, state)
            && checkEdges(Colour.WHITE, Colour.GREEN, state)
            && checkEdges(Colour.GREEN, Colour.YELLOW, state)
            && checkEdges(Colour.YELLOW, Colour.BLUE, state)
            && checkEdges(Colour.BLUE, Colour.WHITE, state)
            && checkEdges(Colour.RED, Colour.BLUE, state)
            && checkEdges(Colour.RED, Colour.WHITE, state)
            && checkEdges(Colour.RED, Colour.GREEN, state)
            && checkEdges(Colour.RED, Colour.YELLOW, state);

    if (!edges) {
      logger.warn("State has invalid edges.");
      return Optional.of(false);
    }

    var middles = checkMiddles();
    if (!middles) {
      logger.warn("State has invalid middles.");
      return Optional.of(false);
    }

    logger.info("State valid.");
    return Optional.of(true);
  }

  private boolean checkMiddles() {
    // check all middle colours exist

    // check all middle colours are in correct place relative to each other
    return true;
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

    var maxIndexForLoop = 8 * 3;
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
