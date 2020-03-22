package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class ShufflerService {

  private final Logger logger = LoggerFactory.getLogger(ShufflerService.class);

  private final Random random = new Random();
  private final MoveService moveService;

  /**
   * Applies random moves to the state until it is randomly shuffled.
   * Doesn't have to be Transactional as it calls MoveService method which is Transactional itself.
   *
   * @param stateId State ID to look up in repository.
   */
  public void shuffle(Long stateId) {
    logger.info("ShufflerService.shuffle");
    var moves = randomMoves();
    logger.debug("Shuffling with moves: '{}' ", moves);

    for (Move move : moves) {
      this.moveService.makeMove(move, stateId);
    }
  }

  private List<Move> randomMoves() {
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
