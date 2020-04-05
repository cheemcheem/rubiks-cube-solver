package com.cheemcheem.experimental.rubikscubesolver.controller;

import com.cheemcheem.experimental.rubikscubesolver.service.SolverService;
import com.cheemcheem.experimental.rubikscubesolver.utility.Constants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/solve")
@RequiredArgsConstructor
@RestController
public class SolveRestController {
  private static final Logger logger = LoggerFactory.getLogger(SolveRestController.class);

  private final SolverService solverService;

  /**
   * Allows a user to solve their Rubik's cube.
   *
   * @param stateId State ID of user's Rubik's cube, added to request attributes by StateCreatedInterceptor.
   * @return Status 204 if user had a state.  Not found if no state exists for user.
   */
  @GetMapping
  public ResponseEntity<?> solveMoves(
          @RequestAttribute(Constants.STATE_ATTRIBUTE_KEY) Long stateId
  ) {
    logger.info("SolveRestController.solveMoves");
    var moves = this.solverService.solve(stateId);
    logger.info("Solved cube.");
    return ResponseEntity.of(moves);
  }
}

