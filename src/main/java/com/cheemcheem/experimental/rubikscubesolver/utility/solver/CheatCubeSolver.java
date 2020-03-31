package com.cheemcheem.experimental.rubikscubesolver.utility.solver;

import com.cheemcheem.experimental.rubikscubesolver.model.State;

import java.util.Collections;
import java.util.stream.Collectors;

public class CheatCubeSolver extends CubeSolver {

  public CheatCubeSolver(State state) {
    super(state);
  }

  @Override
  public void solve() {
    logger.info("CheatCubeSolver.solve");

    var history = this.state.getHistory().stream().map(this::inverseMove).collect(Collectors.toList());
    Collections.reverse(history);
    moves.addAll(history);
  }
}
