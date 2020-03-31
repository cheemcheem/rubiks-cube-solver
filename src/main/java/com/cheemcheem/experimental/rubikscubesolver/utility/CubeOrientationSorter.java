package com.cheemcheem.experimental.rubikscubesolver.utility;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.BLUE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.WHITE;

public class CubeOrientationSorter {
  private final List<Move> movesMade = new ArrayList<>();
  private final State state;
  private final MoveMaker moveMaker;

  public CubeOrientationSorter(State state) {
    this.state = state;
    this.moveMaker = new MoveMaker(this.state);

  }

  public List<Move> getMovesMade() {
    return Collections.unmodifiableList(this.movesMade);
  }

  public void orientCube(boolean allSides) {
    var colours = this.state.getColours();

    if (colours.get(40) != BLUE) {
      if (colours.get(4) == BLUE) {
        this.makeMove(Move.Z_MIDDLE_CLOCKWISE);
        if (allSides) {
          this.makeMove(Move.Z_NEAR_CLOCKWISE);
          this.makeMove(Move.Z_FAR_CLOCKWISE);
        }
      }
      if (colours.get(13) == BLUE) {
        this.makeMove(Move.X_MIDDLE_UP);
        if (allSides) {
          this.makeMove(Move.X_LEFT_UP);
          this.makeMove(Move.X_RIGHT_UP);
        }
      }
      if (colours.get(22) == BLUE) {
        this.makeMove(Move.Z_MIDDLE_ANTICLOCKWISE);
        if (allSides) {
          this.makeMove(Move.Z_NEAR_ANTICLOCKWISE);
          this.makeMove(Move.Z_FAR_ANTICLOCKWISE);
        }
      }
      if (colours.get(31) == BLUE) {
        this.makeMove(Move.X_MIDDLE_DOWN);
        if (allSides) {
          this.makeMove(Move.X_LEFT_DOWN);
          this.makeMove(Move.X_RIGHT_DOWN);
        }
      }
      if (colours.get(49) == BLUE) {
        this.makeMove(Move.X_MIDDLE_UP);
        this.makeMove(Move.X_MIDDLE_UP);
        if (allSides) {
          this.makeMove(Move.X_LEFT_UP);
          this.makeMove(Move.X_LEFT_UP);
          this.makeMove(Move.X_RIGHT_UP);
          this.makeMove(Move.X_RIGHT_UP);
        }
      }
    }
    if (colours.get(13) != WHITE) {
      if (colours.get(4) == WHITE) {
        this.makeMove(Move.Y_MIDDLE_RIGHT);
        if (allSides) {
          this.makeMove(Move.Y_BOTTOM_RIGHT);
          this.makeMove(Move.Y_TOP_RIGHT);
        }
      }
      if (colours.get(22) == WHITE) {
        this.makeMove(Move.Y_MIDDLE_LEFT);
        if (allSides) {
          this.makeMove(Move.Y_BOTTOM_LEFT);
          this.makeMove(Move.Y_TOP_LEFT);
        }
      }
      if (colours.get(31) == WHITE) {
        this.makeMove(Move.Y_MIDDLE_LEFT);
        this.makeMove(Move.Y_MIDDLE_LEFT);
        if (allSides) {
          this.makeMove(Move.Y_BOTTOM_LEFT);
          this.makeMove(Move.Y_BOTTOM_LEFT);
          this.makeMove(Move.Y_TOP_LEFT);
          this.makeMove(Move.Y_TOP_LEFT);
        }
      }
    }
  }

  private void makeMove(Move move) {
    this.movesMade.add(move);
    this.moveMaker.makeMove(move);
  }

}
