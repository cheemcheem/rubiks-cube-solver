package com.cheemcheem.experimental.rubikscubesolver.utility.solver;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;

public class BruteForceCubeSolver extends CubeSolver {

  private final int maxDepth = 20;
  private int currentDepth = 0;

  private long count = 0;

  public BruteForceCubeSolver(State state) {
    super(state);
  }

  @Override
  public void solve() {
    var solve = this.solveRecursive();
    logger.info("solve '{}' ", solve);
    logger.info("moves '{}' ", moves);
  }

  private boolean solveRecursive() {
    if (count % 1000000 == 0) {
      logger.info("count '{}' ", count);
    }
    if (this.solved()) {
      return true;
    }

    if (currentDepth == maxDepth) {
      return false;
    }

    for (Move move : Move.values()) {
      this.count++;
      // don't undo last move
      if (this.moves.size() > 0) {
        if (move == inverseMove(this.moves.peek())) {
          continue;
        }
      }
      // don't repeat same move 3 times in a row
      if (this.moves.size() > 1 && move.equals(this.moves.peek()) && move.equals(this.moves.elementAt(this.moves.size() - 2))) {
        continue;
      }
      // don't move entire cube
      if (
              this.moves.size() > 1
                      && !move.equals(this.moves.peek())
                      && !move.equals(this.moves.elementAt(this.moves.size() - 2))
                      && !this.moves.peek().equals(this.moves.elementAt(this.moves.size() - 2))
                      && move.toString().charAt(0) == this.moves.peek().toString().charAt(0)
                      && this.moves.peek().toString().charAt(0) == this.moves.get(this.moves.size() - 2).toString().charAt(0)
      ) {
        continue;
      }

      makeMove(move);
      this.currentDepth++;
      if (solveRecursive()) {
        return true;
      }
      this.currentDepth--;
      this.undoMove();
    }

    return false;
  }
}
