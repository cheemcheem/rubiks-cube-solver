package com.cheemcheem.experimental.rubikscubesolver.utility.solver;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.utility.MoveMaker;
import com.cheemcheem.experimental.rubikscubesolver.utility.StateBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

public abstract class CubeSolver {
  protected final Logger logger = LoggerFactory.getLogger(this.getClass());
  protected final Stack<Move> moves = new Stack<>();
  protected final State state;
  private final MoveMaker moveMaker;

  protected CubeSolver(State state) {
    this.state = new StateBuilder()
            .setColours(state.getColours())
            .setHistory(state.getHistory())
            .createState();
    this.moveMaker = new MoveMaker(this.state);
  }

  public static boolean solved(State state) {
    var startOfFaces = List.of(0, 9, 18, 27, 36, 45);
    var colours = state.getColours();
    for (Integer startOfFace : startOfFaces) {
      var firstColour = colours.get(startOfFace);
      for (int i = 1; i < 9; i++) {
        if (colours.get(startOfFace + i) != firstColour) {
          return false;
        }
      }
    }

    return true;
  }

  public abstract void solve();

  public List<Move> getSolution() {
    var list = new ArrayList<>(this.moves);
    Collections.reverse(list);
    return Collections.unmodifiableList(list);
  }

  protected boolean solved() {
//    var cubeValidator = new CubeValidator(this.state);
//
//    // a solved cube has to also have the correct pieces
//    if (!cubeValidator.validateCube()) {
//      return false;
//    }

    // a solved cube also has to have each face of the same colour
    return CubeSolver.solved(this.state);
  }

  protected void makeMove(Move move) {
    this.moves.add(move);
    this.moveMaker.makeMove(move);
  }

  protected void undoMove() {
    this.moveMaker.makeMove(this.inverseMove(this.moves.pop()));
  }

  protected Move inverseMove(Move move) {
    switch (move) {
      case X_LEFT_UP:
        return Move.X_LEFT_DOWN;
      case X_LEFT_DOWN:
        return Move.X_LEFT_UP;
      case X_MIDDLE_UP:
        return Move.X_MIDDLE_DOWN;
      case X_MIDDLE_DOWN:
        return Move.X_MIDDLE_UP;
      case X_RIGHT_UP:
        return Move.X_RIGHT_DOWN;
      case X_RIGHT_DOWN:
        return Move.X_RIGHT_UP;
      case Y_TOP_RIGHT:
        return Move.Y_TOP_LEFT;
      case Y_TOP_LEFT:
        return Move.Y_TOP_RIGHT;
      case Y_MIDDLE_RIGHT:
        return Move.Y_MIDDLE_LEFT;
      case Y_MIDDLE_LEFT:
        return Move.Y_MIDDLE_RIGHT;
      case Y_BOTTOM_RIGHT:
        return Move.Y_BOTTOM_LEFT;
      case Y_BOTTOM_LEFT:
        return Move.Y_BOTTOM_RIGHT;
      case Z_NEAR_CLOCKWISE:
        return Move.Z_NEAR_ANTICLOCKWISE;
      case Z_NEAR_ANTICLOCKWISE:
        return Move.Z_NEAR_CLOCKWISE;
      case Z_MIDDLE_CLOCKWISE:
        return Move.Z_MIDDLE_ANTICLOCKWISE;
      case Z_MIDDLE_ANTICLOCKWISE:
        return Move.Z_MIDDLE_CLOCKWISE;
      case Z_FAR_CLOCKWISE:
        return Move.Z_FAR_ANTICLOCKWISE;
      case Z_FAR_ANTICLOCKWISE:
        return Move.Z_FAR_CLOCKWISE;
      default:
        throw new RuntimeException("aaaa");
    }
  }
}
