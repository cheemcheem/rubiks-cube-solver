package com.cheemcheem.experimental.rubikscubesolver.utility.solver;

import com.cheemcheem.experimental.rubikscubesolver.model.Colour;
import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.utility.CubeOrientationSorter;
import com.cheemcheem.experimental.rubikscubesolver.utility.MoveMaker;
import org.apache.commons.lang3.tuple.Triple;

import java.util.List;

import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.BLUE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.GREEN;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.ORANGE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.RED;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.WHITE;
import static com.cheemcheem.experimental.rubikscubesolver.model.Colour.YELLOW;

public class DefaultCubeSolver extends CubeSolver {

  private final List<Colour> colours;
  private final MoveMaker moveMaker;

  public DefaultCubeSolver(State state) {
    super(state);
    this.colours = this.state.getColours();
    this.moveMaker = new MoveMaker(this.state);

  }

  @Override
  public void solve() {
    if (!this.solved()) {
      // orient cube

      var cubeOrientationSorter = new CubeOrientationSorter(this.state);
      cubeOrientationSorter.orientCube(true);
      this.moves.addAll(cubeOrientationSorter.getMovesMade());
      greenPhase();
      middlePhase();
      bluePhase();
    }
  }

  private void greenPhase() {
    if (greenPhaseComplete()) {
      return;
    }

    var corner1Location = corner(GREEN, WHITE, ORANGE);
    if (corner1Location.getLeft() != 45) {
      switch (corner1Location.getLeft()) {
        case 9:
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 36:
          makeMove(Move.X_LEFT_DOWN);
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 35:
          makeMove(Move.X_LEFT_UP);
          break;
        case 47:
          makeMove(Move.Y_BOTTOM_LEFT);
          break;
        case 53:
          makeMove(Move.Y_BOTTOM_LEFT);
          makeMove(Move.Y_BOTTOM_LEFT);
          break;
        case 51:
          makeMove(Move.Y_BOTTOM_RIGHT);
          break;
        case 18:
          makeMove(Move.Y_TOP_LEFT);
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 27:
          makeMove(Move.Y_TOP_LEFT);
          makeMove(Move.Y_TOP_LEFT);
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 0:
          makeMove(Move.Y_TOP_RIGHT);
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 6:
          makeMove(Move.Z_FAR_ANTICLOCKWISE);
          makeMove(Move.X_LEFT_DOWN);
          makeMove(Move.X_LEFT_DOWN);
          break;
        case 20:
          makeMove(Move.Z_FAR_CLOCKWISE);
          makeMove(Move.X_LEFT_DOWN);
          makeMove(Move.X_LEFT_DOWN);
          break;
      }
    }

  }

  private Triple<Integer, Integer, Integer> corner(Colour colour1, Colour colour2, Colour colour3) {
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

      var coloursMatch = list.contains(firstColour)
              && list.contains(secondColour)
              && list.contains(thirdColour);

      if (coloursMatch) {
        return triple(
                firstColour == colour1 ? i : secondColour == colour1 ? i + 1 : i + 2,
                firstColour == colour2 ? i : secondColour == colour2 ? i + 1 : i + 2,
                firstColour == colour3 ? i : secondColour == colour3 ? i + 1 : i + 2
        );
      }
    }
    throw new RuntimeException("Can't find corner!");
  }

  private Triple<Integer, Integer, Integer> triple(int left, int middle, int right) {
    return new Triple<>() {
      @Override
      public Integer getLeft() {
        return left;
      }

      @Override
      public Integer getMiddle() {
        return middle;
      }

      @Override
      public Integer getRight() {
        return right;
      }
    };
  }

  protected void makeMove(Move move) {
    this.moves.add(move);
    this.moveMaker.makeMove(move);
  }

  private boolean greenPhaseComplete() {

    for (int i = 45; i <= 53; i++) {
      if (colours.get(i) != GREEN) {
        return false;
      }
    }

    return colours.get(15) == BLUE
            && colours.get(16) == BLUE
            && colours.get(17) == BLUE
            && colours.get(6) == ORANGE
            && colours.get(7) == ORANGE
            && colours.get(8) == ORANGE
            && colours.get(24) == RED
            && colours.get(25) == RED
            && colours.get(26) == RED
            && colours.get(33) == YELLOW
            && colours.get(34) == YELLOW
            && colours.get(35) == YELLOW;
  }

  private void middlePhase() {

  }

  private void bluePhase() {

  }

}
