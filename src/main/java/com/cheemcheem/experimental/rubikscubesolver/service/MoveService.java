package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.utility.MoveMaker;
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
    var moveMaker = new MoveMaker(state);
    moveMaker.makeMove(move);

    logger.debug("Saving state after move.");
    this.stateService.saveExistingState(state);
  }
}
