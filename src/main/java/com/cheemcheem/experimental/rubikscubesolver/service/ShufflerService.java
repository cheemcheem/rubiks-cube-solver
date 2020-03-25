package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.utility.MoveMaker;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class ShufflerService {

  private final Logger logger = LoggerFactory.getLogger(ShufflerService.class);

  private final Random random = new Random();
  private final StateService stateService;

  /**
   * Applies random moves to the state until it is randomly shuffled.
   *
   * @param stateId State ID to look up in repository.
   */
  @Transactional
  public void shuffle(Long stateId) {
    logger.info("ShufflerService.shuffle");
    var moves = randomMoves();
    logger.debug("Shuffling with moves: '{}' ", moves);

    var optionalState = this.stateService.getStateById(stateId);

    if (optionalState.isEmpty()) {
      logger.warn("State with id '{}' does not exist.", stateId);
      return;
    }

    var state = optionalState.get();
    var moveMaker = new MoveMaker(state);

    for (Move move : moves) {
      moveMaker.makeMove(move);
    }

    logger.debug("Saving state after shuffle.");
    this.stateService.saveExistingState(state);
  }

  public List<Move> randomMoves() {
    logger.info("ShufflerService.randomMoves");
    var countOfMoves = 20;
    var moves = new ArrayList<Move>();
    var allMoves = Move.values();

    for (int i = 0; i < countOfMoves; i++) {
      moves.add(allMoves[this.random.nextInt(allMoves.length)]);
    }

    return moves;

  }
}
