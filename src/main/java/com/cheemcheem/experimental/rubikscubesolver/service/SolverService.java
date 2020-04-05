package com.cheemcheem.experimental.rubikscubesolver.service;

import com.cheemcheem.experimental.rubikscubesolver.model.Move;
import com.cheemcheem.experimental.rubikscubesolver.model.State;
import com.cheemcheem.experimental.rubikscubesolver.utility.solver.CubeSolver;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SolverService {

  private final Logger logger = LoggerFactory.getLogger(SolverService.class);
  private final Class<? extends CubeSolver> solverType;
  private final StateService stateService;

  /**
   * Applies random moves to the state until it is randomly shuffled.
   *
   * @param stateId State ID to look up in repository.
   */
  @SneakyThrows
  @Transactional
  public Optional<List<Move>> solve(Long stateId) {
    logger.info("SolverService.solve");
    var optionalState = this.stateService.getStateById(stateId);

    if (optionalState.isEmpty()) {
      logger.warn("State with id '{}' does not exist.", stateId);
      return Optional.empty();
    }

    var state = optionalState.get();
    var solver = this.solverType.getConstructor(State.class).newInstance(state);
    solver.solve();
    var moves = solver.getSolution();

    logger.debug("Solved state with id '{}' with following moves '{}'", stateId, moves);
    return Optional.of(moves);
  }
}
