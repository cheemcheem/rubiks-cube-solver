package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/move")
@RestController
public class MoveRestController {
  private static final Logger logger = LoggerFactory.getLogger(MoveRestController.class);

  /**
   * Allows a user to make a move on their Rubik's cube.
   *
   * @param stateId State ID of user's Rubik's cube, added to request attributes by StateCreatedInterceptor.
   * @param move    Move user has chosen to make.
   * @return Status 204 if move is valid. Bad request otherwise. Not authorised if intercepted by security. Not found if no state exists for user.
   */
  @PutMapping("/{move}")
  public ResponseEntity<?> makeMove(
          @RequestAttribute(Constants.STATE_ATTRIBUTE_KEY) Long stateId,
          @PathVariable Move move
  ) {
    logger.info("MoveRestController.makeMove");
    logger.info("Making move '{}' on state '{}'.", move, stateId);

    return ResponseEntity.noContent().build();
  }
}
